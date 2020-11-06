import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import {browserHistory} from 'react-router';
import logo from '../assets/images/logo.svg';
import './style.css';
import Modal from './signup_mod';
import firebase from 'firebase';
import Overlay from './overlay';
import SearchBar from '../searchBar';

class NavBar extends Component {

      constructor() {
            super()
            this.state = {
                  modalHidden: true,
                  user: null,
                  // currentPage: this.props.match.url
            }
      }

      logOut = () => {
            firebase.auth().signOut()
            .then(() => {
                  this.setState({
                  user: null
                  });
            });
            const { history } = this.props;
            try {
                  history.push("/");
            } catch (e) {
                  console.log(e.message);
            }
      }

      signupModalOpen = () => {
            this.setState({modalHidden: false});
      }
      signupModalClose = () => {
            this.setState({modalHidden: true});
            console.log("CLOSING MODAL");
      }
      componentDidMount() {
            console.log("LINK = ", window.location.pathname);
            console.log("SEARCH = ", this.props.showSearch);
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.setState({ user: user });
                if(this.state.user) {
                      console.log("USER IS DEFINED IN NAVBAR");

                }
                else console.log("USER NOT DEF IN NAV");
              } 
              else {
                    console.log("USER NOT DEFINED")
              }
            });
      }

      render() {
            return (
                  <div>
                  <div className="main_navbar">
                        <NavLink  activeStyle={{color:'#CC4E4E'}} to="/">
                        <div className="logo" onClick={this.signupModalClose} >
                              <img src={logo} height="50" alt="" />
                        </div>
                        </NavLink>
                        <ul className="nav-items">
                              <NavLink onClick={console.log("LOCATION CHANGED", window.location.pathname)} style={{ color: 'inherit' }} activeStyle={{color:'#CC4E4E'}} to="/near_me">
                                    <li className="nav-item">
                                          <i className="material-icons item-icon">
                                                explore
                                          </i>
                                          <span>Near me</span>
                                    </li>
                              </NavLink>
                              <NavLink onClick={console.log("LOCATION CHANGED", window.location.pathname)} style={{ color: 'inherit' }} activeStyle={{color:'#CC4E4E'}} to="/feed">

                              <li  onClick={console.log("LOCATION CHANGED", window.location.pathname)} className="nav-item">
                                    <i className="material-icons item-icon">
                                          dashboard
                        </i>
                                    <span>Feed</span>
                              </li>
                              </NavLink>
                              <NavLink onClick={console.log("LOCATION CHANGED", window.location.pathname)} style={{ color: 'inherit' }} activeStyle={{color:'#CC4E4E'}} to="/help">
                              <li className="nav-item">
                                    <i className="material-icons item-icon">
                                          help
                        </i>
                                    <span>Help</span>
                              </li>
                              </NavLink>
                        </ul>
                        <form className="inline-form-search">
                              <input className="search-inline" name="query" placeholder="tap to search" />
                        </form>
                        
                        { this.state.user ?
                              <ul className="nav-items right-end">
                                    <div className="avatar-settings">
                                          <img src={this.state.user.photoURL} alt="" srcset="" className="avatar-img"/>
                                          <div className="avatar-name">{this.state.user.displayName}</div>
                                    </div>
                                    <button onClick={this.logOut} className="nav-item btn-sign_up">Log out</button>

                              </ul>
                              :
                              <ul className="nav-items right-end">
                                    {/* <div className="nav-item">Login</div> */}
                                    <button onClick={this.signupModalOpen} className="nav-item btn-sign_up">Sign in</button>
                              </ul>      
                        }
                        
                  </div>
                  { 
                        this.state.modalHidden ? null:
                        <Modal/>
                  }
                  {
                        this.state.modalHidden ? null:
                        <div  onClick={this.signupModalClose} className="overlay"></div>
                  }
                  </div>)
      }
}


export default NavBar;
