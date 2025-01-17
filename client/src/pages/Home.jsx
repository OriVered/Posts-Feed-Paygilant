import React, { useEffect, useState } from "react";
import { HOME_TEXTS } from "../consts/texts";
import "../assets/styles/Home.scss";
import Api from "../api/Api";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { usePostsContext } from "../contexts/PostsContext";
import { useLoaderContext } from "../contexts/LoaderContext";

/**
 * Home Component
 *
 * Displays the main title for the home page and a list of posts.
 * Includes a search bar to filter posts by title.
 *
 * @component
 * @returns {JSX.Element} The Home page content wrapped in a styled container.
 *
 * @example
 * <Home />
 */
const Home = () => {
    const { posts, setPosts } = usePostsContext();
    const { setLoading, setError, error } = useLoaderContext();
    const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await Api.fetchPosts(setLoading, setError);
                setPosts(postsData);
                setFilteredPosts(postsData); // Initialize filtered posts
            } catch (err) {
                setError(HOME_TEXTS.ERROR_FETCH);
            }
        };

        fetchPosts();
    }, [setPosts, setLoading, setError]);

    return (
        <div className="home container">
            <h1>{HOME_TEXTS.TITLE}</h1>

            {/* Error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Search Bar */}
            <SearchBar posts={posts} onFilteredPosts={setFilteredPosts} />

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
