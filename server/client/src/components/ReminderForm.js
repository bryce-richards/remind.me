import React from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReminder } from '../actions';
import requireAuth from './requireAuth';

const ReminderForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // trigger reminder creation upon form submit
  const onFormSubmit = formProps => {
    dispatch(createReminder(formProps, () => {
      // if successful, navigate to dashboard
      history.push('/dashboard');
    }));
  };

  return (
    <div style={{margin: "0 auto 0 auto", width: "70%"}}>
      <Form
        onSubmit={onFormSubmit}
        // validate form values
        validate={values => {
          const errors = {};
          if (!values.text) {
            errors.text = 'Required'
          }
          if (!values.date) {
            errors.date = 'Required'
          }
          if (!values.time) {
            errors.time = 'Required'
          }
          return errors;
        }}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            // Reminder text
            <Field
              name="text"
            >
              {({ input, meta }) => (
                <div>
                  <label>Reminder Text</label>
                  <input {...input} type="text" placeholder="Remember to..." />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            // Reminder date
            <Field
              name="date"
            >
              {({ input, meta }) => (
                <div>
                  <label>Due Date</label>
                  <input {...input} 
                    type="date"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            // Reminder time
            <Field
              name="time"
            >
              {({ input, meta }) => (
                <div>
                  <label>Reminder Time</label>
                  <input {...input} 
                    type="time" 
                  />
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
              <Link 
                className="waves-effect waves-light btn-flat" 
                to="/dashboard">
                Cancel
              </Link>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default requireAuth(ReminderForm);