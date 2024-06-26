import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/flixify-header.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    
    useEffect(() => {
      window.scrollTo(0,0)
    },[location])

    // Show or hide nav bar based on scroll position
    const navbarControl = () => {
      // console.log(window.scrollY)
      if (window.scrollY > 200){
        if (window.scrollY > lastScrollY && !mobileMenu){
          setShow('hide')
        }
        else {
          setShow('show')
        }
      }
      else{
        setShow('top')
      }
      setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', navbarControl)
        return  () => window.removeEventListener('scroll', navbarControl)
      }, [lastScrollY])

      const navigation = (type) => {
        if (type === "movie") {
          navigate("/explore/movie");
        } else if (type === "tv") {
          navigate("/explore/tv");
        } else if (type === "anime") {
          navigate("/explore/anime");
        }
        setMobileMenu(false);
      };

    
    const openSearch = () => {
      setMobileMenu(false)
      setShowSearch(true)
    } 
  
    const openMobileMenu = () => {
      setMobileMenu(true)
      setShowSearch(false)
    }

    const searchQuery = (event) => {
      if(event.key === 'Enter' && query.length > 0){
        navigate(`/search/${query}`)
        setTimeout(() => {
          setShowSearch(false)
        }, 1000);
      }
    } 

    return (
        <header className={`header ${mobileMenu ? "mobileView":""} ${show}`}>
          <ContentWrapper>
            <div className="logo">
              <img src={logo} alt="" onClick={()=>navigate("/")}/>
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={() => navigation("movie")}>Movies</li>
              <li className="menuItem" onClick={() => navigation("tv")}>TV Shows</li>
              <li className="menuItem" onClick={() => navigation("anime")}>Anime</li>
              <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
            </ul>

            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch} />
              {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu onClick={openMobileMenu} />)}
            </div>
          </ContentWrapper>

          {showSearch && (<div className="searchBar">
            <ContentWrapper>
              <div className="searchInput">
                <input type="text" placeholder='Search for a movie or a tv show...' onKeyUp={searchQuery} onChange={(e) => setQuery(e.target.value)}/>
                <VscChromeClose onClick={() => setShowSearch(false)}/>
              </div>
            </ContentWrapper>
          </div>)}
        </header>
    );
};

export default Header;