import React, { Component } from 'react';
import './style.css';
import FeedPost from './feedPost';


const FeedPosts = ({data}) => {
      // console.log("FEED POST : ", data);
            return (
                  <div className="feed-posts">
                        {
                              data.map((post, i) => {
                                    return <FeedPost 
                                    id={data[i].id} 
                                    key={i}
                                    content={data[i].content}
                                    location={data[i].location}
                                    img={data[i].img}
                                    authorID={data[i].authorID}
                                    authorName={data[i].authorName}
                                    authorPhoto={data[i].authorPhoto}
                                    desc={data[i].desc}
                                    tags={data[i].tags}
                                    />
                                    })
                              }
                  </div>
            )
      }

      export default FeedPosts; 