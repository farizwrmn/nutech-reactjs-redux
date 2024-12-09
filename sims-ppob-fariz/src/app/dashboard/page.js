import Navbar from '@/components/navbar/page'
import React from 'react'
import Header from './components/header'
import Services from './components/services'
import SlideBanner from './components/slideBanner'

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='sm:px-10'>
        <Header />
      </div>
      <div className='sm:px-10 px-5'>
        <Services />
      </div>
      <div className='sm:px-10 px-0'>
        <SlideBanner />
      </div>
    </div>
  )
}

export default Dashboard
