import Navbar from '@/components/navbar/page'
import React from 'react'
import Header from '../dashboard/components/header'
import ListTransaction from './components/listTransaction'

const Page = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='sm:px-0 px-5'>
        <Header />
      </div>
      <div className='sm:px-10 px-5'>
        <ListTransaction />
      </div>
    </div>
  )
}

export default Page
