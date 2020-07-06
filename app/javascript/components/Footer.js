import React from 'react';
import '../styles/Footer.scss';
import '../styles/GlobalStyles.scss';

function Footer() {
    return (
        <div className="footer">
            <div className="wrap">
                <ul>
                    <li><a href='#'>About Us</a></li>
                    <li><a href='#'>Contact Us</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;