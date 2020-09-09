import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { addReviewAction, closePortal } from "../Actions";
import history from "../history";
class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: "5",
      comment: "",
    };
  }

  handleClick = () => {
    history.push("/products");
  };

  handleSubmit = (e) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const { name, id } = this.props;
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    var year = currentDate.getFullYear();

    var createdAt = date + "/" + monthNames[month] + "/" + year;

    const { rating, comment } = this.state;
    e.preventDefault();
    this.props.addReviewAction(id, name, rating, comment, createdAt);
    this.props.closePortal();
  };

  render() {
    return ReactDOM.createPortal(
      <div className="review-modal" onClick={() => this.props.closePortal()}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="close">
            <h4>Write Review</h4>
            <button
              className="close-btn"
              onClick={() => this.props.closePortal()}
            >
              X
            </button>
          </div>

          <form onSubmit={this.handleSubmit}>
            <select
              required
              onChange={(e) => this.setState({ rating: e.target.value })}
            >
              <option value="5">5 Excellent</option>
              <option value="4">4 Very Good</option>
              <option value="3">3 Good</option>
              <option value="2">2 Fair</option>
              <option value="1">1 Poor</option>
            </select>

            <textarea
              required
              onChange={(e) => this.setState({ comment: e.target.value })}
            ></textarea>

            <button>Submit</button>
          </form>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { addReviewAction, closePortal };

export default connect(mapStateToProps, mapDispatchToProps)(Review);
