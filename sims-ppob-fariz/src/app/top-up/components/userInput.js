'use client'

import { topUpSaldo } from '@/services/transaction.service';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Nominal = {
  ceban: {
    index: 1,
    nominal: 'Rp. 10.000,-',
    value: 10000,
  },
  duapulu: {
    index: 2,
    nominal: 'Rp. 20.000,-',
    value: 20000,
  },
  gocap: {
    index: 3,
    nominal: 'Rp. 50.000,-',
    value: 50000,
  },
  cepe: {
    index: 4,
    nominal: 'Rp. 100.000,-',
    value: 100000,
  },
  jigo: {
    index: 5,
    nominal: 'Rp. 250.000,-',
    value: 250000,
  },
  gope: {
    index: 6,
    nominal: 'Rp. 500.000,-',
    value: 500000,
  },
};

const UserInput = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const isInputValid = () => {
    const numericValue = Number(inputValue);
    return numericValue >= 10000 && numericValue <= 1000000 && !isNaN(numericValue);
  };

  const handleTopUp = async () => {
    const numericValue = Number(inputValue);
    if (numericValue >= 10000 && numericValue <= 1000000) {
      try {
        const response = await topUpSaldo(numericValue);

        if (!response) throw new Error('Top Up Gagal');
        toast.success(`Top Up sebesar Rp. ${numericValue.toLocaleString()} Berhasil`);
        router.push('/dashboard');
      } catch (error) {
        toast.error(`Top Up Gagal: ${error}`);
      }
    }
  };

  return (
    <div className='px-10'>
      <div>
        <p>Silahkan masukkan</p>
        <p className='font-semibold text-xl'>Nominal Top Up</p>
      </div>
      <div>
        <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 w-full'>
          <div>
            <input type='text' className='border-gray-400 border-2 rounded-md p-2 mt-1 w-full' placeholder='💳 Masukkan nominal top up' min={0} max={1000000} onChange={(e) => setInputValue(e.target.value)} maxLength={7} value={inputValue} style={{}} required />
            <div>
              <button className={`w-full justify-center border-2 border-gray-400 rounded-lg p-5 mt-10 bg-red-500 text-white ${!isInputValid() ? 'opacity-50 cursor-not-allowed bg-gray-400' : ''}`} disabled={!isInputValid()} onClick={handleTopUp}>Top Up</button>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            {Object.values(Nominal).map(({ nominal, index, value }) => (
              <button className='li border-2 border-gray-400 rounded-lg p-2 mt-1 hover:bg-red-400' key={index} onClick={() => setInputValue(value)}>{nominal}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInput;