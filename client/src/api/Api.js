import axios from "axios";
import { URLS } from "../consts/urls";

/**
 * Api service
 *
 * Provides static methods for interacting with the external API.
 * Accepts `setLoading` and `setError` as arguments for global state management.
 */
const Api = {
    /**
     * Fetch posts from the external API.
     *
     * @param {Function} setLoading - Function to update the loading state.
     * @param {Function} setError - Function to update the error state.
     * @returns {Promise<Array>} The posts data fetched from the external API.
     */
    fetchPosts: async (setLoading, setError) => {
        if (setLoading) setLoading(true); // Enable loading
        try {
            const response = await axios.get(`${URLS.FETCH_POSTS}${URLS.POSTS}`);
            return response.data;
        } catch (error) {
            if (setError) setError("Failed to fetch posts. Please try again.");
            Api.handleError(error, "fetchPosts");
        } finally {
            if (setLoading) setLoading(false); // Disable loading
        }
    },

    /**
     * Fetch a single post by ID from the external API.
     *
     * @param {number|string} postId - The ID of the post to fetch.
     * @param {Function} setLoading - Function to update the loading state.
     * @param {Function} setError - Function to update the error state.
     * @returns {Promise<Object>} The post data fetched from the external API.
     */
    fetchPostById: async (postId, setLoading, setError) => {
        if (setLoading) setLoading(true); // Enable loading
        try {
            const response = await axios.get(`${URLS.FETCH_POSTS}${URLS.POSTS}/${postId}`);
            return response.data;
        } catch (error) {
            if (setError) setError("Failed to fetch post details. Please try again.");
            Api.handleError(error, `fetchPostById (postId: ${postId})`);
        } finally {
            if (setLoading) setLoading(false); // Disable loading
        }
    },

    /**
     * Fetch comments for a specific post from the external API.
     *
     * @param {number|string} postId - The ID of the post whose comments are to be fetched.
     * @param {Function} setLoading - Function to update the loading state.
     * @param {Function} setError - Function to update the error state.
     * @returns {Promise<Array>} The comments data fetched from the external API.
     */
    fetchCommentsByPostId: async (postId, setLoading, setError) => {
        if (setLoading) setLoading(true); // Enable loading
        try {
            const response = await axios.get(`${URLS.FETCH_POSTS}${URLS.COMMENTS}`, {
                params: { postId },
            });
            return response.data;
        } catch (error) {
            if (setError) setError("Failed to fetch comments. Please try again.");
            Api.handleError(error, `fetchCommentsByPostId (postId: ${postId})`);
        } finally {
            if (setLoading) setLoading(false); // Disable loading
        }
    },

    /**
     * Handle API errors with meaningful messages.
     *
     * @param {Error} error - The error object.
     * @param {string} methodName - The name of the method where the error occurred.
     * @throws {Error} Rethrows the error with additional context.
     */
    handleError: (error, methodName) => {
        if (error.response) {
            console.error(`[API Error] ${methodName}:`, error.response.data);
            throw new Error(
                `[API Error] ${methodName}: ${error.response.status} - ${
                    error.response.data.message || "Unknown error"
                }`
            );
        } else if (error.request) {
            console.error(`[Network Error] ${methodName}:`, error.request);
            throw new Error(`[Network Error] ${methodName}: No response received from the external API.`);
        } else {
            console.error(`[Unexpected Error] ${methodName}:`, error.message);
            throw new Error(`[Unexpected Error] ${methodName}: ${error.message}`);
        }
    },
};

export default Api;
