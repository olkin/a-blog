import React from 'react';
import '../styles/Hero.scss'
import '../styles/GlobalStyles.scss'
import InProgressLabel from "./InProgressLabel";

function Footer() {
    return (
        <section className="hero">
            <div className="wrap">
                <h1>Welcome to Match Point</h1>
                <ul>
                    <li>Find a tournament. Participate. Improve your skills <InProgressLabel /></li>
                    <li>Find teammates <InProgressLabel /></li>
                    <li>Find a team looking for you <InProgressLabel /></li>
                    <li>Sign in to customize your feed <InProgressLabel /></li>
                </ul>
            </div>
        </section>
    )
}

export default Footer;