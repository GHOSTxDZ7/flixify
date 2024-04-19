import React from "react";
import "./style.scss";
import { FaFacebookF, FaInstagram, FaGithub} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ContentWrapper from "../contentWrapper/ContentWrapper";


const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                Welcome to Flixify, your ultimate source for everything related to movies, TV shows and Anime. Explore our comprehensive database to discover the latest releases, ratings, and reviews. From plot summaries to cast details, we've got you covered. Stay informed and entertained with our curated selection of films and series, all in one place.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaGithub />
                    </span>
                    <span className="icon">
                        <MdEmail />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;