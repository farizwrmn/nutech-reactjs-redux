'use client';

import React, { useState } from 'react';
import Logo from '@/components/logo';
import FloatingLabelInput from '@/components/floatingLabels';
import Link from 'next/link';


const InnerFormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`email, password: ${email}, ${password}`);
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='w-full max-w-md p-5'>
        <div className='text-center mb-5'>
          <Logo />
        </div>
        <div className='grid gap-5'>
          <FloatingLabelInput
            type="text"
            label="✉️ Masukkan email anda"
            email={email}
            onChange={(e) => setEmail(e.target.value)}
            id={'email'}
          />
          <FloatingLabelInput
            type="text"
            label="🔒 Masukkan password anda"
            password={password}
            onChange={(e) => setPassword(e.target.value)}
            id={'password'}
          />
          <button onClick={handleLogin} className="p-2 bg-red-500 text-white rounded-md mt-5 w-full">Masuk</button>
        </div>
        <div>
          <p className='text-center mt-10'>Belum punya akun? Registrasi <Link href="/register" className='text-red-500'>di sini</Link></p>
        </div>
      </div>
    </div>
  )
}

export default InnerFormLogin
