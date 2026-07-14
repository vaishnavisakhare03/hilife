import { useState } from "react";
import FeedbackList from "../components/Feedback/FeedbackList";
import "./FeedbackPage.css";
import { FaPlus } from "react-icons/fa";
import { createFeedback } from "../api/feedbackApi";

function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("all");

  const [showDialog, setShowDialog] = useState(false);

  const [feedbackData, setFeedbackData] = useState({
    title: "",
    description: "",
  });

  const handleSaveFeedback = async () => {
    try {
      const feedbackRequest = {
        title: feedbackData.title,
        description: feedbackData.description,
      };

      await createFeedback(feedbackRequest);

      setShowDialog(false);

      setFeedbackData({
        title: "",
        description: "",
      });

      window.location.reload();
    } catch (error) {
      console.error("Failed to save feedback", error);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <div className="feedback-tabs">
          <div className="feedback-tabs">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              Feedbacks
            </button>

            <button
              className={activeTab === "mine" ? "active" : ""}
              onClick={() => setActiveTab("mine")}
            >
              Feedbacks By You
            </button>
          </div>

          <div>
            <button
              className="add-feedback-btn"
              onClick={() => setShowDialog(true)}
            >
              <FaPlus />
              Add Feedback
            </button>
          </div>
        </div>

        {showDialog && (
          <div className="modal-overlay">
            <div className="feedback-modal">
              <h2>Add Feedback</h2>

              <input
                type="text"
                placeholder="Feedback Title"
                value={feedbackData.title}
                onChange={(e) =>
                  setFeedbackData({
                    ...feedbackData,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Write your feedback..."
                rows="5"
                value={feedbackData.description}
                onChange={(e) =>
                  setFeedbackData({
                    ...feedbackData,
                    description: e.target.value,
                  })
                }
              />

              <div className="modal-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>

                <button className="save-btn" onClick={handleSaveFeedback}>
                  Save Feedback
                </button>
              </div>
            </div>
          </div>
        )}

        <FeedbackList type={activeTab} />
      </div>
    </div>
  );
}

export default FeedbackPage;
