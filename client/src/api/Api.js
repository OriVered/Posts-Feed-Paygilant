import axios from "axios";
import { URLS } from "../consts/urls";

/**
 * Api service
 *
 * This service provides static methods for interacting with an external API.
 * It includes robust error handling for network issues and API errors.
 *
 * @class Api
 */
class Api {
    /**
     * Fetch posts from the external API.
     *
     * @returns {Promise<Array>} The posts data fetched from the external API.
     * @throws {Error} Handles and rethrows errors with meaningful messages for the developer.
     *
     * @example
     * const posts = await Api.fetchPosts();
     */
    static async fetchPosts() {
        try {
            const response = await axios.get(`${URLS.FETCH_POSTS}${URLS.POSTS}`);
            return response.data;
        } catch (error) {
            Api.handleError(error, "fetchPosts");
        }
    }

    /**
     * Fetch a single post by ID from the external API.
     *
     * @param {number|string} postId - The ID of the post to fetch.
     * @returns {Promise<Object>} The post data fetched from the external API.
     * @throws {Error} Handles and rethrows errors with meaningful messages for the developer.
     *
     * @example
     * const post = await Api.fetchPostById(1);
     */
    static async fetchPostById(postId) {
        try {
            const response = await axios.get(`${URLS.FETCH_POSTS}${URLS.POSTS}/${postId}`);
            return response.data;
        } catch (error) {
            Api.handleError(error, `fetchPostById (postId: ${postId})`);
        }
    }

    /**
     * Fetch comments for a specific post from the external API.
     *
     * @param {number|string} postId - The ID of the post whose comments are to be fetched.
     * @returns {Promise<Array>} The comments data fetched from the external API.
     * @throws {Error} Handles and rethrows errors with meaningful messages for the developer.
     *
     * @example
     * const comments = await Api.fetchCommentsByPostId(1);
     */
    static async fetchCommentsByPostId(postId) {
        try {
            const response = await axios.get(`${URLS.FETCH_POSTS}${URLS.COMMENTS}`, {
                params: { postId },
            });
            return response.data;
        } catch (error) {
            Api.handleError(error, `fetchCommentsByPostId (postId: ${postId})`);
        }
    }

    /**
     * Handle API errors with meaningful messages.
     *
     * @private
     * @param {Error} error - The error object caught during an API call.
     * @param {string} methodName - The name of the method where the error occurred.
     * @throws {Error} Rethrows the error with additional context.
     *
     * @example
     * Api.handleError(error, "fetchPosts");
     */
    static handleError(error, methodName) {
        if (error.response) {
            // External API responded with an error status code
            console.error(`[API Error] ${methodName}:`, error.response.data);
            throw new Error(
                `[API Error] ${methodName}: ${error.response.status} - ${
                    error.response.data.message || "Unknown error"
                }`
            );
        } else if (error.request) {
            // No response received from the external API
            console.error(`[Network Error] ${methodName}:`, error.request);
            throw new Error(`[Network Error] ${methodName}: No response received from the external API.`);
        } else {
            // An unexpected error occurred
            console.error(`[Unexpected Error] ${methodName}:`, error.message);
            throw new Error(`[Unexpected Error] ${methodName}: ${error.message}`);
        }
    }
}

export default Api;
