import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CardTitle, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Password Reset Screen',
};

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.get('/resetpassword', {
        params: {
          resetPasswordToken: token,
        },
      });
      // console.log(response);
      if (response.data.message === 'password reset link a-ok') {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put(
        '/updatePasswordViaEmail',
        {
          username,
          password,
          resetPasswordToken: token,
        },
      );
      console.log(response.data);
      if (response.data.message === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  render() {
    const {
 password, error, isLoading, updated 
} = this.state;

    if (error) {
      return (
        <div>
          <CardTitle title={title} />
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <Link
              buttonText="Go Home"
              
              to={"/"}
            />
            <Link
              
              buttonText="Forgot Password?"
              to={"/forgotPassword"}
            />
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <CardTitle title={title} />
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div>
        <CardTitle title={title} />
        <form className="password-form" onSubmit={this.updatePassword}>
          <Input
           
            id="password"
            label="password"
            onChange={this.handleChange('password')}
            value={password}
            type="password"
          />
          <Button
            
            buttonText="Update Password"
          />
        </form>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <Link
              
              buttonText="Login"
              to={"/login"}
            />
          </div>
        )}
        <Link buttonText="Go Home"  link="/" />
      </div>
    );
  }
}

