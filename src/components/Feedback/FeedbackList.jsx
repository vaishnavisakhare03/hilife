import { useEffect, useState } from "react";
import { getAllFeedbacks } from "../../api/feedbackApi";
import "./FeedbackList.css";

function FeedbackList() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await getAllFeedbacks();
            setFeedbacks(response.data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-container">

            <h2 className="feedback-title">Feedbacks</h2>

            {loading ? (
                <p className="loading-text">
                    Loading feedbacks...
                </p>
            ) : feedbacks.length === 0 ? (
                <p className="empty-text">
                    No feedbacks available
                </p>
            ) : (
                <div className="feedback-list">

                    {feedbacks.map((feedback) => (

                        <div
                            className="feedback-card"
                            key={feedback.id}
                        >

                            <h3 className="feedback-heading">
                                {feedback.title}
                            </h3>

                            <p className="feedback-message">
                                {feedback.description}
                            </p>

                            <p className="feedback-date">
                                {new Date(
                                    feedback.createdOn
                                ).toLocaleString()}
                            </p>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default FeedbackList;