import axios from "axios";
import { URLS } from "../consts/urls";

/**
 * Api Class
 *
 * This class provides static methods for interacting with an external API.
 * It includes robust error handling for network issues and API errors.
 *
 * @class Api
 *
 * @method
 * @static
 * async fetchPosts
 * Fetches posts from an external API using an HTTP GET request.
 *
 * @returns {Promise<Array>} A promise resolving to an array of posts from the external API.
 *
 * @throws {Error} Throws an error if the HTTP request fails, with meaningful error messages.
 *
 * @example
 * const posts = await Api.fetchPosts();
 *
 */
class Api {
    /**
     * Fetch posts from the external API.
     *
     * @returns {Promise<Array>} The posts data fetched from the external API.
     * @throws {Error} Handles and rethrows errors with meaningful messages for the developer.
     */
    static async fetchPosts() {
        try {
            const response = await axios.get(`${URLS.FETCH_POSTS}${URLS.POSTS}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                // External API responded with an error status code
                console.error("API Error:", error.response.data);
                throw new Error(
                    `External API error: ${error.response.status} - ${error.response.data.message || "Unknown error"}`
                );
            } else if (error.request) {
                // No response received from the external API
                console.error("Network Error:", error.request);
                throw new Error("Network error: No response received from the external API.");
            } else {
                // An unexpected error occurred
                console.error("Unexpected Error:", error.message);
                throw new Error(`Unexpected error: ${error.message}`);
            }
        }
    }
}

export default Api;
