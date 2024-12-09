import instance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export const topUpSaldo = async (amount) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }

    const requestBody = {
      top_up_amount: amount,
      transaction_type: 'TOPUP'
    };

    const response = await instance.post('/topup', requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.status === 0) {
      return response.data?.data;
    }

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw new Error(`Failed to top up: ${error}`);
  }
};

export const postTransaction = async (serviceCode) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }

    const requestBody = {
      service_code: serviceCode,
      transaction_type: 'PAYMENT'
    };

    const response = await instance.post('/transaction', requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.status === 0) {
      return response.data?.data;
    }

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw new Error(`Failed to pay: ${error.response}`);
  }
};