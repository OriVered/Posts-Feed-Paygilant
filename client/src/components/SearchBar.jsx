import React from "react";
import "../assets/styles/SearchBar.scss";
import { HOME_TEXTS } from "../consts/texts";

/**
 * SearchBar Component
 *
 * A stateless component for the search bar UI.
 *
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {string} props.query - The current search query.
 * @param {Function} props.onQueryChange - Callback to update the query in the parent component.
 * @returns {JSX.Element} The search bar input.
 *
 * @example
 * <SearchBar query={query} onQueryChange={handleQueryChange} />
 */
const SearchBar = ({ query, onQueryChange }) => {
    const handleInputChange = (e) => {
        onQueryChange(e.target.value); // Notify parent component of query change
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
