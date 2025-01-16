import React from "react";
import { HOME_TEXTS } from "../consts/texts";
import "../assets/styles/Home.scss";

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
    return (
        <div className="home container">
            <h1>{HOME_TEXTS.TITLE}</h1>
        </div>
    );
};

export default Home;
