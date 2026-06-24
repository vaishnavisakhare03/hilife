import { useState } from "react";
import FeedbackList from "../components/Feedback/FeedbackList";
import "./FeedbackPage.css";

function FeedbackPage() {

    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="feedback-page">
            <div className="feedback-card">

                <div className="feedback-tabs">

                    <button
                        className={activeTab === "all" ? "active" : ""}
                        onClick={() => setActiveTab("all")}
                    >
                        All Feedbacks
                    </button>

                    <button
                        className={activeTab === "liked" ? "active" : ""}
                        onClick={() => setActiveTab("liked")}
                    >
                        Most Liked
                    </button>

                    <button
                        className={activeTab === "disliked" ? "active" : ""}
                        onClick={() => setActiveTab("disliked")}
                    >
                        Most Disliked
                    </button>

                </div>

                <FeedbackList type={activeTab} />

            </div>
        </div>
    );
}

export default FeedbackPage;