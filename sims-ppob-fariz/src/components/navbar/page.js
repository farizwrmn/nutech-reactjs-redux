import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='px-5 py-3 border-b-2'>
      <div className='flex justify-start'>
        <Image src="/assets/images/Logo.png" alt="Logo" width={30} height={30} />
        <p className='font-medium ml-2 mt-1 cursor-default'>SIMS PPOB</p>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Navbar
