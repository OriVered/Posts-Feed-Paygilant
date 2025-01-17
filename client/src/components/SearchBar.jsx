import React, { useState, useEffect } from "react";
import "../assets/styles/SearchBar.scss";
import { HOME_TEXTS } from "../consts/texts";

/**
 * SearchBar Component
 *
 * A reusable component that handles search functionality and manages filtered posts.
 *
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {Array} props.posts - The full list of posts to filter.
 * @param {Function} props.onFilteredPosts - Callback to pass the filtered posts back to the parent.
 * @returns {JSX.Element} The search bar input and filtered posts display.
 *
 * @example
 * <SearchBar posts={posts} onFilteredPosts={handleFilteredPosts} />
 */
const SearchBar = ({ posts, onFilteredPosts }) => {
    const [query, setQuery] = useState(""); // Local state for search query


    /**
     * Filters posts based on the search query.
     */
    useEffect(() => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(lowerCaseQuery)
        );

        onFilteredPosts(filtered); // Pass filtered posts to the parent
    }, [query, posts, onFilteredPosts]);

    /**
     * Handles input change and updates the search query.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                placeholder={HOME_TEXTS.SEARCH_PLACEHOLDER}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;
