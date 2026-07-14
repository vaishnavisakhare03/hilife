import { useState } from "react";
import EventList from "../components/Event/EventList";
import "./EventsPage.css";
import { createEvent, getAllEvents } from "../api/eventApi";
import { isAdmin } from "../utils/auth";
import { FaPlus } from "react-icons/fa";

function EventPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const [showAddDialog, setShowAddDialog] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    hostedBy: "",
    personInCharge: "",
  });

  const handleSaveEvent = async () => {
    try {
      if (
        !newEvent.title ||
        !newEvent.description ||
        !newEvent.startTime ||
        !newEvent.endTime ||
        !newEvent.hostedBy
      ) {
        alert("Please fill all fields");
        return;
      }
      await createEvent(newEvent);

      setShowAddDialog(false);

      setNewEvent({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        hostedBy: "",
      });

      window.location.reload();
    } catch (error) {
      console.error("Error creating event", error);
    }
  };

  return (
    <div className="events-page">
      <div className="events-card">
        <div className="event-tabs">
          <div>
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

          <div>
            {isAdmin() && (
              <button
                className="add-event-btn"
                onClick={() => setShowAddDialog(true)}
              >
                <FaPlus />
                Add Event
              </button>
            )}
          </div>
        </div>

        <EventList type={activeTab} />

        {showAddDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h2>Add Event</h2>

              <input
                type="text"
                placeholder="Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="datetime-local"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    startTime: e.target.value,
                  })
                }
              />

              <input
                type="datetime-local"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    endTime: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Hosted By"
                value={newEvent.hostedBy}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    hostedBy: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Person In Charge"
                value={newEvent.personInCharge}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    personInCharge: e.target.value,
                  })
                }
              />

              <div className="dialog-buttons">
                <button className="save-btn" onClick={handleSaveEvent}>
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowAddDialog(false);

                    setNewEvent({
                      title: "",
                      description: "",
                      startTime: "",
                      endTime: "",
                      hostedBy: "",
                      personInCharge: "",
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
  );
}

export default EventPage;
