// src/EmployeeForm.tsx

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

// Define validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be unique'),
  department: yup.string().required('Department is required'),
  hourlyRate: yup.number().positive('Hourly rate must be greater than 0').required('Hourly rate is required'),
//   justification: yup.string().when('hourlyRate', {
//     is: (value: number) => value > 50,
//     then: yup.string().required('Justification is required for rates above 50'),
//     otherwise: yup.string().notRequired(),
//   }),
});

interface FormValues {
  name: string;
  email: string;
  department: string;
  hourlyRate: number;
  justification?: string;
}

const EmployeeAdd: React.FC = () => {
  const handleSubmit = async (values: FormValues) => {
    try {
      const token = 'YOUR_ACCESS_TOKEN'; // Replace with a valid token
      await axios.post('/api/employees', values, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Employee added successfully');
      window.location.reload();

    } catch (error) {
      console.error('Error adding employee:', error);
      alert('An error occurred while adding the employee');
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          department: '',
          hourlyRate: 0,
          justification: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="department">Department:</label>
              <Field name="department" type="text" />
              <ErrorMessage name="department" component="div" />
            </div>

            <div>
              <label htmlFor="hourlyRate">Hourly Rate:</label>
              <Field name="hourlyRate" type="number" step="0.01" />
              <ErrorMessage name="hourlyRate" component="div" />
            </div>

            {values.hourlyRate > 50 && (
              <div>
                <label htmlFor="justification">Justification:</label>
                <Field name="justification" as="textarea" />
                <ErrorMessage name="justification" component="div" />
              </div>
            )}

            <button type="submit">Add Employee</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeAdd;
