'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loading';

const EditProfile = ({ user, isEditing, formData, handleInputChange, handleSave, handleEditClick, handleCancel, handleImageUpload, handleImageChange, loading, setProfileImage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(user?.image || '/assets/images/Profile Photo.png');

  const handleError = () => {
    setImageSrc('/assets/images/Profile Photo.png');
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    router.push('/');
  };

  // Function to handle the image upload
  const handleImageUploadClick = async () => {
    try {
      // Start uploading process
      await handleImageUpload(); // Assuming this method handles the image upload and updates the server.

      // Set the profile image immediately after the upload
      setImageSrc(user?.image || '/assets/images/Profile Photo.png'); // Update the profile image immediately after upload

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <div className='grid justify-center items-center my-10'>
        <div className='relative text-center'>
          <Image
            src={imageSrc}
            alt="User Image"
            width={100}
            height={100}
            className='h-full object-contain overflow-hidden rounded-full mx-auto'
            onError={handleError}
          />

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="block"
            onChange={handleImageChange}
          />
          <button
            onClick={handleImageUploadClick} // Updated method for image upload
            disabled={loading} // Disable button while uploading
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
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

export default EditProfile;
