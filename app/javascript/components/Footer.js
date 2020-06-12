import React from 'react';
import '../styles/Footer.scss';
import '../styles/GlobalStyles.scss';

function Footer() {
    return (
        <div className="footer">
            <div className="wrap">
                <div className="grid-x grid-padding-x small-up-1 medium-up-3">
                    <div className="cell">
                        <h4>Contact Info</h4>
                        <hr/>
                        <a href='#'><span>Phone</span> 555 555 55555 </a>
                        <a href='#'><span>Email</span> email_here@whatever.com </a>
                    </div>
                    <div className="cell">
                        <h4>Site Map</h4>
                        <hr/>
                        <a href='#'>About Us</a>
                        <a href='#'>Contact Us</a>
                    </div>
                    <div className="cell">
                        <h4>Social Media</h4>
                        <hr/>
                        <a href='#'>Facebook</a>
                        <a href='#'>Twitter</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;