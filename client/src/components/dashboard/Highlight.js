import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import classnames from "classnames";
import { deleteHighlight } from "../../actions/profileActions";

import cosplayImg from "../../img/Cosplay1.jpeg";
import baguetteBox from "baguettebox.js";

import "../dashboard/highlight.css";

//replaces education

class Highlight extends Component {
  onDeleteClick(id) {
    this.props.deleteHighlight(id);
  }

  render() {
    const highlights = this.props.highlight.map(high => (
      <div key={high.id} className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <a className="lightbox" href="../../img/Cosplay1.jpeg">
            <img src={cosplayImg} alt="cosplay 1" />
          </a>
          <div className="caption">
            <h3>{high.school}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <button
              onClick={this.onDeleteClick.bind(this, high._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="tz-gallery">
        <h2>Highlights </h2>
        <hr />
        <div className="row">{highlights}</div>
      </div>
    );
  }
}

Highlight.propTypes = {
  deleteHighlight: PropTypes.func.isRequired
};

export default connect(null, { deleteHighlight })(Highlight);
