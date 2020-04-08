import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReminder } from '../actions';
import requireAuth from './requireAuth';

const ReminderForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFormSubmit = formProps => {
    dispatch(createReminder(formProps, () => {
      history.push('/dashboard');
    }));
  };

  return (
    <div>
      <Form
        onSubmit={onFormSubmit}
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
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
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

export default requireAuth(ReminderForm);