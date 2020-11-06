import React from 'react';
import './style.css';
import ExplorePost from './explore_post/explorePost';

const ExploreList = ({posts}) => {
            return (posts && 
                  <div className="post-list">
                        <h1 className="section-title">Recommendations</h1>
                        <div className="section-second">This week</div>
                        <div className="container">
                              {
                                    posts.map((post, i) => {
                                          return <ExplorePost 
                                          id={posts[i].id} 
                                          key={i}
                                          title={posts[i].title}
                                          location={posts[i].location}
                                          img={posts[i].img}
                                          cost={posts[i].cost}
                                          desc={posts[i].desc}/>
                                    })
                              }
                        </div>
                  </div>
                  )
}


export default ExploreList;
