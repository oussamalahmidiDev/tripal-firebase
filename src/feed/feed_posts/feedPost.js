import React, { Component } from 'react';
import firebase from 'firebase';
import Modal from './modal';
import SAMPLE from '../../assets/images/david-marcu-125458-unsplash.jpg'
import './style.css';


export default class FeedPost extends Component {
      // console.log("TAGS :", tags);
      constructor() {
            super()
            this.state = {
                  modalHidden: true,
                  isLiked: false,
                  liked: 'favorite_border',
                  likedStyle: 'main-reactions material-icons',
                  likedBy: '',
                  newComment: '',
                  comments: '',
                  mainInput: 'jjkk'
            }
      }
      signupModalOpen = () => {
            this.setState({modalHidden: false});
      }
      signupModalClose = () => {
            this.setState({modalHidden: true});
            console.log("CLOSING MODAL");
      }
      updateLikersNames = () => {
            const {id,content,authorID,authorName,authorPhoto,img,location,tags} = this.props;
            firebase.firestore().collection('users_posts').doc(id).collection('Likers')
            .onSnapshot(query => {
                  var likersNames = [];
                  query.forEach(doc => {
                        // console.log(doc.data().likerName, 'liked your post');
                        likersNames.push(doc.data().likerName);
                  });
                  console.log("LIKERS UPDATED", likersNames);
                  // console.log(likersNames);
                  if(likersNames.length <= 2 && likersNames.length)
                        this.setState({likedBy: likersNames.join(', ') + ' liked your post'});
                  if(likersNames.length > 2) {
                        var likersNamesSliced = likersNames.slice(0, 2);
                        this.setState({likedBy: likersNamesSliced.join(', ') + ` and ${likersNames.length - 2} other liked your post`});
                  }

            });
      }

      loadComments = () => {
            const {id} = this.props;
            firebase.firestore().collection('users_posts').doc(id).collection('comments')
            .orderBy('timestamp', 'asc')
            .onSnapshot(query => {
                  var data = [];
                  query.forEach(doc => {
                        data.push({
                              authorName: doc.data().authorName,
                              authorPhoto: doc.data().authorPhoto,
                              content: doc.data().content
                        })
                  });
                  this.setState({comments: data});
                  console.log('COMMENTS LIST', data);
            })
      }

