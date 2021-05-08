import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"

class Home extends Component {
  render() {
    return (
    <motion.div exit={{ opacity: 0 }}>
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
    </motion.div>
    );
  }
}
export default Home;