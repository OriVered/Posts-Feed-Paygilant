import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_TEXTS, ADD_POST_TEXTS } from "../consts/texts";
import "../assets/styles/Home.scss";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { usePostsContext } from "../contexts/PostsContext";
import { useLoaderContext } from "../contexts/LoaderContext";

/**
 * Home Component
 *
 * Displays the main title for the home page and a list of posts.
 * Includes a form for adding a new post and a search bar for filtering posts.
 *
 * @component
 * @returns {JSX.Element} The Home page content wrapped in a styled container.
 *
 * @example
 * <Home />
 */
const Home = () => {
    const { posts } = usePostsContext(); // Get posts from context
    const { error } = useLoaderContext(); // Get error from context
    const navigate = useNavigate();
    const [query, setQuery] = useState(""); // Search query state
    const [filteredPosts, setFilteredPosts] = useState([]); // Filtered posts state

    // Update filtered posts whenever `posts` changes or `query` changes
    useEffect(() => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredPosts(filtered);
    }, [posts, query]);

    /**
     * Updates the search query.
     *
     * @param {string} searchQuery - The current search query.
     */
    const handleQueryChange = useCallback((searchQuery) => {
        setQuery(searchQuery); // Update the query state
    }, []);

    return (
        <div className="home container">
            <h1>{HOME_TEXTS.TITLE}</h1>

            {/* Error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Search Bar */}
            <SearchBar query={query} onQueryChange={handleQueryChange} />

            {/* Add Post Button */}
            <button className="add-post-button" onClick={() => navigate("/add-post")}>
                {ADD_POST_TEXTS.BUTTON}
            </button>

            {/* Posts */}
            <div className="posts">
                {filteredPosts.map((post) => (
                    <Card key={post.id} id={post.id} title={post.title} body={post.body} />
                ))}
            </div>
        </div>
    );
};

export default Home;
