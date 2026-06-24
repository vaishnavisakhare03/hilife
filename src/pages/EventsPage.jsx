import { useState } from "react";
import EventList from "../components/Event/EventList";
import "./EventsPage.css";

function EventPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="events-page">
      <div className="events-card">
        <div className="event-tabs">
          <button
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Events
          </button>

          <button
            className={activeTab === "completed" ? "active" : ""}
            onClick={() => setActiveTab("completed")}
          >
            Completed Events
          </button>
        </div>

        <EventList type={activeTab} />
      </div>
    </div>
  );
}

export default EventPage;