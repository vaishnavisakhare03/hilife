import { useEffect, useState } from "react";
import { getAllEvents } from "../../api/eventApi";
import "./EventList.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import currentUser from "../../data/currentUser";
import {
  FaRegFileAlt,
  FaBuilding,
  FaUserTie,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

function EventList({ type }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();

      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventStartTime = new Date(event.startTime);
    const currentTime = new Date();

    return type === "completed"
      ? eventStartTime < currentTime
      : eventStartTime >= currentTime;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading Events...</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="card">
              <div className="card-header">
                <h2 className="event-title">{event.title}</h2>

                <div className="button-container">
                  {isAdmin() && (
                    <>
                      <button className="icon-btn edit">
                        <FaEdit />
                      </button>

                      <button className="icon-btn delete">
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="card-body">
                <div className="event-info description">
                  <FaRegFileAlt className="info-icon" />
                  <span>{event.description}</span>
                </div>

                <div className="event-info host">
                  <FaBuilding className="info-icon" />
                  <span>{event.hostedBy}</span>
                </div>

                <div className="event-info coordinator">
                  <FaUserTie className="info-icon" />
                  <span>{event.personInCharge}</span>
                </div>

                <div className="event-info date">
                  <FaCalendarAlt className="info-icon" />
                  <span>{new Date(event.startTime).toLocaleDateString()}</span>
                </div>

                <div className="event-info time">
                  <FaClock className="info-icon" />
                  <span>
                    {new Date(event.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" - "}
                    {new Date(event.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>
              No {type === "completed" ? "Completed" : "Upcoming"} Events Found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList;
