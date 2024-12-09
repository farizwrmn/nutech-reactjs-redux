'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { setUser } from '@/lib/features/auth/authSlice';
import { getUserBalance, getUserDetails } from '@/services/user.service';


const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [userBalance, setUserBalance] = useState(null);
  const [showBalance, setShowBalance] = useState(false);

  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userDetails, userBalance] = await Promise.all([getUserDetails(), getUserBalance()]);
        const { first_name, last_name, profile_image } = userDetails;
        const { balance } = userBalance;

        dispatch(setUser({
          firstName: first_name,
          lastName: last_name,
          image: profile_image,
          email: userDetails?.email
        }));

        localStorage.setItem('user', JSON.stringify({
          firstName: first_name,
          lastName: last_name,
          image: profile_image,
          email: userDetails?.email
        }));

        setUserBalance(balance);

      } catch (error) {
        console.log('Error fetching user details', error)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch])



  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className='py-10 sm:px-20 px-5 grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div className='flex flex-col items-start'>
        <Image
          src={"/assets/images/Profile Photo.png" || user?.image}
          alt="Profile"
          width={100}
          height={100}
        />
        <p className='text-2xl py-5 font-light'>Selamat datang,</p>
        <p className='text-3xl font-semibold -mt-4'>{`${user?.firstName} ${user?.lastName}`}</p>
      </div>
      <div
        className='flex w-full sm:p-3 p-1 h-full'
        style={{
          backgroundImage: "url('/assets/images/Background Saldo.png')",
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          borderRadius: '10px',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className='text-white'>
          <p className='sm:text-lg text-sm sm:mt-5 my-1'>Saldo anda</p>
          {showBalance ? (
            <p className='sm:text-3xl text-lg font-bold sm:mt-2'>{'Rp. ' +
              userBalance.toLocaleString('id-ID', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</p>
          ) : (
            <p className='sm:text-3xl text-lg font-bold sm:mt-2'>{'Rp • • • • • • •'}</p>
          )}
          <button
            className='sm:text-sm text-xs sm:mt-5 mt-0 bg-red-500 rounded bg-none'
            onClick={handleShowBalance}
          >
            {showBalance ? 'Sembunyikan saldo' : 'Lihat Saldo'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header