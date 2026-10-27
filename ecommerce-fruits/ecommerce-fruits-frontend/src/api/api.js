import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signIn`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// upload category
export const uploadCategory = async (data, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/category`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// get all category
export const getAllCategory = async (token) => {
  try {
    debugger;
    const res = await axios.get(`${BASE_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// upload product
export const uploadProduct = async (data, token) => {
  try {
    debugger;
    console.log(data);
    const res = await axios.post(`${BASE_URL}/products`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    // console.error("Price update error:", error);
    throw error;
  }
};

// get all product
export const getAllProduct = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    // console.error("Price update error:", error);
    throw error;
  }
};

// get all orders
export const getAllOrders = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    // console.error("Price update error:", error);
    throw error;
  }
};

// update order status
export const updateOrderStatus = async (token, data) => {
  try {
    const res = await axios.get(`${BASE_URL}/orders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    // console.error("Price update error:", error);
    throw error;
  }
};
