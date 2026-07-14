import TaskList from "../components/Task/TaskList";
import "./TaskPage.css";
import { useState } from "react";
import { isAdmin } from "../utils/auth";
import { createTask, updateTask, deleteTask } from "../api/taskApi";

function TaskPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [activeTab, setActiveTab] = useState("planned");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    vendor: "",
    startDate: "",
    expectedCompletionDate: "",
    currentStatus: "IN_PROGRESS",
    progressPercentage: 0,
  });

  const handleSaveTask = async () => {
    await createTask(newTask);

    setShowAddDialog(false);

    window.location.reload();
};

const handleUpdateTask = async () => {
    await updateTask(editingTaskId, newTask);

    setShowAddDialog(false);

    setIsEditMode(false);
    setEditingTaskId(null);

    window.location.reload();
};


  const handleEditTask = (task) => {
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

  return (
    <div className="tasks-page">
      <div className="tasks-card">
        <div className="task-tabs">
          <div>
            <button
              className={activeTab === "planned" ? "active" : ""}
              onClick={() => setActiveTab("planned")}
            >
              Planned
            </button>

            <button
              className={activeTab === "in-progress" ? "active" : ""}
              onClick={() => setActiveTab("in-progress")}
            >
              In Progress
            </button>

            <button
              className={activeTab === "on-hold" ? "active" : ""}
              onClick={() => setActiveTab("on-hold")}
            >
              On Hold
            </button>

            <button
              className={activeTab === "completed" ? "active" : ""}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>
          <div>
            {isAdmin() && (
              <button
                className="add-task-btn"
                onClick={() => setShowAddDialog(true)}
              >
                + Add Task
              </button>
            )}

            {showAddDialog && (
              <div className="dialog-overlay">
                <div className="dialog-box">
                  <h2>{isEditMode ? "Edit Task" : "Add Task"}</h2>

                  <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        title: e.target.value,
                      })
                    }
                  />

                  <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        description: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Vendor"
                    value={newTask.vendor}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        vendor: e.target.value,
                      })
                    }
                  />

                  <label>Start Date</label>
                  <input
                    type="datetime-local"
                    value={newTask.startDate}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        startDate: e.target.value,
                      })
                    }
                  />

                  <label>Expected Completion Date</label>
                  <input
                    type="datetime-local"
                    value={newTask.expectedCompletionDate}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        expectedCompletionDate: e.target.value,
                      })
                    }
                  />

                  <label>Status</label>
                  <select
                    value={newTask.currentStatus}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        currentStatus: e.target.value,
                      })
                    }
                  >
                    <option value="NOT_STARTED">NOT_STARTED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>

                  <label>Progress Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newTask.progressPercentage}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        progressPercentage: Number(e.target.value),
                      })
                    }
                  />

                  <div className="dialog-buttons">
                    <button
                      className="save-btn"
                      onClick={isEditMode ? handleUpdateTask : handleSaveTask}
                    >
                      {isEditMode ? "Update" : "Save"}
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => {
                        setShowAddDialog(false);

                        setIsEditMode(false);

                        setEditingTaskId(null);

                        setNewTask({
                          title: "",
                          description: "",
                          vendor: "",
                          startDate: "",
                          expectedCompletionDate: "",
                          currentStatus: "IN_PROGRESS",
                          progressPercentage: 0,
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <TaskList type={activeTab} onEdit={handleEditTask} />
      </div>
    </div>
  );
}

export default TaskPage;
