from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(
    title="PowerPredict AI",
    description="AI-powered electricity consumption prediction API",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained ML model
model = joblib.load("backend/models/electricity_model.pkl")

# Load electricity dataset
df = pd.read_csv("backend/data/electricity.csv")

# Convert datetime column
df["datetime"] = pd.to_datetime(df["datetime"])


class PredictionRequest(BaseModel):
    temperature: float
    humidity: float
    hour: int
    day_of_week: int
    month: int


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "PowerPredict AI"
    }


@app.post("/predict")
def predict_consumption(data: PredictionRequest):

    input_data = pd.DataFrame([{
        "temperature": data.temperature,
        "humidity": data.humidity,
        "hour": data.hour,
        "day_of_week": data.day_of_week,
        "month": data.month
    }])

    prediction = model.predict(input_data)[0]

    return {
        "temperature": data.temperature,
        "humidity": data.humidity,
        "hour": data.hour,
        "day_of_week": data.day_of_week,
        "month": data.month,
        "predicted_consumption_kwh": round(float(prediction), 2)
    }


# --------------------------------------------------
# REAL DATA ANALYTICS
# --------------------------------------------------

@app.get("/analytics")
def get_analytics():

    # Hourly average consumption
    hourly = (
        df.groupby("hour")["consumption_kwh"]
        .mean()
        .reset_index()
    )

    hourly_data = [
        {
            "hour": f"{int(row['hour']):02d}:00",
            "consumption": round(float(row["consumption_kwh"]), 2)
        }
        for _, row in hourly.iterrows()
    ]

    # Daily average consumption
    day_names = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday"
    }

    daily = (
        df.groupby("day_of_week")["consumption_kwh"]
        .mean()
        .reset_index()
    )

    daily_data = [
        {
            "day": day_names[int(row["day_of_week"])],
            "consumption": round(float(row["consumption_kwh"]), 2)
        }
        for _, row in daily.iterrows()
    ]

    # Monthly average consumption
    monthly = (
        df.groupby("month")["consumption_kwh"]
        .mean()
        .reset_index()
    )

    monthly_data = [
        {
            "month": int(row["month"]),
            "consumption": round(float(row["consumption_kwh"]), 2)
        }
        for _, row in monthly.iterrows()
    ]

    # Overall statistics
    average_consumption = df["consumption_kwh"].mean()
    minimum_consumption = df["consumption_kwh"].min()
    maximum_consumption = df["consumption_kwh"].max()

    return {
        "hourly": hourly_data,
        "daily": daily_data,
        "monthly": monthly_data,
        "statistics": {
            "average": round(float(average_consumption), 2),
            "minimum": round(float(minimum_consumption), 2),
            "maximum": round(float(maximum_consumption), 2)
        }
    }