import { useEffect, useState } from "react";
import { getAllFeedbacks } from "../../api/feedbackApi";

import {
  FaUser,
  FaThumbsUp,
  FaThumbsDown,
  FaCalendarAlt,
  FaCommentAlt,
} from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./FeedbackList.css";
import {
  likeFeedback,
  dislikeFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "../../api/feedbackApi";

import { isAdmin } from "../../utils/auth";

function FeedbackList({ type }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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

  const handleEdit = async (feedback) => {
    const newTitle = prompt("Enter new title", feedback.title);

    if (!newTitle) return;

    const newDescription = prompt(
      "Enter new description",
      feedback.description,
    );

    if (!newDescription) return;

    try {
      const updatedFeedback = {
        title: newTitle,
        description: newDescription,
      };

      await updateFeedback(feedback.id, updatedFeedback);

      fetchFeedbacks();
    } catch (error) {
      console.error("Error updating feedback", error);
    }
  };

  const handleDelete = async (feedbackId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?",
    );

    if (!confirmDelete) return;

    try {
      await deleteFeedback(feedbackId);

      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== feedbackId));
    } catch (error) {
      console.error("Error deleting feedback", error);
    }
  };

  const handleLike = async (feedbackId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      await likeFeedback(feedbackId);

      window.location.reload();
    } catch (error) {
      console.error("Error liking feedback", error);
    }
  };

  const handleDislike = async (feedbackId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      await dislikeFeedback(feedbackId);

      window.location.reload();
    } catch (error) {
      console.error("Error disliking feedback", error);
    }
  };

  let filteredFeedbacks = [...feedbacks];

  if (type === "mine") {
    filteredFeedbacks = feedbacks.filter(
      (feedback) => feedback.postedByUserId === currentUser?.id,
    );
  }

  if (loading) {
    return <h2>Loading Feedbacks...</h2>;
  }

  if (filteredFeedbacks.length === 0) {
  return (
    <div className="empty-feedback">
      No feedback found.
    </div>
  );
}


  return (
    <div className="feedback-container">
     {filteredFeedbacks.map((feedback) => (
        <div key={feedback.id} className="feedback-item">
          <div className="feedback-header">
            <div>
              <h3>{feedback.title}</h3>
            </div>
            <div className="button-container">
              {feedback.postedByUserId === currentUser?.id && (
                <button
                  className="icon-btn edit"
                  onClick={() => handleEdit(feedback)}
                >
                  <FaEdit />
                </button>
              )}

              {(feedback.postedByUserId === currentUser?.id || isAdmin()) && (
                <button
                  className="icon-btn delete"
                  onClick={() => handleDelete(feedback.id)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
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
            <span>{new Date(feedback.createdOn).toLocaleString()}</span>
          </div>

          <div className="feedback-reactions">
            <div
              className="reaction like"
              onClick={() => handleLike(feedback.id)}
            >
              <FaThumbsUp />
              <span>{feedback.likesCount}</span>
            </div>

            <div
              className="reaction dislike"
              onClick={() => handleDislike(feedback.id)}
            >
              <FaThumbsDown />
              <span>{feedback.dislikesCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;
