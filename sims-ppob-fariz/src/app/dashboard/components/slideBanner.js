'use client';

import { getSlideBanner } from '@/services/user.service';
import React, { useEffect, useState } from 'react'


const SlideBanner = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await getSlideBanner();
        const data = response.data || response;

        if (data?.length > 0) {
          setBanner(data);
        }

      } catch (error) {
        console.log('Error fetching banner', error)
      }
    };

    fetchBanner();
  }, [])

  return (
    <div className="px-10 mb-10">
      <div className='justify-start'>
        <p className='sm:text-xl font-semibold my-10'>Temukan promo menarik</p>
      </div>
      <div className='overflow-x-auto no-scrollbar'>
        <ul className="flex gap-4 sm:w-fit">
          {banner.map((banner) => (
            <li
              key={banner.banner_name}
              className="banner-item flex flex-col items-center max-w-[1250px]"
            >
              <img
                src={banner.banner_image}
                alt={banner.banner_name}
                className="banner-image w-full h-full sm:max-w-full sm:h-[200px] lg:max-w-[500px] lg:h-auto"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SlideBanner
