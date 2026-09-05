import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    upcomingEvents: 0,
    pendingTasks: 0,
    feedbackCount: 0,
    committeeCount: 0,
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/stats");

      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to HiLife</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div
          className="dashboard-card clickable"
          onClick={() => navigate("/events")}
        >
          <div className="card-icon">📅</div>

          <div>
            <h3>Upcoming Events</h3>
            <p>{stats.upcomingEvents}</p>
          </div>
        </div>

        <div
          className="dashboard-card clickable"
          onClick={() => navigate("/tasks?status=IN_PROGRESS")}
        >
          <div className="card-icon">✅</div>

          <div>
            <h3>Pending Tasks</h3>
            <p>{stats.pendingTasks}</p>
          </div>
        </div>

        <div
          className="dashboard-card clickable"
          onClick={() => navigate("/feedbacks")}
        >
          <div className="card-icon">💬</div>

          <div>
            <h3>Feedbacks</h3>
            <p>{stats.feedbackCount}</p>
          </div>
        </div>

        <div
          className="dashboard-card clickable"
          onClick={() => navigate("/committee")}
        >
          <div className="card-icon">👥</div>

          <div>
            <h3>Committee Members</h3>
            <p>{stats.committeeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
