import Navbar from '@/components/navbar/page'
import React from 'react'
import Header from '../dashboard/components/header'
import UserInput from './components/userInput'

const Page = () => {
  return (
    <div className=''>
      <div className=''>
        <Navbar />
      </div>
      <div className='sm:px-0 px-5'>
        <Header />
      </div>
      <div className='sm:px-10 px-5'>
        <UserInput />
      </div>
    </div>
  )
}

export default Page
