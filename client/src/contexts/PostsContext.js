import React, { createContext, useState, useContext } from "react";

// Create the Posts Context
export const PostsContext = createContext();

/**
 * PostsProvider Component
 *
 * Manages the global state for posts,  and error handling.
 * Provides methods to fetch and manage posts state management.
 *
 * @component
 * @param {Object} props - The props for this component.
 * @returns {JSX.Element} The PostsProvider component wrapping its children.
 */
export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    return (
        <PostsContext.Provider value={{ posts, setPosts, error, setError }}>
            {children}
        </PostsContext.Provider>
    );
};

/**
 * Custom hook to access the PostsContext.
 *
 * @returns {Object} Contains `posts`and `setPosts`.
 */
export const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("usePostsContext must be used within a PostsProvider");
    }
    return context;
};
