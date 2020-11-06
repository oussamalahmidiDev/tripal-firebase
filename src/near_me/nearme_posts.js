import React from 'react';
import './style.css';
import '../Home/explore_list/style.css';
import ExplorePost from '../Home/explore_list/explore_post/explorePost';

const NearMeList = ({posts}) => {
            return (
                  <div className="post-list" style={{padding: 0}}>
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


export default NearMeList;
