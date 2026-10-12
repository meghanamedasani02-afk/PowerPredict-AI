import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# ==========================================
# 1. LOAD DATASET
# ==========================================

DATA_PATH = "backend/data/electricity.csv"

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully!")
print(f"Total records: {len(df)}")


# ==========================================
# 2. SELECT FEATURES
# ==========================================

features = [
    "temperature",
    "humidity",
    "hour",
    "day_of_week",
    "month"
]

target = "consumption_kwh"

X = df[features]
y = df[target]


# ==========================================
# 3. SPLIT DATA
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

print(f"Training records: {len(X_train)}")
print(f"Testing records: {len(X_test)}")


# ==========================================
# 4. CREATE MODEL
# ==========================================

model = RandomForestRegressor(
    n_estimators=200,
    max_depth=15,
    random_state=42,
    n_jobs=-1
)


# ==========================================
# 5. TRAIN MODEL
# ==========================================

print("\nTraining model...")

model.fit(X_train, y_train)

print("Model training completed!")


# ==========================================
# 6. MAKE PREDICTIONS
# ==========================================

y_pred = model.predict(X_test)


# ==========================================
# 7. EVALUATE MODEL
# ==========================================

mae = mean_absolute_error(y_test, y_pred)

mse = mean_squared_error(y_test, y_pred)

rmse = mse ** 0.5

r2 = r2_score(y_test, y_pred)


print("\n========== MODEL PERFORMANCE ==========")

print(f"MAE  : {mae:.4f} kWh")
print(f"MSE  : {mse:.4f}")
print(f"RMSE : {rmse:.4f} kWh")
print(f"R²   : {r2:.4f}")

print("=======================================")


# ==========================================
# 8. SAVE MODEL
# ==========================================

MODEL_PATH = "backend/models/electricity_model.pkl"

joblib.dump(model, MODEL_PATH)

print(f"\nModel saved successfully!")
print(f"Location: {MODEL_PATH}")
