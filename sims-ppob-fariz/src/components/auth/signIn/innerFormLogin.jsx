'use client';

import React, { useState } from 'react';
import Logo from '@/components/logo';
import FloatingLabelInput from '@/components/floatingLabels';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { signIn } from '@/lib/features/auth/authSlice';
import { toast } from 'react-toastify';


const InnerFormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      await dispatch(signIn({ email, password }));
      console.log('Form Data Submitted:', values);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='w-full max-w-md p-5'>
        <div className='text-center mb-5'>
          <Logo />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-5">
              <FloatingLabelInput
                as={Field}
                type="email"
                label="✉️ Masukkan email anda"
                id={'email'}
                name={'email'}
              />
              <div className="relative w-full">
                <FloatingLabelInput
                  type={showPassword ? 'text' : 'password'}
                  label="🔒 Masukkan password anda"
                  id="password"
                  name={'password'}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
              <button disabled={isSubmitting} className="p-2 bg-red-500 text-white rounded-md mt-5 w-full" type="submit">
                {isSubmitting ? 'Submitting...' : 'Masuk'}
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <p className='text-center mt-10'>Belum punya akun? Registrasi <Link href="/sign-up" className='text-red-500'>di sini</Link></p>
        </div>
      </div>
    </div>
  )
}

export default InnerFormLogin
