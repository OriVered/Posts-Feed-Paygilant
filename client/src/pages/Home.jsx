import React, { useState, useEffect } from "react";
import { HOME_TEXTS } from "../consts/texts";
import "../assets/styles/Home.scss";
import Api from "../api/Api";
import Card from "../components/Card"
/**
 * Home Component
 *
 * This is the Home component of the application. It displays the main title
 * for the home page using text constants and applies styles from the associated SCSS file.
 *
 * @component
 * @returns {JSX.Element} The Home page content wrapped in a styled container.
 *
 * @example
 * <Home />
 *
 */
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch posts when the component mounts
        const fetchData = async () => {
            try {
                const postsData = await Api.fetchPosts();
                setPosts(postsData);  // Set the fetched posts to state
            } catch (err) {
                setError(err.message);  // Set error if fetching fails
            } finally {
                setLoading(false);  // Set loading to false once the fetch completes
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error if any occurs
    }

    return (
        <div className="home container">
            <h1>{HOME_TEXTS.TITLE}</h1>
            <div className="posts">
                {posts.map((post) => (
                    <Card key={post.id} id={post.id} title={post.title} body={post.body} />
                ))}
            </div>
        </div>
    );
};

export default Home;
