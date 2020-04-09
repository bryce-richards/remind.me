import React from 'react';
import { Form, Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../actions';
import { validateEmail } from '../../utils/helpers';

const SignIn = () => {
  const errorMessage = useSelector(state => state.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();
  // trigger user sign in upon form submit
  const onFormSubmit = formProps => {
    dispatch(signIn(formProps, () => {
      // if successful, navigate to dashboard
      history.push('/dashboard');
    }));
  };

  return (
    <div style={{margin: "0 auto 0 auto", width: "50%"}}>
      <Form
        onSubmit={onFormSubmit}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (!validateEmail(values.email)) {
            errors.email = 'Not a valid email address'
          }
          if (!values.password) {
            errors.password = 'Required'
          }
          return errors
        }}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
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
      <div>{errorMessage}</div>
    </div>
  )
}

export default SignIn;
