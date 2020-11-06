import React, { Component } from 'react';
import firebase from 'firebase';
import { Link, withRouter } from "react-router-dom";
import './style.css';


const firebaseConfig = {
      apiKey: "AIzaSyC-UplhIW3buTVO9mOWL7xtV167Hz7EeRs",
      authDomain: "tripal-ddc7e.firebaseapp.com",
      databaseURL: "https://tripal-ddc7e.firebaseio.com",
      projectId: "tripal-ddc7e",
      storageBucket: "tripal-ddc7e.appspot.com",
      messagingSenderId: "271950258473",
      appId: "1:271950258473:web:48b4c622db8c4100"
    };
firebase.initializeApp(firebaseConfig);
class Modal extends Component {


      constructor() {
            super()
            this.state = {
                  email: '',
                  password: '',
                  error: null,
                  message: '',
                  isNotHidden: true
            };
      }

      handleChange = (event) => {
           this.setState({ [event.target.name] : event.target.value }); 
           console.log(this.state);
      }

      
      handleSubmit = (event) => {
            event.preventDefault();
            // const {email, password} = this.state;
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  // var token = result.credential.accessToken;
                  // The signed-in user info.
                  var user = result.user;
                  
                  var db = firebase.firestore();
                  db.collection('users').doc(user.uid).set({
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        // birthday: user.birthday
                  }).then(() => console.log("DATA SUCCESS")).catch((err) => console.log(err));
                  db.collection('users').doc(user.uid).collection('Posts').add({content: 'hello'}).then(() => console.log("POST SUCCESS")).catch((err) => console.log(err));
                  console.log("REGISTERED :", user);
                  this.setState({isNotHidden: false});
  
                  // <Redirect to='/'
                  // ...
                }).catch(function(error) {
                  // // Handle Errors here.
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // // The email of the user's account used.
                  // var email = error.email;
                  // // The firebase.auth.AuthCredential type that was used.
                  // var credential = error.credential;
                  // // ...
                });
                firebase.auth().getRedirectResult().then(function(result) {
                  if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                  //   var token = result.credential.accessToken;
                    // ...
                  }
                  // The signed-in user info.
                  // var user = result.user;
                }).catch(function(error) {
                  // // Handle Errors here.
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // // The email of the user's account used.
                  // var email = error.email;
                  // // The firebase.auth.AuthCredential type that was used.
                  // var credential = error.credential;
                  // // ...
                });
            // firebase.auth().createUserWithEmailAndPassword(email, password).then(
            //       (user) => { console.log(user); this.setState({message : 'Check your email'}); }
            // ).catch((error) => this.setState({error: error}));
            // firebase.auth().currentUser.sendEmailVerification().then(() =>  {this.setState({message : 'Check your email'});} );
      }
      componentDidMount() {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                console.log(user);
                const { history } = this.props;
                history.push('/feed');
                this.setState({ user });
              } 
              else {
                    console.log("USER NOT DEFINED");
                    const { history } = this.props;
                    history.push('/');
              }
            });
      }


      // closeModal = () => {
      // }
      render() {
            return (
                  this.state.isNotHidden === true &&
                  <div className="modal">

                        <div className="modal-top">
                              <div className="modal-title">Sign in</div>
                        </div>
                        <form onSubmit={this.handleSubmit} className="form-modal">
                              {/* <input  type="text" placeholder="Full Name" className="input-control"/>
                              <input name="email" type="text" placeholder="Email" onKeyUp={this.handleChange} className="input-control"/>
                              <input name="password" type="password" onKeyUp={this.handleChange} placeholder="password" className="input-control"/>
                              <div className="form-label"></div>
                              <div id="birth_inp" className="form-group">
                                    <input type="number" min="1" max="31" placeholder="Day" className="input-control input-inline"/>
                                    <input type="text"  placeholder="month" className="input-control input-inline"/>
                                    <input type="number"  placeholder="year" className="input-control input-inline"/>
                              </div>
                              <p>{this.state.message}</p> */}
                              <button type="submit" className="form-submit">Sign in with Google</button>
                        </form>
                  </div>
                  
            )
      }
}


export default withRouter(Modal);
