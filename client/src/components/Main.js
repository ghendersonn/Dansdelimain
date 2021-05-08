import { Component } from 'react';
import AddItem from './AddItem';
import Products from './Products';
import { Switch, Route, Redirect, withRouter, useHistory, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Cart';
import Home from './Home'
import Orders from './Oder';
import AppNavbar from './AppNavbar'
import '../css/App.css';
import ForgotPassword from './auth/Forgotpassword'
import ResetPassword from './auth/Resetpassword';
import {AnimatePresence, motion} from 'framer-motion'




const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      
    }
  };
  
  const pageTransition = {
    ease: "easeOut",
    duration: 1
  };
  
  
  

function Main() {
    const location = useLocation();
        return (
            
                <AnimatePresence exitBeforeEnter>
               
                <Switch location={location} key={location.pathname}>
                    <Route path='/home'>
                    <motion.div
                    
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                        <Home/>
                    </motion.div>
                    </Route>
                    <Route path='/menu'>
                    <motion.div
                    
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                        <Products/>
                    </motion.div>
                    </Route>
                    <Route path='/addItem'>
                        <AddItem/>
                    </Route>
                    <Route path='/cart'>
                    <motion.div
                    
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                        <Cart/>
                    </motion.div>
                    </Route>
                    <Route path='/orders'>
                        <Orders/>
                    </Route>
                    <Route path='/forgot-password'>
                        <ForgotPassword/>
                    </Route>
                    <Route path='/reset/:token'>
                        <ResetPassword />
                    </Route>
                    <Redirect to='/home'/>
                    </Switch>
                    </AnimatePresence>
            
        )
    }


export default withRouter(connect()(Main));