import React, { Component } from 'react';
import firebase from 'firebase';
import './style.css';


export default class CreatePost extends Component {

      constructor(props) {
            super(props);
            this.state = {
              file: '',
              imagePreviewUrl: '',
              content: '',
              location: '',
              tags: ''
            };
            this._handleImageChange = this._handleImageChange.bind(this);
            this._handleSubmit = this._handleSubmit.bind(this);
          }
        
          _handleSubmit(e) {
            e.preventDefault();
            // TODO: do something with -> this.state.file
            const dataToSubmit = {
                  // file: this.state.file,
                  authorID: firebase.auth().currentUser.uid,
                  authorName: firebase.auth().currentUser.displayName,
                  authorPhoto: firebase.auth().currentUser.photoURL,
                  content: this.state.content,
                  location: this.state.location,
                  tags: this.state.tags.split(','),
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            // console.log(dataToSubmit);
            // var postRefID = '';
            firebase.firestore().collection('users_posts').add(dataToSubmit)
            .then((postRef) => {
                  const postRefID = postRef.id;
                  var filePath = firebase.auth().currentUser.uid + '/' + postRef.id + '/' + this.state.file.name;
                  // console.log("POST REF ID",postRefID);
                  return firebase.storage().ref(filePath).put(this.state.file)
                  .then((fileSnapShot) => {
                        return fileSnapShot.ref.getDownloadURL()
                        .then((url) => postRef.update({
                              imgUrl: url,
                              storageUri: fileSnapShot.metadata.fullPath
                        })
                        .then(() => {
                              // console.log("AFTER SAVE DATA", postRefID);
                              var data = '';
                              firebase.firestore().collection('users_posts').doc(postRefID)
                              .get().then(doc => {
                                    if(doc.exists) {
                                          data = doc.data()
                                          // console.log('data to copy', data);
                                          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                                          .collection('Posts').add(data)
                                          .then(() => console.log("DATA ADDED IN BOTH SUCCESS"))
                                          .catch((err) => console.log(err))
                                    }
                                    else console.log('no data')
                              });

                        })
                        .catch((err) => console.log('error copy', err))
                        );
                  }).catch((err) => console.log("UPLOAD ERROR", err));

            })
            .catch((err) => console.log("ERROR CREATING", err));
            try {
                  const { history } = this.props;
                  history.push('/feed');
            } catch(e) {
                  // Some code here
                  console.log(e);
            }
            // firebase.firestore().collection
            // console.log("AFTER SAVE DATA", postRefID);
          }

        
          handleChange = (e) => {
            this.setState({
                  [e.target.name]: e.target.value
            });
            // console.log(this.state);
          }
          _handleImageChange(e) {
            e.preventDefault();
        
            let reader = new FileReader();
            let file = e.target.files[0];
        
            reader.onloadend = () => {
              this.setState({
                file: file,
                imagePreviewUrl: reader.result
              });
            }
            reader.readAsDataURL(file)
          }

      render() {
            let {imagePreviewUrl} = this.state;
            let $imagePreview = null;
            if (imagePreviewUrl) {
                  $imagePreview = (<img className="img-preview" src={imagePreviewUrl} />);
            }
            return (
                  <div className="cont create-post">
                        <div className="cont-header">
                              Create a post!
                        </div>  
                        <form action="" onSubmit={this._handleSubmit} className="post-form">
                              {$imagePreview}
                              <div class="upload-btn-wrapper">
                                    <button class="btn">+</button>
                                    <input type="file" name="myfile" onChange={this._handleImageChange} />
                              </div>
                              <textarea name="content" onChange={this.handleChange} rows="4" placeholder="What do you think?" type="text" className="post-create-cont"/>
                              <div className="col-wrap">
                                    <input  name="tags" onChange={this.handleChange} placeholder="Separate your tags by commas (,)" type="text" className="post-create-cont"/>
                                    <input  name="location" onChange={this.handleChange} placeholder="Location" type="text" className="post-create-cont"/>
                              </div>
                              <button type="submit" className="post-submit">Post</button>
                        </form>
                  </div>
            )
      }
}

