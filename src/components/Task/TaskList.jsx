import { useEffect, useState } from "react";
import { getAllTasks, deleteTask } from "../../api/taskApi";
import currentUser from "../../data/currentUser";
import {
  FaClipboardList,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "./TaskList.css";
import { isAdmin } from "../../utils/auth";

function TaskList({ type, onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

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
      return task.currentStatus === "PLANNED";
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

  const handleEdit = (task) => {
    setIsEditMode(true);

    setEditingTaskId(task.id);

    setNewTask({
      title: task.title,
      description: task.description,
      vendor: task.vendor,
      startDate: task.startDate.slice(0, 16),
      expectedCompletionDate: task.expectedCompletionDate.slice(0, 16),
      currentStatus: task.currentStatus,
      progressPercentage: task.progressPercentage,
    });

    setShowAddDialog(true);
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTask(taskId);

      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);

      alert("Unable to delete task.");
    }
  };

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
              {isAdmin() && (
                <>
                  <button
                    className="icon-btn edit-btn"
                    onClick={() => onEdit(task)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn delete-btn"
                    onClick={() => handleDelete(task.id)}
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>

          <span className={`status-badge ${task.currentStatus.toLowerCase()}`}>
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
            <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
          </div>

          <div className="task-info completion-date">
            <FaCheckCircle />
            <span>
              Expected:{" "}
              {new Date(task.expectedCompletionDate).toLocaleDateString()}
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
