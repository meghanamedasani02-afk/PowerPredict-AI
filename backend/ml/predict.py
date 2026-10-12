import joblib
import pandas as pd


# ==========================================
# LOAD TRAINED MODEL
# ==========================================

MODEL_PATH = "backend/models/electricity_model.pkl"

model = joblib.load(MODEL_PATH)

print("Electricity prediction model loaded successfully!")


# ==========================================
# GET USER INPUT
# ==========================================

print("\nEnter the following information:")

temperature = float(
    input("Temperature (°C): ")
)

humidity = float(
    input("Humidity (%): ")
)

hour = int(
    input("Hour (0-23): ")
)

day_of_week = int(
    input("Day of week (0=Monday, 6=Sunday): ")
)

month = int(
    input("Month (1-12): ")
)


# ==========================================
# CREATE INPUT DATA
# ==========================================

input_data = pd.DataFrame([
    {
        "temperature": temperature,
        "humidity": humidity,
        "hour": hour,
        "day_of_week": day_of_week,
        "month": month
    }
])


# ==========================================
# MAKE PREDICTION
# ==========================================

prediction = model.predict(input_data)

predicted_consumption = prediction[0]


# ==========================================
# DISPLAY RESULT
# ==========================================

print("\n======================================")
print("       POWERPREDICT AI")
print("======================================")

print(
    f"Predicted Electricity Consumption: "
    f"{predicted_consumption:.2f} kWh"
)

print("======================================")