'use client';

import FloatingLabelInput from '@/components/floatingLabels';
import Logo from '@/components/logo';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { signIn } from '@/lib/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import React from 'react'
import instance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';

const innerFormSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Format Email Salah')
      .required('Email tidak boleh kosong'),
    password: Yup.string()
      .min(8, 'Password min. 8 karakter')
      .required('Password tidak boleh kosong'),
    first_name: Yup.string().required('Nama Depan tidak boleh kosong'),
    last_name: Yup.string().required('Nama Belakang tidak boleh kosong'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password tidak sama')
      .required('Konfirmasi Password tidak boleh kosong'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, first_name, last_name, password } = values;

    try {
      await instance.post('/registration', values);
      toast.success('Akun berhasil dibuat');
      router.push('/');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
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
              <FloatingLabelInput
                as={Field}
                type="text"
                label="👤 Nama depan"
                id={'first_name'}
                name={'first_name'}
              />
              <FloatingLabelInput
                as={Field}
                type="text"
                label="👤 Nama belakang"
                id={'last_name'}
                name={'last_name'}
              />
              <div className="relative w-full">
                <FloatingLabelInput
                  type={showPassword ? 'text' : 'password'}
                  label="🔒 Buat password"
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
              <div className="relative w-full">
                <FloatingLabelInput
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="🔒 Konfirmasi password"
                  id="confirmPassword"
                  name={'confirmPassword'}
                />

                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? '👁️' : '🙈'}
                </button>
              </div>
              <button disabled={isSubmitting} className="p-2 bg-red-500 text-white rounded-md mt-5 w-full" type="submit">
                {isSubmitting ? 'Submitting...' : 'Registrasi'}
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <p className='text-center mt-10'>Sudah punya akun? Login <Link href="/" className='text-red-500'>di sini</Link></p>
        </div>
      </div>
    </div>
  )
}

export default innerFormSignUp
