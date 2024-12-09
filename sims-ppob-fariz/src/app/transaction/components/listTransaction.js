'use client';

import { getAllTransactions } from '@/services/user.service';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


const ListTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions(offset, limit);
      if (data?.records) {
        setTransactions((prev) => [...prev, ...data.records]);
        if (data.records.length < limit) {
          setHasMore(false);
        }
      }
    };

    fetchTransactions();
  }, [offset]);

  const handleShowMore = () => {
    setOffset((prev) => prev + limit);
  };


  return (
    <div className='px-10'>
      <div>
        <p className='font-semibold'>Semua Transaksi</p>
      </div>
      <div>
        {transactions.length > 0 ? (
          <div>
            {transactions.map((transaction) => (
              <div className='border p-5 border-slate-300 rounded-md my-5' key={uuidv4()}>
                <p className={`${transaction.transaction_type === 'TOPUP' ? 'text-green-500 before:content-["+"]' : 'text-red-500 before:content-["-"]'}`}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.total_amount).replace('IDR', '').trim()}</p>
                <p className={`font-semibold flex justify-end ${transaction.transaction_type === 'TOPUP' ? 'text-green-500' : 'text-red-500'}`}>{transaction.description}</p>
                <p className='text-sm text-gray-500'>
                  {new Intl.DateTimeFormat('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }).format(new Date(transaction.created_on))}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No transactions found.</p>
        )}

        {hasMore && (
          <div className="flex justify-center mb-10">
            <button
              onClick={handleShowMore}
              className="text-center text-red-500 place-items-center justify-center font-bold hover:text-white hover:bg-red-500 p-2 rounded-md"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListTransaction
