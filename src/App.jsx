import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TopicsOverview from "./pages/TopicsOverview";
import TopicDetail from "./pages/TopicDetail";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import Learners from "./pages/Learners";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/aanmeld" element={<Login />} />
        <Route path="/registreer" element={<Signup />} />
        <Route
          path="/tuisblad"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onderwerpe"
          element={
            <ProtectedRoute>
              <TopicsOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onderwerp/:topicId"
          element={
            <ProtectedRoute>
              <TopicDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onderwerp/:topicId/:lessonIndex"
          element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiel"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leerders"
          element={
            <ProtectedRoute>
              <Learners />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
