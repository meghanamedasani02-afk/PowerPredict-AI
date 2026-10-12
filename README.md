\# ⚡ PowerPredict AI — Smart Electricity Consumption Predictor



PowerPredict AI is a full-stack machine learning project that estimates electricity consumption from environmental and time-based inputs. It combines a Python API with an interactive React dashboard to demonstrate how machine learning can support energy awareness.



\## Features



\- \*\*Electricity prediction:\*\* Estimate consumption using temperature, humidity, hour, day of the week, and month.

\- \*\*Machine learning:\*\* Uses a trained regression model.

\- \*\*Interactive dashboard:\*\* Explore predictions and consumption analytics.

\- \*\*Data visualizations:\*\* View hourly, weekly, and monthly trends.

\- \*\*REST API:\*\* Access prediction, health-check, and analytics endpoints.

\- \*\*API documentation:\*\* Explore endpoints through FastAPI's Swagger UI.



\## Technology Stack



\*\*Frontend:\*\* React, Vite, JavaScript, Axios, Recharts, CSS



\*\*Backend:\*\* Python, FastAPI, Pydantic



\*\*Machine Learning and Data:\*\* scikit-learn, Pandas, NumPy, joblib



\## Project Structure



```text

PowerPredict-AI/

├── backend/

│   ├── data/

│   ├── ml/

│   ├── models/

│   ├── generate\_data.py

│   └── main.py

├── frontend/

│   ├── public/

│   ├── src/

│   └── package.json

├── notebooks/

├── .gitignore

└── README.md

```



\## Getting Started



\### Prerequisites



\- Python 3.11 or a compatible version supported by the dependencies

\- Node.js and npm



\### 1. Clone the repository



```bash

git clone https://github.com/muddarsunaveen16-afk/PowerPredict-AI.git

cd PowerPredict-AI

```



\### 2. Set up the backend



From the project root, create and activate a virtual environment.



\*\*Windows Command Prompt:\*\*



```cmd

python -m venv .venv

.venv\\Scripts\\activate

python -m pip install -r backend\\requirements.txt

python -m uvicorn backend.main:app --reload

```



The API should be available at `http://127.0.0.1:8000`.



\- API documentation: `http://127.0.0.1:8000/docs`

\- Health check: `http://127.0.0.1:8000/health`



Keep the backend terminal running.



\### 3. Start the frontend



Open a second terminal and navigate to the project root.



```cmd

cd frontend

npm install

npm run dev

```



Open the local URL printed by Vite in the terminal.



If the frontend cannot connect to the API, check its API base URL and ensure the backend is running.



\## Dataset and Limitations



The included dataset is synthetic and intended for educational and demonstration purposes. Predictions demonstrate the machine learning workflow and should not be treated as verified forecasts of actual household electricity usage.



Model performance on synthetic data does not guarantee accuracy on real-world electricity consumption data.



\## Future Improvements



\- Evaluate the model against real electricity-meter data.

\- Add model performance reports and prediction uncertainty.

\- Improve deployment and configuration options.

\- Explore energy-saving recommendations based on usage patterns.



\## Author



\*\*Naveen Muddarsu\*\*



\- GitHub: \[@muddarsunaveen16-afk](https://github.com/muddarsunaveen16-afk)



\## License



A license has not yet been selected. All rights are reserved unless a license is added to this repository.

