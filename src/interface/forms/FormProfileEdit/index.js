/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose'
import { reduxForm, change } from 'redux-form'
/* ------------------------- Internal Dependencies -------------------------- */
import { createValidator, required } from 'logic/forms/validation'
import Form from './form'
/* ---------------------------- Module Package ------------------------------ */
/*-* Recompose *-*/
const QueryLifecycle = lifecycle(
{
  componentDidMount()
  {

  },
  componentDidUpdate(prevProps)
  {

  }
})

/*-* Redux *-*/
const mapStateToProps = (state, props) => ({

})


const mapDispatchToProps = (dispatch, props) => ({

})


/* ----------------------------- Redux Form -------------------------------- */
/*-- Event Handlers ---*/
const onSubmit = (data, dispatch, props) => new Promise((resolve, reject) => {

})

const validate = createValidator({
  'contactEmail': required,
})

const config = {
  form: 'FormSettingsGeneral',
  fields: [
    'networkDefault',
  ],
  destroyOnUnmount: true,
  onSubmit,
  validate
}

/* ----------------------------- Export -------------------------------- */
const FormConfiguration = reduxForm(config)
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  FormConfiguration,
  QueryLifecycle,
)(Form);