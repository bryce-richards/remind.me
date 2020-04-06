import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import { validateEmail, validatePhone } from '../../utils/helpers';

const mapDispatch = dispatch => {
  return {
    onFormSubmit: formProps => {
      dispatch(signIn(formProps, () => {
        this.props.history.push('/dashboard');
      }));
    }
  };
};

const isRequired = value => (value ? undefined : 'Required');
const mustBeEmail = email => (validateEmail(email) ? undefined: 'Not a valid email address.');
const mustBePhone = phone => (validatePhone(phone) ? undefined: 'Not a valid phone number.');
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const SignIn = ({ onFormSubmit }) => (
  <Form
    onSubmit={onFormSubmit}
    render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        <Field name="firstName" validate={isRequired}>
          {({ input, meta }) => (
            <div>
              <label>First Name</label>
              <input {...input} type="text" placeholder="First Name" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field name="lastName" validate={isRequired}>
          {({ input, meta }) => (
            <div>
              <label>Last Name</label>
              <input {...input} type="text" placeholder="Last Name" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field
          name="email"
          validate={composeValidators(isRequired, mustBeEmail)}
        >
          {({ input, meta }) => (
            <div>
              <label>Phone</label>
              <input {...input} type="text" placeholder="123-456-7890" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field
          name="phone"
          validate={mustBePhone}
        >
          {({ input, meta }) => (
            <div>
              <label>Email</label>
              <input {...input} type="text" placeholder="" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <div className="buttons">
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            onClick={form.reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
        <pre>{JSON.stringify(values, 0, 2)}</pre>
      </form>
    )}
  />
)

export default connect(
  null,
  mapDispatch
)(SignIn);
