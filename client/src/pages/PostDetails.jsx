import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { POST_DETAILS_TEXTS, COMMON_TEXTS } from "../consts/texts";
import Api from "../api/Api";
import "../assets/styles/PostDetails.scss";
import { useLoaderContext } from "../contexts/LoaderContext";

/**
 * PostDetails Component
 *
 * This component displays the details of a specific post, including its title and body.
 * It also fetches and displays the associated comments for that post. The component handles
 * loading, error, and successful fetching of the post and comments data.
 *
 * @component
 * @returns {JSX.Element} The post details page with post content and comments.
 *
 * @example
 * <PostDetails />
 *
 */
const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [post, setPost] = useState(null); 
    const [comments, setComments] = useState([]); 
    const { setLoading, setError } = useLoaderContext();

    /**
     * Fetches post and comments data when the component mounts or when the post ID changes.
     * 
     * This function calls the API to fetch the post and associated comments by the post ID.
     * It handles errors by updating the `error` state and shows a loading indicator during the fetch process.
     */
    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                setLoading(true);
                // Fetch post and comments data concurrently using Promise.all
                const [postData, commentsData] = await Promise.all([
                    Api.fetchPostById(id),
                    Api.fetchCommentsByPostId(id),
                ]);
                setPost(postData); 
                setComments(commentsData); 
            } catch (err) {
                setError(POST_DETAILS_TEXTS.ERROR_FETCH);
            } finally {
                setLoading(false); 
            }
        };

        fetchPostDetails();
    }, [id]); // Dependency array ensures the effect runs when the `id` changes

    return (
        <div className="post-details container">

            {/* Back button to navigate to the previous page */}
            <button className="back-button" onClick={() => navigate(-1)}>
                {COMMON_TEXTS.BACK_BUTTON}
            </button>

            {/* Page title display */}
            <h1>{POST_DETAILS_TEXTS.TITLE}</h1>

            {/* Post content display */}
            {post && (
                <div className="post-content">
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            )}

            {/* Comments section */}
            <div className="comments-section">
                <h2>{POST_DETAILS_TEXTS.COMMENTS_TITLE}</h2>
                {comments.length > 0 ? (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <h3>{comment.name}</h3>
                                <p>{comment.body}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{COMMON_TEXTS.NO_COMMENTS}</p> // Message if no comments exist
                )}
            </div>
        </div>
    );
};

export default PostDetails;
