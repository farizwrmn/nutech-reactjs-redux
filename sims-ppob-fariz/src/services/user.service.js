import instance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }
    const response = await instance.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.status === 0) {
      return response.data?.data;
    }

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw new Error(`Failed to fetch user details: ${error}`);
  }
};

export const getUserBalance = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }
    const response = await instance.get('/balance', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.status === 0) {
      return response.data?.data;
    }

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw new Error(`Failed get user balance: ${error}`);
  }
};

export const getServices = async () => {
  try {

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }

      const response = await instance.get('/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === 0) {
        return response.data?.data;
      }
    }

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw new Error(`Failed to fetch services: ${error}`);
  }
};

export const getSlideBanner = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }
    const response = await instance.get('/banner', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.status === 0) {
      return response.data?.data;
    }

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw new Error(`Failed to fetch slide banner: ${error}`);
  }
};

export const getAllTransactions = async (offset = 0, limit = 5) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }
    const response = await instance.get('/transaction/history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { offset, limit },
    });

    if (response?.data?.status === 0) {
      return response.data?.data;
    }

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw new Error(`Failed to fetch slide banner: ${error}`);
  }
};

