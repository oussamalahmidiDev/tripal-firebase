import React, { Component } from 'react';
import firebase from 'firebase';
import CreatePost from './create_post/createPost';
import MostFollowed from './most_followed/mostFollowed';
import FeedPosts from './feed_posts/feedPosts';
import PopularTags from './popular_tags/popularTags';

import './style.css';


export default class Feed extends Component {

      constructor() {
            super()
            this.state = {
                  posts: ''
            };
            this.loadData();
      }

      loadData = () => {
            var db = firebase.firestore();
            db.collection("users_posts").orderBy('timestamp', 'desc').onSnapshot(querySnapshot => {
                  var data = [];
                  querySnapshot.forEach(doc => {
                        data.push(
                              {id:doc.id, 
                              authorPhoto:doc.data().authorPhoto,
                              location:doc.data().location,
                              img:doc.data().imgUrl,
                              content:doc.data().content,
                              authorID:doc.data().authorID,
                              authorName: doc.data().authorName,
                              tags: doc.data().tags,
                              comments: doc.data().comments
                        });
                        this.setState({ posts: data });
                  });
                  console.log("LOADING DATA", data);
            });
      }

      componentDidMount() {
            // this.loadData();
            console.log('USERS POSTS LOADED',this.state.posts);

                  firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        const { history } = this.props;
                        history.push('/');
                    } 
                  });
      }
      render() {
            if(this.state.posts) {
                  return (
                        <div className="col-4-4">
                              <div className="col-3-4">
                                    <CreatePost/>
                                    <FeedPosts data={this.state.posts}/>
                              </div>
                              <div className="col-1-4">
                                    <MostFollowed/>
                                    <PopularTags/>
                              </div>
                        </div>
                  )
            }
            else {
                  return (
                        <div className="col-4-4">
                              <div className="col-3-4">
                                    <CreatePost/>
                                    <h3>Loading ...</h3>
                              </div>
                              <div className="col-1-4">
                                    <MostFollowed/>
                                    <PopularTags/>
                              </div>
                        </div>
                  )
            }
      }
}

