'use client';

import { postTransaction } from '@/services/transaction.service';
import { getServices, getUserBalance } from '@/services/user.service';
import { FormatCurrency } from '@/utils/formatCurrency';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const TransactionInput = ({ serviceCode, customServiceData = null, transactionHandler = postTransaction }) => {
  const [services, setServices] = useState([]);
  const [specificService, setSpecificService] = useState(customServiceData);
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (customServiceData) {
      setSpecificService(customServiceData);
      setAmount(Number(customServiceData.service_tariff));
    } else {
      const fetchServices = async () => {
        try {
          const response = await getServices();
          const data = await response?.data || response;

          if (data?.length > 0) {
            setServices(data);
            const filteredService = data.find(service => service.service_code === serviceCode);
            if (filteredService) {
              setSpecificService(filteredService);
              setAmount(Number(filteredService.service_tariff));
            }
          } else {
            toast.error('No services found');
          }

        } catch (error) {
          console.log('Error fetching services', error);
          toast.error('Failed to fetch services');
        }
      };

      fetchServices();
    }
  }, [serviceCode, customServiceData]);

  const handlePay = async () => {
    if (!specificService) {
      toast.error('Service not found');
      return;
    }

    const balance = await getUserBalance();
    if (balance < amount) {
      toast.error('Saldo tidak mencukupi');
    } else {
      await transactionHandler(specificService.service_code);
      toast.success('Pembayaran Berhasil');
      router.push('/dashboard');
    }
  };

  return (
    <div className='px-4 sm:px-20'>
      <div>
        <p className='text-sm sm:text-lg'>PemBayaran</p>
        {specificService && (
          <>
            <div className='mt-5'>
              <div className='flex place-items-center text-sm sm:text-xl gap-4'>
                <img src={specificService.service_icon} alt={specificService.service_name} />
                <p>{specificService.service_name}</p>
              </div>
            </div>
            <div>
              <div type="text" className='w-full mt-5 px-3 py-2 border border-gray-300 rounded-md' >
                💰 {FormatCurrency(specificService.service_tariff)}
              </div>
              <button className='w-full mt-5 mb-20 px-3 py-2 border border-gray-300 rounded-md bg-red-500 hover:bg-red-600 text-white' onClick={handlePay}>Bayar</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TransactionInput
