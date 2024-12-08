import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex flex-col place-items-center justify-center'>
      <div className='flex justify-center'>
        <Image src="/assets/images/Logo.png" alt="Logo" width={30} height={30} />
        <p className='font-medium ml-2'>SIMS PPOB</p>
      </div>
      <div>
        <h1 className='text-center text-4xl font-medium py-10'>Masuk atau buat akun untuk memulai</h1>
      </div>
    </div>
  )
}

export default Logo
