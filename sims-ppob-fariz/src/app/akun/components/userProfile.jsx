'use client';

import { setUser } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import EditProfile from './editProfile';
import { updateUserProfile, uploadImage } from '@/services/profile.service';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState('/assets/images/Profile Photo.png');
  const [formData, setFormData] = useState({
    first_name: user?.firstName || '',
    last_name: user?.lastName || '',
    email: user?.email || '',
  });

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      image: user?.image || '',
    });
  };

  const handleEditClick = () => setIsEditing(true);

  const handleEditPhotoClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userDetails = JSON.parse(storedUser);
      const { firstName, lastName, image, email } = userDetails;

      dispatch(setUser({
        firstName,
        lastName,
        email,
        image
      }));

      setFormData({
        first_name: firstName,
        last_name: lastName,
        email,
      });

    } else {
      router.push('/');
    }
    setLoading(false);

  }, [dispatch, router]);

  const handleSave = async () => {
    try {
      const { first_name, last_name, email } = formData;
      await updateUserProfile({ first_name, last_name, email });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      toast.error('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const result = await uploadImage(formData);

      if (result.success) {
        setProfileImage(result.profileImage);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(result.message);
      }

    } catch (err) {
      toast.error(err);
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <EditProfile
        user={user}
        isEditing={isEditing}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleEditClick={handleEditClick}
        handleEditPhotoClick={handleEditPhotoClick}
        handleCancel={handleCancel}
        handleImageUpload={handleImageUpload}
        handleImageChange={handleImageChange}
        loading={loading}
      />
    </div>
  )
}

export default UserProfile
