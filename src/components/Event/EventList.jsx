import { useEffect, useState } from "react";
import { getAllEvents, updateEvent, deleteEvent } from "../../api/eventApi";
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
import { isAdmin } from "../../utils/auth";

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

    if (type === "completed") {
      return eventStartTime < currentTime;
    }

    if (type === "upcoming") {
      return eventStartTime >= currentTime;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading Events...</h2>
      </div>
    );
  }

  const handleEdit = async (event) => {
    const updatedTitle = prompt("Enter event title", event.title);

    if (!updatedTitle) return;

    const updatedDescription = prompt(
      "Enter event description",
      event.description,
    );

    if (!updatedDescription) return;

    const updatedStartTime = prompt(
      "Enter start time (YYYY-MM-DDTHH:mm:ss)",
      event.startTime,
    );

    if (!updatedStartTime) return;

    const updatedEndTime = prompt(
      "Enter end time (YYYY-MM-DDTHH:mm:ss)",
      event.endTime,
    );

    if (!updatedEndTime) return;

    const updatedHostedBy = prompt("Enter host organization", event.hostedBy);

    if (!updatedHostedBy) return;

    try {
      const updatedEvent = {
        title: updatedTitle,
        description: updatedDescription,
        startTime: updatedStartTime,
        endTime: updatedEndTime,
        hostedBy: updatedHostedBy,
      };

      await updateEvent(event.id, updatedEvent);

      fetchEvents();
    } catch (error) {
      console.error("Error updating event", error);
    }
  };



  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(eventId);

      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

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
                      <button
                        className="icon-btn edit"
                        onClick={() => handleEdit(event)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="icon-btn delete"
                        onClick={() => handleDelete(event.id)}
                      >
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
