import React, {Component} from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import NearMeList from './nearme_posts';
import {explorePosts} from '../data_exposts';
import './style.css';

export default class NearMe extends Component {
      constructor() {
            super()
            this.state = {
                  posts: ''
            }
      }
      loadData = () => {
            var db = firebase.firestore();
            db.collection("explore_posts").onSnapshot(querySnapshot => {
                  var data = [];
                  querySnapshot.forEach(doc => {
                        data.push(
                              {id:doc.id, 
                              title:doc.data().title,
                              location:doc.data().location,
                              img:doc.data().img,
                              cost:doc.data().cost,
                              desc:doc.data().desc
                        });
                        this.setState({ posts: data });
                  });
            });
      }
      componentDidMount() {
            this.loadData();
      }
      render() {
            return (
                  this.state.posts && 
                  <div className="nearme-container">

                        <div className="fav_places_container">
                              <div className="section-header">
                                    Places you might be looking for
                              </div>
                              <hr class="header-sep"></hr>
                              <div className="section-places">
                              <Link to="/near_me/restaurants">
                                    <div className="place-icon" style={{background: '#2ecc71'}}>
                                                <i className="material-icons place-img">
                                                      restaurant_menu
                                                </i>
                                                <span className="place-text">Restaurants</span>
                                    </div>
                              </Link>
                              <Link to="/near_me/hotels">
                              <div className="place-icon" style={{background: '#3498db'}}>
                                          <i className="material-icons place-img">
                                                hotel
                                          </i>
                                          <span className="place-text">Hotels</span>
                              </div>
                              </Link>
                              <Link to="/near_me/events">
                              <div className="place-icon" style={{background: '#9b59b6'}}>
                                          <i className="material-icons place-img">
                                                event
                                          </i>
                                          <span className="place-text">Events</span>
                              </div>
                              </Link>
                              <Link to="/near_me/shops">
                              <div className="place-icon" style={{background: '#34495e'}}>
                                          <i className="material-icons place-img">
                                                shopping_cart
                                          </i>
                                          <span className="place-text">Shops</span>
                              </div>
                              </Link>
                              </div>
                        </div>
                        <div className="fav_places_container">
                              <div className="section-header">
                                    Places you might be looking for
                              </div>
                              <hr className="header-sep"></hr>
                              <NearMeList posts={this.state.posts}/>
                        </div>
                  </div>
            )
      }
}

