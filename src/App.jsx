import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TermsOverview from "./pages/TermsOverview";
import ThemeList from "./pages/ThemeList";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
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
          path="/kwartale"
          element={
            <ProtectedRoute>
              <TermsOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kwartale/:termId"
          element={
            <ProtectedRoute>
              <ThemeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/les/:themeId"
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
          path="/instellings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
