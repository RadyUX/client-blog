
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from "react";

import {  useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});


const navigate = useNavigate();


const handleLogin = async (formValue: FormikValues) => {
  const { email, password } = formValue;
  setMessage("");
  setLoading(true);

  try {
    await login(email, password);
    navigate("/");
  } catch (error: any ) {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    setLoading(false);
    setMessage(resMessage);
  }
};


  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
            Email
          </label>
          <Field
            name="email"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Email address"
          />
          <ErrorMessage name="email" component="div" className="mt-1 text-xs text-red-500" />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
            Password
          </label>
          <Field
            name="password"
            type="password"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="div" className="mt-1 text-xs text-red-500" />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>

        {message && (
          <div className="mt-4">
            <div className="p-4 text-yellow-700 bg-yellow-100 border-l-4 border-yellow-500" role="alert">
              <p>{message}</p>
            </div>
          </div>
        )}
      </Form>
    </Formik>
  </div>
  );
};

export default Login;
