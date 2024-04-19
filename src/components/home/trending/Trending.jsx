import React, { useState } from 'react'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import SwitchTabs from '../../switchTabs/SwitchTabs'
import useFetch from '../../../customHooks/useFetch'
import Carousel from '../../carousel/Carousel'


const Trending = () => {

    const [endpt, setEndpt] = useState('day')
    
    //api call
    const {data, loading} = useFetch(`/trending/all/${endpt}`)
    
    
    const onTabChange = (tab) => {
        setEndpt(tab === "Day" ? "day" : "week")
    }

  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs onTabChange={onTabChange} data={["Day", "Week"]} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending

