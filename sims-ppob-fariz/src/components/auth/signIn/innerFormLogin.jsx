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
import { useRouter } from 'next/navigation';


const InnerFormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Format Email Salah')
      .required('Email tidak boleh kosong'),
    password: Yup.string()
      .min(8, 'Password min. 8 karakter')
      .required('Password tidak boleh kosong'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      const result = await dispatch(signIn({ email, password }));
      if (result?.success) {
        toast.success('Login Berhasil');
        router.push('/dashboard');
      } else {
        toast.error(result?.message || 'Login Gagal, periksa email dan password Anda.');
      }
    } catch (error) {
      toast.error(`Login gagal: ${error.message}`);
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
