import React, { useState } from 'react'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import SwitchTabs from '../../switchTabs/SwitchTabs'
import useFetch from '../../../customHooks/useFetch'
import Carousel from '../../carousel/Carousel'


const Popular = () => {

    const [endpt, setEndpt] = useState('movie')
    
    //api call
    const {data, loading} = useFetch(`/${endpt}/popular`)
    
    
    const onTabChange = (tab) => {
        setEndpt(tab === "Movies" ? "movie" : "tv")
    }

  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Popular</span>
            <SwitchTabs onTabChange={onTabChange} data={["Movies", "TV Shows"]} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpt={endpt}/>
    </div>
  )
}

export default Popular

