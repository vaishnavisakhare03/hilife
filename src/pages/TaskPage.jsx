import TaskList from "../components/Task/TaskList";
import "./TaskPage.css";
import { useState } from "react";

function TaskPage() {
  const [activeTab, setActiveTab] = useState("planned");
  return (
    <div className="tasks-page">
      <div className="tasks-card">
      <div className="task-tabs">
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

      <TaskList type={activeTab} />
    </div>
    </div>
  );
}

export default TaskPage;
