import React, { Component } from 'react';
import axios from 'axios';

import '../styles/base.scss';
import '../styles/_animation.scss';

class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      status: 'INIT',
      active: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(emailRegex.test(value.toLowerCase())) {
      this.setState(
        prevState => ({
          ...prevState,
          active: true
        })
      );
    } else {
      this.setState(
        prevState => ({
          ...prevState,
          active: false
        })
      );
    }

    this.setState(
      prevState => ({
        ...prevState,
        email: value
      })
    );
  }

  submit() {
    if(this.state.active) {
      this.setState(
        prevState => ({
          ...prevState,
          status: 'LOADING'
        })
      );

      let email = { "email": this.state.email, "subscribed": true };
      axios.post(`http://localhost:4000/api/scribbles/subscribe`,
        email)
      .then(res => {
        if(res.status === 200) {
          if(res.data === "Subscribed") {
            this.setState(
              prevState => ({
                ...prevState,
                status: 'SUBSCRIBED'
              })
            );
          } else if(res.data === "Email already exists") {
              this.setState(
                prevState => ({
                  ...prevState,
                  status: 'EXISTS'
                })
              );
          }
        } else {
          this.setState(
            prevState => ({
              ...prevState,
              status: 'FAILURE'
            })
          );
        }
      })
    } else {
      console.log('Please provide a valid email');
    }
  }

  render() {
    if(this.state.status === "INIT") {
      return (
        <div className="newsletter">
          <p className="related-posts-title">Get Updates</p>
          <p className="newsletter-description">I generally write about frontend
          development, traveling and other interesting things. I will send an
          email once a month. Sign up below if you are interested.</p>
          <input className="newsletter-email-box"
                 id="newsletter"
                 type="text"
                 name="email"
                 autoComplete="off"
                 placeholder="Email"
                 value={this.state.email}
                 onChange={this.handleChange} />
          <button
                className={this.state.active === true ?
                  "newsletter-submit-button-active" :
                  "newsletter-submit-button-inactive"}
                onClick={() => this.submit()}
                >
          Subscribe
          </button>
        </div>
      );
    } else if(this.state.status === "LOADING") {
      return (
        <div><p>LOADING</p></div>
      );
    } else if(this.state.status === "SUBSCRIBED") {
      return (
        <div><p>SUBSCRIBED</p></div>
      );
    } else if(this.state.status === "EXISTS") {
      return (
        <div><p>ALREADY EXISTS</p></div>
      );
    } else {
      return (
        <div><p>OOPS</p></div>
      );
    }
  }
}

export default Newsletter;
