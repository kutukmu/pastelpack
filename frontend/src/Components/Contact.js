import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMailAction } from "../Actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      message: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contact !== this.props.contact) {
      if (this.props.contact.status === "success") {
        toast("✅ I got your mail ", {
          type: "success",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (this.props.contact.status === "fail") {
        toast("Something went wrong", {
          type: "error",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, message } = this.state;
    this.props.sendMailAction(name, email, message);
  };

  render() {
    return (
      <div className="split-screen">
        <div className="left">
          <section className="copy">
            <h1>Have a question?</h1>
            <h3>
              Or idea for a future product? Fill out the form and I'll respond
              to you as soon as I can!
            </h3>
          </section>
        </div>
        <div className="right">
          <form onSubmit={this.handleSubmit}>
            <section className="copy">
              <h2>Contact</h2>
            </section>

            <div className="input-container name">
              <label htmlFor="name">Full Name</label>
              <input
                className="input"
                id="name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                name="name"
                type="text"
              />
            </div>
            <div className="input-container email">
              <label htmlFor="email">Email</label>
              <input
                className="input"
                onChange={(e) => this.setState({ email: e.target.value })}
                value={this.state.email}
                id="email"
                name="email"
                type="email"
              />
            </div>
            <div className="input-container email">
              <label htmlFor="message">Message</label>
              <textarea
                className="input"
                name="message"
                onChange={(e) => this.setState({ message: e.target.value })}
              />
            </div>

            <button className="signup-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contact: state.contact,
});

const mapDispatchToProps = { sendMailAction };

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
