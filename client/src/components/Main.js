import { Component } from 'react';
import AddItem from './AddItem';
import Products from './Products';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Cart';
import Home from './Home'
import Orders from './Oder';
import AppNavbar from './AppNavbar'
import '../css/App.css';



class Main extends Component {
    render(){
        return (
            <div>
                <AppNavbar/>
                <Switch>
                    <Route path='/home'>
                        <Home/>
                    </Route>
                    <Route path='/menu'>
                        <Products/>
                    </Route>
                    <Route path='/addItem'>
                        <AddItem/>
                    </Route>
                    <Route path='/cart'>
                        <Cart/>
                    </Route>
                    <Route path='/orders'>
                        <Orders/>
                    </Route>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect()(Main));