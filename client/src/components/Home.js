import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="header">
      
      <img src="dansdeli.png" alt="Delilogo"/>
      <h1 className='mainheading'>Boyertown, PA</h1>
      {/* Link to List.js */}
      <Link style={{ textDecoration: 'none' }} to={'./menu'}>
        <div className="button" variant="raised">
            Menu
        </div>
      </Link>
    </div>
    );
  }
}
export default Home;