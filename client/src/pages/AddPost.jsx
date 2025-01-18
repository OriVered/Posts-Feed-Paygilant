import React, { useState } from "react";
import "../assets/styles/AddPost.scss";
import { ADD_POST_TEXTS, COMMON_TEXTS } from "../consts/texts";
import { usePostsContext } from "../contexts/PostsContext";
import { useNavigate } from "react-router-dom";

/**
 * AddPost Component
 *
 * A component that allows users to add a new post.
 * The new post is added to the global list of posts managed by `PostsContext`.
 *
 * @component
 * @returns {JSX.Element} The form for adding a new post.
 *
 * @example
 * <AddPost />
 */
const AddPost = () => {
    const { posts, setPosts, setLoading } = usePostsContext();
    const [title, setTitle] = useState(""); // Local state for title
    const [body, setBody] = useState(""); // Local state for body
    const [error, setError] = useState(null); // Local error state
    const navigate = useNavigate();

    /**
     * Handles the form submission to add a new post.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = (e) => {
        if (setLoading) setLoading(true); // Enable loading
        e.preventDefault(); // Prevent default form submission

        // Validate input fields
        if (!title.trim() || !body.trim()) {
            setError(ADD_POST_TEXTS.ERROR_MISSING_FIELDS); // Use constant for error message
            return;
        }

        // Create a new post object
        const newPost = {
            id: posts.length + 1, // Generate a new ID
            title,
            body,
        };

        // Update the global posts state
        setPosts([...posts, newPost]);

        // Reset form fields
        setTitle("");
        setBody("");
        setError(null);
        
        // Navigate back to the home page
        navigate("/");
        if (setLoading) setLoading(false); // Disable loading
    };

    return (
        <div className="add-post">
            {/* Back button to navigate to the previous page */}
            <button className="button" onClick={() => navigate(-1)}>
                {COMMON_TEXTS.BACK_BUTTON}
            </button>
            <h1>{ADD_POST_TEXTS.TITLE}</h1>

            {/* Error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Add post form */}
            <div className="form-content">
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    value={title}
                    placeholder={ADD_POST_TEXTS.TITLE_PLACEHOLDER}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    value={body}
                    placeholder={ADD_POST_TEXTS.BODY_PLACEHOLDER}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit">{ADD_POST_TEXTS.BUTTON}</button>
            </form>
            </div>
        </div>
    );
};

export default AddPost;
