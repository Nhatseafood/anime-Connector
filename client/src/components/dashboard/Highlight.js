import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteHighlight } from "../../actions/profileActions";

//replaces education

class Highlight extends Component {
  onDeleteClick(id) {
    this.props.deleteHighlight(id);
  }

  render() {
    const highlight = this.props.highlight.map(high => (
      <tr key={high._id}>
        <td>{high.school}</td>
        <td>{high.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{high.from}</Moment> -
          {high.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{high.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, high._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Highlight Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {highlight}
          </thead>
        </table>
      </div>
    );
  }
}

Highlight.propTypes = {
  deleteHighlight: PropTypes.func.isRequired
};

export default connect(null, { deleteHighlight })(Highlight);
