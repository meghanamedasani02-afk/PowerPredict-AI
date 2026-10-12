import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Reproducible results
np.random.seed(42)

# Number of records
NUM_RECORDS = 5000

# Starting date
start_date = datetime(2025, 1, 1)

data = []

for i in range(NUM_RECORDS):

    date_time = start_date + timedelta(hours=i)

    hour = date_time.hour
    day_of_week = date_time.weekday()
    month = date_time.month

    # Simulated environmental conditions
    temperature = np.random.normal(28, 5)
    humidity = np.random.normal(60, 12)

    # Base electricity consumption
    consumption = 2.5

    # Morning usage
    if 6 <= hour <= 9:
        consumption += 2.0

    # Evening peak usage
    if 18 <= hour <= 22:
        consumption += 3.5

    # Afternoon usage
    if 12 <= hour <= 16:
        consumption += 1.5

    # Weekend effect
    if day_of_week >= 5:
        consumption += 0.8

    # Temperature effect
    if temperature > 30:
        consumption += (temperature - 30) * 0.35

    # Humidity effect
    if humidity > 70:
        consumption += 0.5

    # Random variation
    consumption += np.random.normal(0, 0.5)

    # Ensure positive consumption
    consumption = max(consumption, 0.5)

    data.append([
        date_time,
        temperature,
        humidity,
        hour,
        day_of_week,
        month,
        consumption
    ])

# Create DataFrame
df = pd.DataFrame(
    data,
    columns=[
        "datetime",
        "temperature",
        "humidity",
        "hour",
        "day_of_week",
        "month",
        "consumption_kwh"
    ]
)

# Save dataset
output_path = "backend/data/electricity.csv"

df.to_csv(output_path, index=False)

print("Dataset created successfully!")
print(f"Records: {len(df)}")
print(f"Saved to: {output_path}")

print("\nFirst 5 records:")
print(df.head())

print("\nDataset information:")
print(df.describe())