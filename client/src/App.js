import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import {PostsProvider} from "./contexts/PostsContext";
import {LoaderProvider} from "./contexts/LoaderContext"
import Loader from "./components/Loader"
import ErrorMessage from "./components/ErrorMessage";
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
  <LoaderProvider>
    <PostsProvider>
      <Router>
          <Loader /> {/* Global Loader */}
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
      </Router>
  </PostsProvider>
</LoaderProvider>
);

export default App;
