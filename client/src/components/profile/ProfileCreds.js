import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { craft, highlight } = this.props;

    const craItems = craft.map(cra => (
      <li key={cra._id} className="list-group-item">
        <h4>{cra.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{cra.from}</Moment> -
          {cra.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{cra.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {cra.title}
        </p>
        <p>
          {cra.location === "" ? null : (
            <span>
              <strong>Location: </strong> {cra.location}
            </span>
          )}
        </p>
        <p>
          {cra.description === "" ? null : (
            <span>
              <strong>Description: </strong> {cra.description}
            </span>
          )}
        </p>
      </li>
    ));

    const highItems = highlight.map(high => (
      <li key={high._id} className="list-group-item">
        <h4>{high.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{high.from}</Moment> -
          {high.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{high.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {high.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {high.fieldofstudy}
        </p>
        <p>
          {high.description === "" ? null : (
            <span>
              <strong>Description: </strong> {high.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Craft Experience</h3>
          {craItems.length > 0 ? (
            <ul className="list-group">{craItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Highlight</h3>
          {highItems.length > 0 ? (
            <ul className="list-group">{highItems}</ul>
          ) : (
            <p className="text-center">No Highlight Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
