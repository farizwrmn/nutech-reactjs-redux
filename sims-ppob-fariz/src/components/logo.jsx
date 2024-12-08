import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const Logo = () => {
  const router = useRouter();
  const pathname = router.pathname;


  let headingText = '';
  if (pathname === '/') {
    headingText = 'Masuk atau buat akun untuk memulai';
  } else if (pathname === '/sign-in') {
    headingText = 'Buat akun atau masuk';
  } else {
    headingText = 'Lengkapi data untuk membuat akun';
  }


  return (
    <div className='flex flex-col place-items-center justify-center'>
      <div className='flex justify-center'>
        <Image src="/assets/images/Logo.png" alt="Logo" width={30} height={30} />
        <p className='font-medium ml-2'>SIMS PPOB</p>
      </div>
      <div>
        <h1 className='text-center text-4xl font-medium py-10'>{headingText}</h1>
      </div>
    </div>
  )
}

export default Logo
