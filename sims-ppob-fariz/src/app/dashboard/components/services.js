'use client';

import { getServices } from '@/services/user.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        const data = await response?.data || response;

        if (data?.length > 0) {
          setServices(data);
        } else {
          setError('No services found');
        }

      } catch (error) {
        console.log('Error fetching services', error)
      }
    };

    fetchServices();
  }, [])

  return (
    <div className="overflow-x-auto no-scrollbar">
      <ul className="flex gap-4">
        {services.map((service) => (
          <li
            key={service.service_code}
            className="service-item flex flex-col items-center p-4 hover:bg-red-200 rounded-xl"
          >
            <Link href={`/payments/${service.service_code}`} className='flex flex-col place-items-center'>
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="service-icon object-cover w-12 h-12"
              />
              <p className="mt-2 text-center sm:text-md text-sm">{service.service_name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Services
