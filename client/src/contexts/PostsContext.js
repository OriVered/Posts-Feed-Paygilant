import React, { createContext, useState, useEffect, useContext } from "react";
import Api from "../api/Api";
import { HOME_TEXTS } from "../consts/texts";
import { useLoaderContext } from "./LoaderContext";

/**
 * PostsContext
 * Provides global access to posts data and its updater function.
 */
export const PostsContext = createContext();

/**
 * PostsProvider Component
 * Fetches posts once during initialization and provides them globally.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Children components to wrap.
 * @returns {JSX.Element} The context provider with posts state.
 */
export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]); // Global posts state
    const { setLoading, setError } = useLoaderContext();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true); // Enable global loading
                const postsData = await Api.fetchPosts();
                setPosts(postsData || []); // Initialize posts
            } catch (err) {
                setError(HOME_TEXTS.ERROR_FETCH); // Set global error
            } finally {
                setLoading(false); // Disable global loading
            }
        };

        fetchPosts();
    }, [setLoading, setError]);

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

/**
 * Custom hook to access the PostsContext.
 * @returns {Object} Posts context value.
 */
export const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("usePostsContext must be used within a PostsProvider");
    }
    return context;
};
