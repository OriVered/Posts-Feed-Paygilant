import React from "react";
import { useLoaderContext } from "../contexts/LoaderContext";
import "../assets/styles/ErrorMessage.scss";

/**
 * ErrorMessage Component
 *
 * Displays an error message from the global `error` state, styled for inline placement.
 *
 * @component
 * @returns {JSX.Element|null} An error message or null if no error.
 */
const ErrorMessage = () => {
    const { error } = useLoaderContext();

    if (!error) return null;

    return (
        <div className="error-message">
            <p>{error}</p>
        </div>
    );
};

export default ErrorMessage;
