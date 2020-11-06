import React, { Component } from 'react';
import logo from '../../assets/images/header-logo.svg';
import './style.css';

class Header extends Component {
      render() {
            return (
                  <header className="header">
                        <div className="header-logo">
                              <img src= {logo} alt=""/>
                        </div>
                        <div className="header-secondary">
                              Your trip companion !
                        </div>
                        <form action="" className="search-bar">
                              <input type="text" placeholder="Tap to search" className="search-input"/>
                        </form>
                  </header>)
      }
}


export default Header;
