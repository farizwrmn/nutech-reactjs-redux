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
    const user = data?.data.user;
    dispatch(
      login({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
      }),
    );

    localStorage.setItem('token', data?.data.token);
    localStorage.setItem('user', JSON.stringify(user));

    return true;
  } catch (err) {
    toast.error(err?.response?.data?.message);
    console.log(err)
    return false;
  }
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
