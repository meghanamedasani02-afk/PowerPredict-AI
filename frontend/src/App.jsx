import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function App() {
  const [formData, setFormData] = useState({
    temperature: 34,
    humidity: 60,
    hour: 19,
    day_of_week: 0,
    month: 6,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [analytics, setAnalytics] = useState(null);
  const [analyticsError, setAnalyticsError] = useState("");

  // Fetch real analytics from FastAPI
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/analytics"
        );

        setAnalytics(response.data);
        setAnalyticsError("");
      } catch (err) {
        console.error("Analytics Error:", err);
        setAnalyticsError(
          "Unable to load consumption analytics. Make sure FastAPI is running."
        );
      }
    };

    fetchAnalytics();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  // Predict electricity consumption
  const predictConsumption = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setPrediction(response.data);
    } catch (err) {
      console.error("Prediction Error:", err);

      setError(
        "Unable to connect to the PowerPredict AI backend. Make sure FastAPI is running."
      );
    }

    setLoading(false);
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="header">
        <div>
          <h1>⚡ PowerPredict AI</h1>
          <p>Smart Electricity Consumption Predictor</p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          AI System Online
        </div>
      </header>


      {/* ================= PREDICTION SECTION ================= */}

      <section className="prediction-section">

        <div className="section-heading">
          <h2>Predict Your Electricity Consumption</h2>

          <p>
            Enter environmental and time information to estimate electricity
            consumption using our Machine Learning model.
          </p>
        </div>


        <div className="prediction-card">

          <h3>⚙️ Prediction Inputs</h3>


          <div className="form-grid">

            {/* Temperature */}

            <div className="input-group">
              <label>Temperature (°C)</label>

              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
              />
            </div>


            {/* Humidity */}

            <div className="input-group">
              <label>Humidity (%)</label>

              <input
                type="number"
                name="humidity"
                value={formData.humidity}
                onChange={handleChange}
              />
            </div>


            {/* Hour */}

            <div className="input-group">
              <label>Hour (0–23)</label>

              <input
                type="number"
                min="0"
                max="23"
                name="hour"
                value={formData.hour}
                onChange={handleChange}
              />
            </div>


            {/* Day */}

            <div className="input-group">
              <label>Day of Week</label>

              <select
                name="day_of_week"
                value={formData.day_of_week}
                onChange={handleChange}
              >
                <option value={0}>Monday</option>
                <option value={1}>Tuesday</option>
                <option value={2}>Wednesday</option>
                <option value={3}>Thursday</option>
                <option value={4}>Friday</option>
                <option value={5}>Saturday</option>
                <option value={6}>Sunday</option>
              </select>
            </div>


            {/* Month */}

            <div className="input-group">
              <label>Month</label>

              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
              >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>
            </div>

          </div>


          {/* Predict Button */}

          <button
            className="predict-button"
            onClick={predictConsumption}
            disabled={loading}
          >
            {loading
              ? "⏳ Predicting..."
              : "⚡ Predict Consumption"}
          </button>


          {/* Prediction Error */}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          {/* Prediction Result */}

          {prediction && (
            <div className="result-card">

              <span>⚡</span>

              <div>

                <h3>
                  Predicted Electricity Consumption
                </h3>

                <div className="prediction-value">
                  {prediction.predicted_consumption_kwh} kWh
                </div>

                <p>
                  Based on the environmental and time conditions provided.
                </p>

              </div>

            </div>
          )}

        </div>

      </section>


      {/* ================= ANALYTICS SECTION ================= */}

      <section className="analytics-section">

        <div className="section-heading">

          <h2>📊 Consumption Analytics</h2>

          <p>
            Analyze electricity consumption patterns using your
            real electricity dataset.
          </p>

        </div>


        {/* Analytics Error */}

        {analyticsError && (
          <div className="error-message">
            {analyticsError}
          </div>
        )}


        {/* Charts */}

        {analytics && (
          <>

            <div className="analytics-grid">

              {/* ================= HOURLY CHART ================= */}

              <div className="chart-card">

                <h3>
                  🕒 Hourly Consumption Pattern
                </h3>

                <p>
                  Average electricity consumption by hour,
                  calculated from the dataset.
                </p>


                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <LineChart
                    data={analytics.hourly}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="hour"
                    />

                    <YAxis />

                    <Tooltip
                      formatter={(value) => [
                        `${value} kWh`,
                        "Consumption",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="consumption"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>


              {/* ================= DAILY CHART ================= */}

              <div className="chart-card">

                <h3>
                  📅 Weekly Consumption
                </h3>

                <p>
                  Average electricity consumption by day,
                  calculated from the dataset.
                </p>


                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <BarChart
                    data={analytics.daily}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="day"
                      tickFormatter={(value) =>
                        value.substring(0, 3)
                      }
                    />

                    <YAxis />

                    <Tooltip
                      formatter={(value) => [
                        `${value} kWh`,
                        "Consumption",
                      ]}
                    />

                    <Bar
                      dataKey="consumption"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>


            {/* ================= STATISTICS ================= */}

            <div className="stats-grid">

              {/* Average */}

              <div className="stat-card">

                <span>📊</span>

                <div>

                  <p>
                    Average Consumption
                  </p>

                  <h3>
                    {analytics.statistics.average} kWh
                  </h3>

                </div>

              </div>


              {/* Minimum */}

              <div className="stat-card">

                <span>⬇️</span>

                <div>

                  <p>
                    Minimum Consumption
                  </p>

                  <h3>
                    {analytics.statistics.minimum} kWh
                  </h3>

                </div>

              </div>


              {/* Maximum */}

              <div className="stat-card">

                <span>🔥</span>

                <div>

                  <p>
                    Maximum Consumption
                  </p>

                  <h3>
                    {analytics.statistics.maximum} kWh
                  </h3>

                </div>

              </div>

            </div>


            {/* ================= MONTHLY CHART ================= */}

            <div className="chart-card monthly-chart">

              <h3>
                📆 Monthly Consumption
              </h3>

              <p>
                Average electricity consumption by month
                from the dataset.
              </p>


              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={analytics.monthly}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="month"
                    tickFormatter={(value) =>
                      new Date(2000, value - 1).toLocaleString(
                        "default",
                        { month: "short" }
                      )
                    }
                  />

                  <YAxis />

                  <Tooltip
                    labelFormatter={(value) =>
                      new Date(
                        2000,
                        value - 1
                      ).toLocaleString(
                        "default",
                        { month: "long" }
                      )
                    }
                    formatter={(value) => [
                      `${value} kWh`,
                      "Consumption",
                    ]}
                  />

                  <Bar
                    dataKey="consumption"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </>
        )}

      </section>


      {/* ================= INSIGHT CARDS ================= */}

      <section className="insights">

        <div className="info-card">

          <div className="icon">
            🌡️
          </div>

          <h3>
            Temperature
          </h3>

          <p>
            Higher temperatures can increase cooling
            and air-conditioning electricity demand.
          </p>

        </div>


        <div className="info-card">

          <div className="icon">
            💧
          </div>

          <h3>
            Humidity
          </h3>

          <p>
            Humidity can influence cooling requirements
            and overall energy consumption.
          </p>

        </div>


        <div className="info-card">

          <div className="icon">
            🕒
          </div>

          <h3>
            Peak Hours
          </h3>

          <p>
            Electricity consumption generally increases
            during morning and evening peak periods.
          </p>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>
        PowerPredict AI • Machine Learning Electricity Forecasting
      </footer>

    </div>
  );
}

export default App;