      commentChange = (e) => {
            this.setState({
                  [e.target.name] : e.target.value
            })
      }
      resetForm = (e) => {

      }
      commentSubmit = (e) => {
            const {id} = this.props;
            e.preventDefault();
            const commentToSubmit = {
                  authorID: firebase.auth().currentUser.uid,
                  authorName: firebase.auth().currentUser.displayName,
                  authorPhoto: firebase.auth().currentUser.photoURL,
                  content: this.state.newComment,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            firebase.firestore().collection('users_posts').doc(id).collection('comments')
            .add(commentToSubmit).then(() => {console.log('Commented successfully'); this.mainInput.value= ''})
            .catch(err => console.log('comment err', err));
      }
      componentDidMount() {
            const {id,content,authorID,authorName,authorPhoto,img,location,tags} = this.props;
            var likedPosts = [];
            firebase.firestore().collection('users_posts').doc(id).collection('Likers')
            .where('likerID', '==', firebase.auth().currentUser.uid)
            .get().then(query => {if(!query.empty) this.setState({isLiked: true})})
            .then(() => {
                  console.log('IS LIKED ? ',this.state.isLiked);
                  if(this.state.isLiked) {
                        this.setState({
                              liked: 'favorite',
                              likedStyle: 'main-reactions material-icons liked' 
                        })
                  }
            })
            .catch((err) => console.log('error curr liks', err));
            this.updateLikersNames();
            this.loadComments();
            // console.log('You liked' ,likedPosts);
            // console.log('You liked length' ,likedPosts.length);
            // if(likedPosts) {
            //       this.setState({isLiked: true});
            // }
            // console.log('IS LIKED ? ',this.state.isLiked);
            
            
            // console.log(this.state.likedBy);
            
      }
      likeToggle = () => {
            const {id,content,authorID,authorName,authorPhoto,img,location,tags} = this.props;
            if(!this.state.isLiked) {
            // this.state.liked == 'favorite_border' ?
            // this.setState({liked: 'favorite', likedStyle: 'main-reactions material-icons liked'})
            // :
            // this.setState({liked: 'favorite_border', likedStyle: 'main-reactions material-icons liked'});
            
                  firebase.firestore().collection('users_posts').doc(id).collection('Likers').add({
                        likerID: firebase.auth().currentUser.uid,
                        likerPhoto: firebase.auth().currentUser.photoURL,
                        likerName: firebase.auth().currentUser.displayName
                  }).then(() => console.log("LIKED SUCCESS")).catch((err) => console.log(err));
                  this.setState({isLiked:true, liked: 'favorite', likedStyle: 'main-reactions material-icons liked'})
            }
            else {
                  firebase.firestore().collection('users_posts').doc(id).collection('Likers')
                  .where('likerID', '==', firebase.auth().currentUser.uid)
                  .get().then(query => query.forEach(doc => doc.ref.delete()));
                  this.setState({isLiked:false, liked: 'favorite_border', likedStyle: 'main-reactions material-icons liked', likedBy: ''})
                  // this.updateLikersNames();

            }

            //Check if LIKED BY CURRENT USER



            // .onSnapshot(query => query.forEach(doc => console.log('CURENT LIKES',doc.data())))
            // .catch((err) => console.log('error curr liks', err))

            //Database


      }
      render() {
            const {id,content,authorID,authorName,authorPhoto,img,location,tags} = this.props;
            return (
                  <div className="cont feed-post">
                        <div className="post-section">
                              <div className="author-info">
                                    <img src={authorPhoto} alt="" className="author-img"/>
                                    <div className="author-text">
                                          <div className="author-name">{authorName}</div>
                                          { location &&
                                          <div className="author-location">{location}</div>
                                          }
                                    </div>
                                    <i onClick={this.signupModalOpen} className="material-icons post-menu">
                                          more_horiz
                                    </i>
                              </div>
                              { img &&
                              <ul className="post-photos">
                                    <li className="post-img-carrosel">
                                          <img src={img} alt="" className="post-img-carrosel"/>
                                    </li>
                              </ul>
                              }
                              <div className="author_post-content">
                                    {content}
                              </div>
                              { tags[0].length !== 0 &&
                              <div className="post-tags">
                                          {
                                                tags.map((tag, i) => {
                                                      return <div key={i} className="tag-content">{tags[i]}</div>
                                                })
                                          }
                                    
                              </div>
                              }
                              <div className="post-reactions">
                                    <i onClick={this.likeToggle} className={this.state.likedStyle}>{this.state.liked}</i>
                                    <span className="likes-label">
                                    {this.state.likedBy}
                              
                                    </span>
                                    <i className="post-save material-icons">bookmark_border</i>
                              </div>
                        </div>
                        <div className="comments-section">
                              <div className="post-comments_section">
                                    <div className="post-comments-list">
                                          {
                                                this.state.comments && this.state.comments.map((comm, i) => {
                                                      return (
                                                            <div className="comment-li">
                                                                  <img src={this.state.comments[i].authorPhoto} alt="" srcset="" className="comment-author"/>
                                                                  <div className="comment-auth-name">{this.state.comments[i].authorName}</div>
                                                                  <div className="comment-auth-cont">{this.state.comments[i].content}</div>
                                                            </div> 
                                                      )
                                                })
                                          }
                                    </div>
                                    <form action="" className="post-comments-form inline">
                                          <input ref={(ref) => this.mainInput= ref} type="text" placeholder="New comment" onChange={this.commentChange} name="newComment" className="comment-inp"/>
                                          <button type="submit" onClick={this.commentSubmit} className="comment-sub">Send</button>
                                    </form>
                              </div>
                        </div>
                        { 
                        this.state.modalHidden ? null:
                        <Modal  postID={id}/>
                  }
                  {
                        this.state.modalHidden ? null:
                        <div onClick={this.signupModalClose}  className="overlay"></div>
                  }
                  </div>
            )
      }
}


