import React, { useEffect, useState } from 'react'
import { fetchData } from '../../services/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import noResults from "../../assets/no-results.png";
import ContentWrapper from '../contentWrapper/ContentWrapper'
import "./style.scss"
import { useParams } from 'react-router-dom';
import Spinner  from '../spinner/Spinner';
import MovieCard from '../movieCard/MovieCard';
function SearchResult() {

  const  [data, setData] = useState(null);
  const  [pageNum, setPageNum] = useState(1);
  const  [loading, setLoading] = useState(false);
  const {query} = useParams()

  const fetchInitialData = () => {
    setLoading(true)
    fetchData(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if(data?.results) {
        setData({
          ...data, results: [...data?.results, ...res.results]
        })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1)
    })
  }


  useEffect(() => {
    setPageNum(1)
    fetchInitialData();
  }, [query])


  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${data?.total_results > 1 ? "results" : "result"} for '${query}'`}</div>
              
              <InfiniteScroll 
              className='content' 
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}>
                {data?.results?.map((item, index) => {
                  if (item.mediaType === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">No Results Found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult
