import React from "react";
import { useLoaderContext } from "../contexts/LoaderContext";
import "../assets/styles/ErrorMessage.scss";

/**
 * ErrorMessage Component
 *
 * Displays a global error banner when the `error` state in the LoaderContext is set.
 *
 * @component
 * @returns {JSX.Element|null} An error banner or null if no error.
 */
const ErrorMessage = () => {
    const { error, setError } = useLoaderContext();

    if (!error) return null;

    return (
        <div className="error-banner">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
        </div>
    );
};

export default ErrorMessage;
