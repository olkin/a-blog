import React from 'react';
import '../styles/Hero.scss'
import '../styles/GlobalStyles.scss'
import InProgressLabel from "./InProgressLabel";

function Hero() {
    return (
        <section className="hero">
            <div className="wrap">
                <h1>Welcome to Nets & Balls</h1>
                <ul>
                    <li>Find a tournament. Participate. Improve your skills <InProgressLabel /></li>
                    <li>Find teammates. Get social <InProgressLabel /></li>
                    <li>Find a team looking for you. Make them happy <InProgressLabel /></li>
                    <li>Sign in to customize your feed or create new events. <InProgressLabel /></li>
                </ul>
            </div>
        </section>
    )
}

export default Hero;