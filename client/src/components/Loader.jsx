import React, { useContext } from "react";
import "../assets/styles/Loader.scss";
import { LoaderContext } from "../contexts/LoaderContext";

/**
 * Loader Component
 *
 * Displays a global loading spinner when the `loading` state in the PostsContext is true.
 *
 * @component
 * @returns {JSX.Element|null} A spinner if loading is true, otherwise null.
 */
const Loader = () => {
    const { loading } = useContext(LoaderContext);

    if (!loading) return null;

    return (
        <div className="loader-overlay">
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
