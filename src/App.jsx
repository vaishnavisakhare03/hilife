import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventsDetailPage";
import TaskPage from "./pages/TaskPage";
import FeedbackPage from "./pages/FeedbackPage";
import CommitteePage from "./pages/CommitteePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />

          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/feedbacks" element={<FeedbackPage />} />
          <Route path="/committee" element={<CommitteePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
