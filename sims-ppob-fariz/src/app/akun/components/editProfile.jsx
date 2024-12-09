'use client';

import React from 'react'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const EditProfile = ({ user, isEditing, formData, handleInputChange, handleSave, handleEditClick, handleCancel, handleImageUpload, handleImageChange, loading }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());

    localStorage.clear();

    router.push('/');
  };

  return (
    <>
      <div className='grid justify-center items-center my-10'>
        <div className='relative text-center'>
          <Image
            src={"/assets/images/Profile Photo.png" || user?.image}
            alt="User Image"
            width={100}
            height={100}
            className='h-full object-contain overflow-hidden rounded-full mx-auto'
          />

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="block"
            onChange={handleImageChange}
          />

          <button onClick={handleImageUpload} disabled={loading} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>

          <p className='text-3xl font-semibold text-slate-800 mt-4'>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full text-center"
                />
              </>
            ) : (
              `${user?.firstName} ${user?.lastName}`
            )}
          </p>
        </div>
      </div>

      <div className='sm:px-20 px-4'>
        <div className='w-full justify-center sm:px-20'>
          <p className='mb-2'>Email</p>
          <div className='mb-5 border border-gray-600 p-2 rounded-md'>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border p-1 rounded-md"
              />
            ) : (
              <p className='font-semibold'>{user?.email}</p>
            )}
          </div>

          <p className='mb-2'>Nama Depan</p>
          <div className='mb-5 border border-gray-600 p-2 rounded-md'>
            {isEditing ? (
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full border p-1 rounded-md"
              />
            ) : (
              <p className='font-semibold'>{user?.firstName}</p>
            )}
          </div>

          <p className='mb-2'>Nama Belakang</p>
          <div className='mb-5 border border-gray-600 p-2 rounded-md'>
            {isEditing ? (
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full border p-1 rounded-md"
              />
            ) : (
              <p className='font-semibold'>{user?.lastName}</p>
            )}
          </div>
        </div>

        <div className='flex-col flex gap-4 w-full justify-center sm:px-20 mt-10'>
          {isEditing ? (
            <>
              <button
                className='bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-700'
                onClick={handleSave}
              >
                Simpan
              </button>
              <button
                className='bg-white border border-green text-black p-2 rounded-md w-full hover:bg-gray-700 hover:text-white'
                onClick={handleCancel}
              >
                Batalkan
              </button>
            </>
          ) : (
            <button onClick={handleEditClick}>
              <div className='bg-white border border-red-500 p-2 rounded-md w-full text-center hover:bg-green-500 hover:border-white'>
                Edit Profile
              </div>
            </button>
          )}
          <div>
            <button className='bg-red-500 text-white p-2 rounded-md w-full hover:bg-red-700 mb-20' onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile
