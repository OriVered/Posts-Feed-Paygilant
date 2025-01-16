import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
/**
 * App Component
 *
 * This is the root component of the application. It uses React Router for routing
 * and sets up the main routing structure of the app.
 *
 * @component
 * @returns {JSX.Element} The root element of the application containing routing setup.
 *
 * @example
 * <App />
 *
 * Features:
 * - The app uses `BrowserRouter` for handling routing.
 * - The `Routes` component defines the application's route configuration.
 *
 */
const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
);

export default App;
