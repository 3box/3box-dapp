import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class EditProfileForm extends Component {

  submit = (values) => {
    console.log(values);
  }
  
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>

        <div id="edit_field">

          <p className="subheader">PUBLIC</p>
          <p className="subtext">This information will be public for all to see.</p>

          <div className="edit_form">

            <h3>Ethereum Address</h3>
            <p>0xasdfasdf</p>

            <div className="edit_form_spacing" />

            <h3>Name</h3>
            <Field name="name" component="input" type="text" />

            <div className="edit_form_spacing" />

            <h3>Github</h3>
            <Field name="github" component="input" type="text" />

          </div>

          <p className="subheader">PRIVATE</p>
          <p className="subtext">This information will be public for all to see.</p>

          <div className="edit_form">
            <h3>Email Address</h3>
            <input />
          </div>

        </div>

        <button type="submit">Submit</button>
        <Link to="/Profile" className="subtext" id="edit_cancel">
          Cancel
        </Link>
      </form>


    )
  }
}

EditProfileForm.propTypes = {
  handleSubmit: PropTypes.string,
};

EditProfileForm.defaultProps = {
  handleSubmit: PropTypes.string,
};

EditProfileForm = reduxForm({
  form: 'edit_profile',
})(EditProfileForm);

export default EditProfileForm;
