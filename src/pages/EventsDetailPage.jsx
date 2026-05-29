import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEventById } from "../api/eventApi";

function EventDetailsPage() {

    const { id } = useParams();

    const [event, setEvent] = useState(null);

    useEffect(() => {

        fetchEvent();

    }, [id]);

    const fetchEvent = async () => {

        try {

            const response = await getEventById(id);

            setEvent(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    if (!event) {

        return <h2>Loading...</h2>;
    }

    return (

        <div style={{ padding: "40px" }}>

            <h1>{event.title}</h1>

            <p>{event.description}</p>

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

        </div>
    );
}

export default EventDetailsPage;