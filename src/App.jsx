import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchData } from './services/api';
import { useDispatch } from 'react-redux'
import { getApiConfig, getGenres } from './store/homeSlice'; //https://redux-toolkit.js.org/tutorials/quick-start
import Header from './components/header/Header'
import Footer from  './components/footer/Footer'
import Home from './components/home/Home';
import Details from  './components/details/Details';
import SearchResult from  './components/searchResult/SearchResult';
import Explore from  './components/explore/Explore'
import PageNotFound from  './components/404/PageNotFound'


function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  }, [])

  const fetchApiConfig = () => {
    fetchData ("/configuration").then((res) => {
      // console.log(res)

      //extracting necessary data to display images
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",
      }

      dispatch(getApiConfig(url))
    })
  }
  
  //genres data
  const genresCall = async () => {
    let promises = []
    let endpts = ["tv", "movie",]
    let allGenres = {}

    endpts.forEach((url) => {
      promises.push(fetchData (`/genre/${url}/list`));
    })

    const data = await Promise.all(promises).catch((err)=>console.error(err))
    // console.log(data)
    data.map(({genres}) => {
      return genres.map((item) => (
        allGenres[item.id] = item
      ))
    })
    // console.log(allGenres)
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
