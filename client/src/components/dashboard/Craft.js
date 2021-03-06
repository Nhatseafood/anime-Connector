import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteCraft } from "../../actions/profileActions";
import baguetteBox from "baguettebox.js";

//replaces experience
class Craft extends Component {
  onDeleteClick(id) {
    this.props.deleteCraft(id);
  }

  render() {
    console.log(this.props.craft, "<<<<<< THIS IS CRAFT");
    const craft = this.props.craft.map(craf => (
      <tr key={craf._id}>
        <td>{craf.skills}</td>
        <td>{craf.materialsUsed}</td>
        <td>{craf.description}</td>

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
              <th>Skills</th>
              <th>Materials Used</th>
              <th>Delete</th>
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
