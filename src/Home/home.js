import React, {Component} from 'react';
import Header from './header/header';
import ExploreList from './explore_list/exploreList';
// import {explorePosts} from '../data_exposts';
import axios from 'axios';
import firebase from 'firebase';

// const firebaseConfig = {
//       apiKey: "AIzaSyC-UplhIW3buTVO9mOWL7xtV167Hz7EeRs",
//       authDomain: "tripal-ddc7e.firebaseapp.com",
//       databaseURL: "https://tripal-ddc7e.firebaseio.com",
//       projectId: "tripal-ddc7e",
//       storageBucket: "tripal-ddc7e.appspot.com",
//       messagingSenderId: "271950258473",
//       appId: "1:271950258473:web:48b4c622db8c4100"
//     };
// firebase.initializeApp(firebaseConfig);

class Home extends Component {
      constructor() {
            super()
            this.state = {
                  posts: '',
                  user: null,
                  // newPost: {
                        title: '',
                        desc: 'gfhjkhjk',
                        location: '',
                        img: '',
                        cost: ''
                  // }
            }
      }
      handleChange = (event) => {
            this.setState({
                  [event.target.name]: event.target.value
            });
            console.log(this.state);

      }
      postSubmit = (event) => {
            event.preventDefault();
            console.log(this.state);
            const {title, cost, location, img, desc} = this.state
            firebase.firestore().collection('explore_posts').add({
                  title,
                  cost,
                  img,
                  location,
                  desc
            })
            .then(() => console.log("POST CREATED!"))
            .catch((err) => console.log("ERROR CREATING", err));
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
                        var dataToShow = [];
                        for(var key in data) {
                              if (data[key] !== null && data[key] !== "")
                                    dataToShow.push(data[key]);
                        }
                        this.setState({ posts: dataToShow });
                  });
            });

            // const res = await axios.get(`https://us-central1-tripal-ddc7e.cloudfunctions.net/getPosts`);
            // this.setState({ posts: data });
      }
      componentDidMount(){
            this.loadData();
            firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                    console.log(user);

    
                    this.setState({ user });
                    firebase.auth().currentUser.getIdToken(true)
                    .then(token => {
                          console.log("USER TOKEN : ", token);
                          const res = axios.post('https://us-central1-tripal-ddc7e.cloudfunctions.net/verify_token',{token: token});
                    })
                    .catch(
                          error => console.log(error)
                    )
                  } 
                  else {
                        console.log("USER NOT DEFINED")
                  }
                });
          }
      render() {
            if(this.state.posts) {
                  return (
                        <div>
                              <Header />
                              <ExploreList posts={this.state.posts}/>
                              <form action="" onSubmit={this.postSubmit}>
                                    <label>Post Title : </label>
                                    <input onKeyUp={this.handleChange} type="text" name="title"/>
                                    <label>Post Description : </label>
                                    <input onKeyUp={this.handleChange} type="text" name="desc"/>
                                    <label>Post location : </label>
                                    <input onKeyUp={this.handleChange} type="text" name="location"/>
                                    <label>Post image url : </label>
                                    <input onKeyUp={this.handleChange} type="text" name="img"/>
                                    <label>Post cost : </label>
                                    <input onKeyUp={this.handleChange} type="text" name="cost"/>
                                    <button type="submit">Submit</button>
                              </form>
                        </div>
                        )  
            }
            else {
                  return (
                        <div>
                              <Header />
                              <h1 style={{textAlign: 'center', padding: '100px'}}>Loading ...</h1>          
                        </div>
                        ) 
            }
            }
      }

export default Home;
