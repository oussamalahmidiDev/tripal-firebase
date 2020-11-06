import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

const ExplorePost = ({id,title,desc,img,location,cost}) => {
            return (
                  <div className="post-item">
                        <div>
                              <img className="post-image" src={img} alt=""/>
                        </div>
                        <div className="post-content">
                              <div className="post-title">{title}</div>
                              <div className="meta-data">
                                    <div className="post-data">
                                          <i className="material-icons item-icon">
                                                location_on
                                          </i>
                                          <span>{location}</span>
                                    </div>
                                    <div className="post-data">
                                          <i className="material-icons item-icon">
                                                attach_money
                                          </i>
                                          <span>{cost}</span>
                                    </div>
                              </div>
                              <div className="post-desc">{desc}
                              </div>
                              <div className="btn-container">
                                    <Link to={'post/'+ id}>
                                          <button className="post-more">Read more</button>
                                    </Link>
                              </div>
                        </div>
                  </div>
            )
      }



export default ExplorePost;
