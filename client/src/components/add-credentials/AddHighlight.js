import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addHighlight } from "../../actions/profileActions";
import axios from "axios";

class AddHighlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      description: "",
      errors: {},
      disabled: false,
      selectedImage: ""
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

  // fileSelectedHandler = event => {
  //   this.setState({
  //     selectedFile: event.target.files[0]
  //   });
  // };

  // fileUploadHandler = () => {
  //   const fd = new FormData();
  //   fd.append("image", this.state.selectedFild, this.state.selectedFile.name);
  // };

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state, "<<<this is my state");
    const highData = {
      caption: this.state.caption,
      description: this.state.description,
      selectedImage: this.state.selectedImage
    };
    console.log(highData, "<<<<<<HIGHDATAA");
    this.props.addHighlight(highData, this.props.history);
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
      <div className="add-highlight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Highlight</h1>
              <p className="lead text-center">
                Add any skills, crafts, etc that you have made
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Caption"
                  name="caption"
                  value={this.state.caption}
                  onChange={this.onChange}
                  error={errors.caption}
                />
                <TextAreaFieldGroup
                  placeholder="Cosplay Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about more about the costume and cosplay you have made"
                />
                <input
                  type="file"
                  name="selectedImage"
                  value={this.state.selectedImage}
                  onChange={this.onChange}
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

AddHighlight.propTypes = {
  addHighlight: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addHighlight })(
  withRouter(AddHighlight)
);
