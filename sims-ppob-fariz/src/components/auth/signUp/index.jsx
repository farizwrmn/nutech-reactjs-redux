import React from 'react'
import InnerFormSignUp from './innerFormSignUp'
import Hero from '@/components/hero'

const Register = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-center place-items-center min-h-screen overflow-hidden">
      <div className='justify-center'>
        <InnerFormSignUp />
      </div>
      <div className="justify-end w-full min-h-screen sm:hidden xl:block md:hidden">
        <Hero />
      </div>
    </div>
  )
}

export default Register
