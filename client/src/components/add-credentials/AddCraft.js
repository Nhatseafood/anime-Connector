import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCraft } from "../../actions/profileActions";

class AddCraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: "",
      materialsUsed: "",
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const craData = {
      skills: this.state.skills,
      materialsUsed: this.state.materialsUsed,
      description: this.state.description
    };

    this.props.addCraft(craData, this.props.history);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onCheck(event) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-craft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Craft Experience</h1>
              <p className="lead text-center">
                Add any job or crafts that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                />
                <TextFieldGroup
                  placeholder="* Materials Used"
                  name="materialsUsed"
                  value={this.state.materialsUsed}
                  onChange={this.onChange}
                  error={errors.materialsUsed}
                />

                <TextAreaFieldGroup
                  placeholder="Coplay Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about more about your costume and cosplay"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCraft.propTypes = {
  addCraft: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addCraft })(withRouter(AddCraft));
