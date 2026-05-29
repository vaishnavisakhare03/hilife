import { useState } from "react";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventsDetailPage";
import { Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <Routes>
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />

      <Route path="/tasks" element={<TaskPage />} />
      
      <Route path="/feedbacks" element={<FeedbackPage />} />
    </Routes>
  );
}

export default App;
