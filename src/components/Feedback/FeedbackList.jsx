import { useEffect, useState } from "react";
import { getAllFeedbacks } from "../../api/feedbackApi";

import {
    FaUser,
    FaThumbsUp,
    FaThumbsDown,
    FaCalendarAlt,
    FaCommentAlt
} from "react-icons/fa";

import "./FeedbackList.css";

function FeedbackList({ type }) {

    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await getAllFeedbacks();
            setFeedbacks(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    let filteredFeedbacks = [...feedbacks];

    if (type === "liked") {
        filteredFeedbacks.sort(
            (a, b) => b.likesCount - a.likesCount
        );
    }

    if (type === "disliked") {
        filteredFeedbacks.sort(
            (a, b) => b.dislikesCount - a.dislikesCount
        );
    }

    if (loading) {
        return <h2>Loading Feedbacks...</h2>;
    }

    return (
        <div className="feedback-container">

            {filteredFeedbacks.map((feedback) => (

                <div
                    key={feedback.id}
                    className="feedback-item"
                >

                    <div className="feedback-header">
                        <h3>{feedback.title}</h3>
                    </div>

                    <div className="feedback-info description">
                        <FaCommentAlt />
                        <span>{feedback.description}</span>
                    </div>

                    <div className="feedback-info user">
                        <FaUser />
                        <span>{feedback.postedBy}</span>
                    </div>

                    <div className="feedback-info date">
                        <FaCalendarAlt />
                        <span>
                            {new Date(
                                feedback.createdOn
                            ).toLocaleString()}
                        </span>
                    </div>

                    <div className="feedback-reactions">

                        <div className="reaction like">
                            <FaThumbsUp />
                            <span>
                                {feedback.likesCount}
                            </span>
                        </div>

                        <div className="reaction dislike">
                            <FaThumbsDown />
                            <span>
                                {feedback.dislikesCount}
                            </span>
                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default FeedbackList;