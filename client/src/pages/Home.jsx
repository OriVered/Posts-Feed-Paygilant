import React, {useEffect } from "react";
import { HOME_TEXTS, COMMON_TEXTS } from "../consts/texts";
import "../assets/styles/Home.scss";
import Api from "../api/Api";
import Card from "../components/Card"
import { usePostsContext } from "../contexts/PostsContext";
import { useLoaderContext } from "../contexts/LoaderContext";

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

    const { posts, setPosts } = usePostsContext();
    const { setLoading, setError, error } = useLoaderContext();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await Api.fetchPosts(setLoading, setError);
                setPosts(postsData);
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

            <div className="posts">
                {posts.map((post) => (
                    <Card key={post.id} id={post.id} title={post.title} body={post.body} />
                ))}
            </div>
        </div>
    );
};

export default Home;
