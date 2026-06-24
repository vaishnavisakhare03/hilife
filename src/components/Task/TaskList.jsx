import { useEffect, useState } from "react";
import { getAllTasks } from "../../api/taskApi";
import currentUser from "../../data/currentUser";
import { FaClipboardList, FaBuilding, FaCalendarAlt, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import "./TaskList.css";

function TaskList({ type }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (type === "planned") {
      return true;
    }

    switch (type) {
        case "in-progress":
            return task.currentStatus === "IN_PROGRESS";

        case "on-hold":
            return task.currentStatus === "ON_HOLD";

        case "completed":
            return task.currentStatus === "COMPLETED";

        default:
            return true;
    }
  });

  if (loading) {
    return <h2>Loading Tasks...</h2>;
  }

  return (
    <div className="task-container">
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-card">

          <div className="task-header">
            <h3>{task.title}</h3>

            <div className="task-actions">
              {currentUser.role === "ADMIN" && (
                <button className="icon-btn edit-btn">
                  <FaEdit />
                </button>
              )}

              <button className="icon-btn delete-btn">
                <FaTrash />
              </button>
            </div>
          </div>

          <span
            className={`status-badge ${task.currentStatus.toLowerCase()}`}
          >
            {task.currentStatus.replace("_", " ")}
          </span>

          <div className="task-info description">
            <FaClipboardList />
            <span>{task.description}</span>
          </div>

          <div className="task-info vendor">
            <FaBuilding />
            <span>{task.vendor}</span>
          </div>

          <div className="task-info start-date">
            <FaCalendarAlt />
            <span>
              Start:
              {" "}
              {new Date(task.startDate).toLocaleDateString()}
            </span>
          </div>

          <div className="task-info completion-date">
            <FaCheckCircle />
            <span>
              Expected:
              {" "}
              {new Date(
                task.expectedCompletionDate
              ).toLocaleDateString()}
            </span>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <span>Progress</span>
              <span>{task.progressPercentage}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${task.progressPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
