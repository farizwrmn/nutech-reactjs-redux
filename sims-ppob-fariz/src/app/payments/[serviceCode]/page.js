'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navbar/page';
import Header from '@/app/dashboard/components/header';
import TransactionInput from '@/components/transactionInput';

const PaymentPage = () => {
  const { serviceCode } = useParams();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="sm:px-0 px-5">
        <Header />
      </div>
      <div className="sm:px-0 px-5">
        {serviceCode && <TransactionInput serviceCode={serviceCode} />}
      </div>
    </div>
  );
};

export default PaymentPage;
