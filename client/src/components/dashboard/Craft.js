import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteCraft } from "../../actions/profileActions";

//replaces experience
class Craft extends Component {
  onDeleteClick(id) {
    this.props.deleteCraft(id);
  }

  render() {
    const craft = this.props.craft.map(craf => (
      <tr key={craf._id}>
        <td>{craf.company}</td>
        <td>{craf.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{craf.from}</Moment> -
          {craf.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{craf.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, craf._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Craft Skills Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {craft}
          </thead>
        </table>
      </div>
    );
  }
}

Craft.propTypes = {
  deleteCraft: PropTypes.func.isRequired
};

export default connect(null, { deleteCraft })(Craft);
