import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  due_date: Yup.string().required('Due date is required'),
});

export default function TaskForm() {
  const initialValues = {
    title: '',
    description: '',
    due_date: '',
    status: 'pending',
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api.post('/tasks', values);
      resetForm();
      window.location.reload(); // optional refresh
    } catch (err) {
      console.error('Error submitting task', err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div className="mb-2">
            <Field name="title" className="form-control" placeholder="Title" />
            <ErrorMessage name="title" component="div" className="text-danger" />
          </div>

          <div className="mb-2">
            <Field
              as="textarea"
              name="description"
              className="form-control"
              placeholder="Description"
            />
            <ErrorMessage name="description" component="div" className="text-danger" />
          </div>

          <div className="mb-2">
            <Field type="date" name="due_date" className="form-control" />
            <ErrorMessage name="due_date" component="div" className="text-danger" />
          </div>

          <div className="mb-2">
            <Field as="select" name="status" className="form-control">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Field>
          </div>

          <button type="submit" className="btn btn-primary">Add Task</button>
        </Form>
      )}
    </Formik>
  );
} 
