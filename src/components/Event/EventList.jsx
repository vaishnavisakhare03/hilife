import { useEffect, useState } from "react";
import { getAllEvents } from "../../api/eventApi";
import axios from "axios";
import "./EventList.css";

function EventList() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {

        try {

            // const response = await axios.get("http://localhost:8080/events");
            const response = await getAllEvents();

            setEvents(response.data);
            setLoading(false);

        } catch (error) {

            console.error("Error fetching events:", error);
            setLoading(false);
        }
    };

    if (loading) {

        return (
            <div className="loading-container">
                <h2>Loading Events...</h2>
            </div>
        );
    }

    return (

        <div className="page">

            <h1 className="heading">📅 Event Dashboard</h1>

            <div className="card-container">

                {events.map((event) => (

                    <div key={event.id} className="card">

                        <div className="card-header">

                            <h2 className="event-title">
                                {event.title}
                            </h2>

                        </div>

                        <div className="card-body">

                            <p>
                                <strong>Description:</strong>
                                {" "}
                                {event.description}
                            </p>

                            <p>
                                <strong>Hosted By:</strong>
                                {" "}
                                {event.hostedBy}
                            </p>

                            <p>
                                <strong>Person In Charge:</strong>
                                {" "}
                                {event.personInCharge}
                            </p>

                            <p>
                                <strong>Start Time:</strong>
                                {" "}
                                {new Date(event.startTime).toLocaleString()}
                            </p>

                            <p>
                                <strong>End Time:</strong>
                                {" "}
                                {new Date(event.endTime).toLocaleString()}
                            </p>

                            <p>
                                <strong>Posted On:</strong>
                                {" "}
                                {new Date(event.postedOn).toLocaleString()}
                            </p>

                        </div>

                        <div className="button-container">

                            <button className="edit-button">
                                Edit
                            </button>

                            <button className="delete-button">
                                Delete
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default EventList;