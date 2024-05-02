import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axiosUnregistered';
import { isValidToken, setSession } from '../utils/jwt';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isError: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  registerForm: () => Promise.resolve(),
  resendOtp: () => Promise.resolve(),
  verify: () => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  createPassword: () => Promise.resolve(),
  changePassword: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('token');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          // const response = await axios.get('/api/account/my-account');
          // const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/signin', {
      email,
      password,
    });

    return response.data;
  };

  const register = async (payload) => {
    const response = await axios.post('/signup-account', payload);

    return response.data;
  };

  const registerForm = async ({ payload, step }) => {
    const response = await axios.post(`/signup-form/${step}`, payload);

    return response.data;
  };

  const verify = async (payload) => {
    const response = await axios.post('/signup-verify', payload);

    return response.data;
  };

  const verifyEmail = async (payload) => {
    const response = await axios.post('/business-units/email-verify', payload);

    return response.data;
  };

  const resendOtp = async (payload) => {
    const response = await axios.post('/resend-otp', payload);

    return response.data;
  };

  const resetPassword = async (payload) => {
    const response = await axios.post('/reset-password', payload);

    return response.data;
  };

  const createPassword = async (payload, token) => {
    const response = await axios.post('/change-password', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  };

  const changePassword = async (payload) => {
    const response = await axios.post('/force-change-password', payload);

    return response.data;
  };

  const logout = async () => {
    const response = await axiosInstance.post('/signout');
    setSession(null);

    return response.data;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resendOtp,
        verify,
        verifyEmail,
        registerForm,
        resetPassword,
        changePassword,
        createPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
