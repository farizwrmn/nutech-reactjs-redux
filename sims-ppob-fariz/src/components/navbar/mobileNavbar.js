'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Links } from './page';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-50 w-full border-b-2 p-5">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <Link href="/dashboard">
          <div className="flex items-center">
            <Image src="/assets/images/Logo.png" alt="Logo" width={30} height={30} />
            <p className="font-medium ml-2 cursor-default">SIMS PPOB</p>
          </div>
        </Link>
        <button
          onClick={toggleNavbar}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl bg-slate-100 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? '✖' : '☰'}
        </button>
        <div
          className={`${isOpen ? 'block' : 'hidden'} absolute top-20 left-0 w-full bg-gray-50 z-50 md:relative md:top-auto md:left-auto md:block md:w-auto md:bg-transparent`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:mt-0 border md:border-0 border-gray-100 rounded-lg md:rounded-none bg-gray-50 md:bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse">
            {Object.values(Links).map(({ href, label, icon }) => (
              <li key={label}>
                <div className='flex align-middle'>
                  <Link
                    href={href}
                    className="w-full block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    {icon && <span className="mr-2 mt-2">{icon}</span>}
                    {label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
