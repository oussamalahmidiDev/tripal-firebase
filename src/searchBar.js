import React, {Component} from 'react';

export default class SearchBar extends Component {
      render() {
            return (
                  window.location.pathname != '/'
                  && <form><input></input></form>
            )
      }
}