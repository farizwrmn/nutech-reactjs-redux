import instance from "@/utils/axiosInstance";

export const updateUserProfile = async ({ first_name, last_name, email }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }

    const payload = {
      first_name,
      last_name,
      email,
    };

    const { data } = await instance.put('/profile/update', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.status === 0) {
      const updatedUser = {
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        email: data.data.email,
        profile_image: data.data.profile_image,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return updatedUser;

    } else {
      throw new Error(data.message || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadImage = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await instance.put('/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (response.data.status === 0) {
      return {
        success: true,
        message: response.data.message,
        profileImage: response.data.data.profile_image,
      }
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to upload image.',
      };
    }

  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      message: 'An error occurred while uploading the image.',
    };
  }
};
