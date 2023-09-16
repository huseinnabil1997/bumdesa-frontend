import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  vendors: { data: [] },
  vendor: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: '',
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const slice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET VENDORS
    getVendorsSuccess(state, action) {
      state.isLoading = false;
      state.vendors = action.payload;
    },

    // GET VENDOR
    getVendorSuccess(state, action) {
      state.isLoading = false;
      state.vendor = action.payload;
    },

    // CREATE VENDOR
    createVendorSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.message;
      state.vendors = { ...state.vendors, data: [action.payload.data, ...state.vendors.data] };
    },

    // UPDATE VENDOR
    updateVendorSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.message;
    },

    // DELETE VENDOR
    deleteVendorSuccess(state, action) {
      const deleteValue = state.vendors.data.filter((item) => item.id !== action.payload.id);
      state.isLoading = false;
      state.success = action.payload.msg;
      state.vendors = { ...state.vendors, data: deleteValue };
    },

    // FLUSH MESSAGE
    resetMessage(state) {
      state.success = null;
      state.error = null;
    },

    resetVendor(state) {
      state.vendor = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  filterProducts,
} = slice.actions;

// ----------------------------------------------------------------------

export function getVendors(page, keyword) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`v1/vendor`, { params: { page, q: keyword } });
      dispatch(slice.actions.getVendorsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getVendor(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('v1/vendor/' + id);
      dispatch(slice.actions.getVendorSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createVendor(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('v1/vendor', payload);
      if (response.data.success) dispatch(slice.actions.createVendorSuccess(response.data));
      else dispatch(slice.actions.hasError(response.data.message));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateVendor(id, payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('v1/vendor/' + id, payload);
      if (response.data.success) dispatch(slice.actions.updateVendorSuccess(response.data));
      else dispatch(slice.actions.hasError(response.data.message));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteVendor(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('v1/vendor/' + id);
      if (response.data.success) dispatch(slice.actions.deleteVendorSuccess({ msg: response.data.message, id }));
      else dispatch(slice.actions.hasError(response.data.message));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetMessage() {
  return async () => dispatch(slice.actions.resetMessage());
}

export function resetVendor() {
  return async () => dispatch(slice.actions.resetVendor());
}
