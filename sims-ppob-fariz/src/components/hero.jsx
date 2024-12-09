import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="justify-end w-full sm:hidden md:hidden xl:block min-h-screen" style={{ backgroundColor: '#fff1f0' }}>
      <div>
        <Image src="/assets/images/IllustrasiLogin.png" alt="Logo" width={550} height={550} className='h-full object-contain overflow-hidden' />
      </div>
    </div>
  )
}

export default Hero
