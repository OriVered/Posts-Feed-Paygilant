import React, { createContext, useState, useContext } from "react";

// Create the LoaderContext
export const LoaderContext = createContext();

/**
 * LoaderProvider Component
 *
 * Provides global loading and error states.
 *
 * @component
 * @param {Object} props - The children to wrap with the LoaderProvider.
 * @returns {JSX.Element} The LoaderProvider wrapping its children.
 */
export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <LoaderContext.Provider value={{ loading, setLoading, error, setError }}>
            {children}
        </LoaderContext.Provider>
    );
};

/**
 * Custom hook to access the LoaderContext.
 *
 * @returns {Object} Contains `loading`, `setLoading`, `error`, and `setError`.
 */
export const useLoaderContext = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error("useLoaderContext must be used within a LoaderProvider");
    }
    return context;
};
