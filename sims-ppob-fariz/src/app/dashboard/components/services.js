'use client';

import { getServices } from '@/services/user.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Services = () => {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial window width on mount
      setWindowWidth(window.innerWidth);

      // Update window width on resize
      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener('resize', handleResize);

      // Clean up event listener when the component is unmounted
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not logged in');
        }

        try {
          const response = await instance.get('/services', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response?.data?.status === 0) {
            setServices(response.data?.data);
          }
        } catch (error) {
          console.error('Error fetching services:', error);
        }
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const visibleServices = showAll || windowWidth >= 640 ? services : services.slice(0, 8);

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
    <div className="sm:overflow-x-auto no-scrollbar">
      <ul className="grid grid-cols-4 sm:flex sm:w-max sm:justify-center sm:items-center gap-2">
        {visibleServices.map((service) => (
          <li
            key={service.service_code}
            className="service-item flex flex-col items-center justify-center p-4 rounded-xl min-w-[100px] max-w-[100px] h-[120px] sm:h-[180px] sm:w-[180px] flex-shrink-0"
          >
            <Link href={`/payments/${service.service_code}`} className="flex flex-col items-center w-full">
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="service-icon object-cover w-12 h-12"
              />
              {/* Adjust text size dynamically based on screen size, keeping text centered */}
              <p className="mt-2 text-center text-xs sm:text-sm md:text-md leading-tight w-full">
                {service.service_name}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Show More button only on smaller screens */}
      {services.length > 8 && window.innerWidth < 640 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-2 py-2 bg-gray-300 text-slate-700 text-sm rounded-lg"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>

  )
}

export default Services
