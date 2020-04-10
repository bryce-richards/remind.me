import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../actions';
import { validateEmail, validatePhone } from '../../utils/helpers';
import { requestCode, checkCode } from '../../actions';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [code, setCode] = useState('');
  const [requested, setRequested] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleCodeRequest = () => {
    if (validatePhone(phone)) {
      setPhoneError('');
      dispatch(requestCode(phone, () => {
        setRequested(true);
      }));
    } else {
      setPhoneError('Invalid phone number');
    }
  };

  const handleCodeSubmit = () => {
    dispatch(checkCode({ phone, code }, () => {
      setVerified(true);
    }));
  };

  // trigger user sign in upon form submit
  const onFormSubmit = formProps => {
    dispatch(signUp({ formProps, phone }, () => {
      // if successful, navigate to dashboard
      history.push('/dashboard');
    }));
  };

  return (
    <div style={{margin: "0 auto 0 auto", width: "50%"}}>
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
              {({ input }) => (
                <div className="row">
                  <div className="input-field col s6">
                    <label for="phone" className="active">Phone (to receive SMS)</label>
                    <input {...input} 
                      id="phone"
                      type="tel" 
                      value={phone}
                      placeholder="555-555-5555" 
                      onChange={e => setPhone(e.target.value)}
                      disabled={verified} />
                      <span>{phoneError}</span>
                  </div>
                  <div className="input-field col s6">
                    <button
                      type="button"
                      className="waves-effect waves-light btn-small"
                      onClick={handleCodeRequest}
                      disabled={verified}>
                      Request Code
                    </button>
                  </div>
                </div>
              )}
            </Field>

            <Field
              name="verification"
            >
              {({ input }) => (
                <div className="row">
                  <div className="input-field col s6">
                  <label for="verification">Verification Code</label>
                    <input {...input} 
                      id="verification"
                      type="text" 
                      value={code}
                      onChange={e => setCode(e.target.value)}/>
                  </div>
                  <div className="input-field col s6">
                    <button
                      type="button"
                      className="waves-effect waves-light btn-small"
                      onClick={handleCodeSubmit}
                      disabled={!requested || verified}>
                      Verify Code
                    </button>
                  </div>
                </div>
              )}
            </Field>
            <div className="buttons">
              <button 
                type="submit" 
                className="waves-effect waves-light btn-small" 
                disabled={!verified}>
                Finish
              </button>
              <button
                type="button"
                className="waves-effect waves-light btn-small btn-flat"
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
