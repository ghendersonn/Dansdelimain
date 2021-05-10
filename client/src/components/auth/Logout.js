import { Component, Fragment } from 'react';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import {NavLink} from 'reactstrap';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <Fragment>
                    <Button className="btn btn-sm"><NavLink onClick={this.props.logout} href="#"><span className="text-dark"><b>Logout</b></span></NavLink></Button>
                </Fragment>
            </div>
        )
    }
}

export default connect(null,{logout})(Logout);
