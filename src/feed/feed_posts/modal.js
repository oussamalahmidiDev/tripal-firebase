import React, { Component } from 'react';
import firebase from 'firebase';
export default class Modal extends Component {

      constructor() {
            super()
            this.state = {
                  isHidden: false
            }
      }
      deletePost = () => {
            const id = this.props.postID;
            firebase.firestore().collection('users_posts').doc(id)
            .delete().then(() => console.log("DELETED SUCCESSFULLY"))
            .catch((err) => console.log('ERROR DELETING', err));
            this.setState({isHidden: true});
      }
      render() {
            return (
                  this.state.isHidden === false &&
                  <div className="modal center">

                        <div className="modal-top">
                              <div className="modal-title">Do you want to delete this post ?</div>
                        </div>
                        <button onClick={this.deletePost} type="submit" className="form-submit">Confirm</button>
                  </div>  
            )
      }
}