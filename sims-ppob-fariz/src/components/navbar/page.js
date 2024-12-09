'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNavbar from './mobileNavbar'
import { usePathname } from 'next/navigation';


export const Links = {
  topUp: {
    href: '/top-up',
    label: 'Top Up',
    icon: '💰'
  },
  transaction: {
    href: '/transaction',
    label: 'Transaction',
    icon: '💸'
  },
  akun: {
    href: '/akun/profile',
    label: 'Akun',
    icon: '👤'
  }
}

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* // Desktop Navbar // */}

      <div className='hidden md:flex px-20 py-3 border-b-2 justify-between'>
        <Link href="/dashboard">
          <div className='flex justify-start place-items-center'>
            <Image src="/assets/images/Logo.png" alt="Logo" width={30} height={30} />
            <p className='font-medium ml-2 mt-1 cursor-default'>SIMS PPOB</p>
          </div>
        </Link>
        <div className='mt-1'>
          <ul className='flex justify-end'>
            {Object.values(Links).map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className={`px-5 mx-3 hover:text-red-600 ${pathname === href ? 'text-red-500 font-bold' : 'text-slate-900'}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* // Mobile Navbar // */}

      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </>
  )
}

export default Navbar
