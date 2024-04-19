import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../customHooks/useFetch'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import Img from '../../lazyLoader/Img'

function HeroBanner() {
  const [backgroung, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
    if (url?.backdrop && data?.results) {
      const randomIndex = Math.floor(Math.random() * data.results.length)
      const bg = `${url.backdrop}${data.results[randomIndex].backdrop_path}`
      setBackground(bg)
    }
  }, [data, url])

  const searchQuery = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  const handleSearch = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={backgroung} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subtitle">
            Reel in your next adventure. Explore movies and shows with ease.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or a tv show..."
              onKeyUp={searchQuery}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner