import React from 'react'
import InnerFormLogin from './innerFormLogin'
import Hero from '@/components/hero'

const Login = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-center place-items-center min-h-screen overflow-hidden">
      <div className='justify-center'>
        <InnerFormLogin />
      </div>
      <div className="justify-end w-full min-h-screen sm:hidden xl:block md:hidden">
        <Hero />
      </div>
    </div>

  )
}

export default Login
