import { Component, Fragment } from 'react';
import {
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    Container, 
    NavLink,
} from 'reactstrap';

import RegisterModal from './auth/registerModal';
import Logout from './auth/Logout';
import LoginModal from './auth/loginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment >
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    
                    <NavLink><Link style={{ textDecoration: 'none' }} to={'./home'}>
                    <div className="button" variant="raised">
                        Home
                    </div>
                    </Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link style={{ textDecoration: 'none' }} to={'./menu'}>
                    <div className="button" variant="raised">
                        Menu
                    </div>
                    </Link></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink><Link style={{ textDecoration: 'none' }} to={'./cart'}>
                    <div className="button" variant="raised">
                        Cart
                    </div>
                    </Link></NavLink>
                </NavItem>
                <NavItem className="mr-2">
                    <NavLink ><Link style={{ textDecoration: 'none' }} to={'./orders'}>
                    <div className="button" variant="raised">
                        Orders
                    </div>
                    </Link></NavLink>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

        return(
            <div>
                <Navbar  expand="sm" className="mb-5 nav">
                    <Container>
                        <NavbarBrand href="/">Dan's Deli</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar> 
                                { isAuthenticated ? authLinks: guestLinks}                               
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);