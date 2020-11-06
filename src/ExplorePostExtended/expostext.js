import React, {Component} from 'react';
import axios from "axios";
import './style.css';
import img from '../assets/images/david-marcu-125458-unsplash.jpg';


// const getData = async () => {

//       // console.log(data);
// }
// getData();
// console.log('data : '+data);

// const img = data.img;

class ExplorePostExtended extends Component {

      constructor() {
            super()
            this.state = {
                  postDetail : 'Loading'
            }
      }

      getData = async () => {
            const {id} =  this.props.match.params;
            const res = await axios.get('https://us-central1-tripal-ddc7e.cloudfunctions.net/getPostById?id=' + id);
            console.log(res.data);
            console.log('PARANS : ' + id);
            this.setState({postDetail : res.data})
      }
      componentDidMount() {
            this.getData();
      }
      render() {
            return (
            <div className="post-extended">
                  <div>
                        <img src={this.state.postDetail.img} className="post-ext-img post-image" alt="" />
                  </div>
                  <div className="post-content post-ext">
                        <div className="post-title post-ext">{this.state.postDetail.title}</div>
                        <div className="meta-data post-ext">
                              <div className="post-data post-ext">
                                    <i className="material-icons item-icon">
                                          location_on
                                          </i>
                                    <span>{this.state.postDetail.location}</span>
                              </div>
                              <div className="post-data post-ext">
                                    <i className="material-icons item-icon">
                                          attach_money
                                          </i>
                                    <span>{this.state.postDetail.cost}</span>
                              </div>
                        </div>
                        <div className="post-desc post-ext">{this.state.postDetail.desc}</div>
                  </div>
            </div>
            )
      }

}


export default ExplorePostExtended;
