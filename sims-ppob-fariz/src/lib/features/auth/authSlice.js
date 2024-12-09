import { createSlice } from '@reduxjs/toolkit';
import instance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
    image: '',
  }, status: {
    isLogin: false
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login (state, action) {
      state.user = action.payload;
      state.status.isLogin = true;
    },
    logout (state) {
      state.user = initialState.user;
      state.status = initialState.status;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const signIn = ({ email, password }) => async (dispatch) => {
  if (!email || !password) {
    console.error('Email and password are required');
    return false;
  }
  try {
    const { data } = await instance.post('/login', {
      email,
      password,
    });

    localStorage.setItem('token', data?.data.token);

    return { success: true, message: 'Login successful' };
  } catch (err) {
    const errorMessage = err?.response?.data?.message || 'An error occurred';
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
