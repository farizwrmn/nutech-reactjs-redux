import Navbar from '@/components/navbar/page'
import React from 'react'
import UserProfile from '../components/userProfile'

const Page = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <UserProfile />
      </div>
    </div>
  )
}

export default Page
