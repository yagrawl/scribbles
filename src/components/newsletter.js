import React, { Component } from 'react';
import axios from 'axios';

import Loader from './loader';

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
      axios.post(`https://yagrawlserver.herokuapp.com/api/scribbles/subscribe`,
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

  manageState() {
    if(this.state.status === "INIT") {
      return (
        <div>
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
        <Loader/>
      );
    } else if(this.state.status === "SUBSCRIBED") {
      return (
        <div className="center">
          <center>
            <svg className="checkmark"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 52 52">
                 <circle class="checkmark__circle"
                         cx="26" cy="26" r="25" fill="none"/>
                 <path class="checkmark__check" fill="none"
                         d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <p className="related-posts-title newsletter-response">
              Subscribed.
            </p>
          </center>
        </div>
      );
    } else if(this.state.status === "EXISTS") {
      return (
        <center>
          <svg className="checkmark"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 52 52">
               <circle className="checkmark__circle"
                       cx="26" cy="26" r="25" fill="none"/>
               <path className="checkmark__check" fill="none"
                       d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
          <p className="related-posts-title newsletter-response">
            You're Already a Subscriber.
          </p>
        </center>
      );
    } else {
      return (
        <center>
          <svg class="cross__svg"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 52 52">
               <circle cx="26" cy="26" r="25" className="circle"/>
	              <path class="cross__path cross__path--right" d="M16,16 l20,20" />
               <path class="cross__path cross__path--right" d="M16,36 l20,-20" />
			    </svg>
          <p className="related-posts-title newsletter-response">
            Oops, something went wrong.
          </p>
        </center>
      );
    }
  }

  render() {
    return (
      <div className="newsletter">
        <p className="related-posts-title">Get Updates</p>
        <p className="newsletter-description">I generally write about frontend
        development, traveling and other interesting things. I will send an
        email once a month. Sign up below if you are interested.</p>
        {this.manageState()}
      </div>
    )
  }
}

export default Newsletter;
