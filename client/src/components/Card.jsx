import React from "react";
import "../assets/styles/Card.scss";

/**
 * Card Component
 *
 * This component displays a single post with a title and body. It is intended
 * to be used for showing individual posts within the home page or other sections.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.id - The unique ID of the post.
 * @param {string} props.title - The title of the post.
 * @param {string} props.body - The body/content of the post.
 * @returns {JSX.Element} A card element containing a post's title and body.
 *
 * @example
 * const post = { id: 1, title: "Post Title", body: "This is the body of the post." };
 * <Card id={post.id} title={post.title} body={post.body} />
 *
 */
const Card = ({ id, title, body }) => {
    return (
        <div className="card">
                <h2>{title}</h2>
                <p>{body}</p>
        </div>
    );
};

export default Card;
