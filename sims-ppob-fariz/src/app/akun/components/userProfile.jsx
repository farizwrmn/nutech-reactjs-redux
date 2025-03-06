'use client';

import { setUser } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import EditProfile from './editProfile';
import { updateUserProfile, uploadImage } from '@/services/profile.service';
import { toast } from 'react-toastify';
import LoadingScreen from '@/components/loading';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.image || '/assets/images/Profile Photo.png');  // Initialize with user image
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
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

  const handleImageUpload = async () => {
    if (!image) {
      toast.error('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      setLoading(true);  // Show loading spinner while uploading
      const result = await uploadImage(formData);

      if (result.success) {
        setProfileImage(result.profileImage);  // Update the profile image state
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Error uploading image');
    } finally {
      setLoading(false);  // Hide loading spinner
    }
  };

  if (loading) {
    return <LoadingScreen loading={loading} />;
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
        handleCancel={handleCancel}
        handleImageUpload={handleImageUpload}
        handleImageChange={handleImageChange}
        profileImage={profileImage}  // Pass profile image as prop to EditProfile
        setProfileImage={setProfileImage}  // Pass setter for profile image
        loading={loading}
      />
    </div>
  )
}

export default UserProfile;
