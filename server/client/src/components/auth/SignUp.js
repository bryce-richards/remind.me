import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../actions';
import { validateEmail, validatePhone } from '../../utils/helpers';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFormSubmit = formProps => {
    dispatch(signUp(formProps, () => {
      history.push('/dashboard');
    }));
  };

  return (
    <div>
      <Form
        onSubmit={onFormSubmit}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!validateEmail(values.email)) {
            errors.email = 'Not a valid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.confirm) {
            errors.confirm = 'Required';
          } else if (values.confirm !== values.password) {
            errors.confirm = 'Password must match';
          }
          if (!values.phone) {
            errors.phone = 'Required';
          } else if (!validatePhone(values.phone)) {
            errors.phone = 'Not a valid phone number';
          }
          return errors
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName">
              {({ input, meta }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="email"
            >
              {({ input, meta }) => (
                <div>
                  <label>Email</label>
                  <input {...input} type="text" placeholder="Email" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="password"
            >
              {({ input, meta }) => (
                <div>
                  <label>Password</label>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="confirm"
            >
              {({ input, meta }) => (
                <div>
                  <label>Confirm Password</label>
                  <input {...input} type="password" placeholder="Confirm" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="phone"
            >
              {({ input, meta }) => (
                <div>
                  <label>Phone (to receive SMS message)</label>
                  <input {...input} type="tel" placeholder="555-555-5555" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button 
                type="submit" 
                className="waves-effect waves-light btn" 
                disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                className="waves-effect waves-light btn-flat"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default SignUp;
