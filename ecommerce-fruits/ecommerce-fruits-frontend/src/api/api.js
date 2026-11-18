import axios from "axios";
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const IMAGE_BASE_URL = "http://localhost:8080";
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

// update category
export const updateCategory = async (editingId, token, newCategory) => {
  try {
    debugger;
    const res = await axios.put(
      `${BASE_URL}/category/${editingId}`,
      newCategory,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
// get product by ID
export const getProductById = async (token, productID) => {
  try {
    const res = await axios.get(`${BASE_URL}/products/${productID}`, {
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

// edit the product
// products/{id}
export const editProduct = async (token, productID, data) => {
  debugger;
  try {
    const res = await axios.put(`${BASE_URL}/products/${productID}`, data, {
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

// get all users

export const getAllUsers = async (token) => {
  debugger;
  try {
    const res = await axios.get(`${BASE_URL}/users`, {
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

// get all orders
export const getAllOrders = async (token) => {
  debugger;
  try {
    const res = await axios.get(`${BASE_URL}/orders`, {
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

// update order status
export const updateOrderStatus = async (token, id, status) => {
  debugger;
  try {
    const res = await axios.put(`${BASE_URL}/orders/${id}/status`, null, {
      params: {
        status: status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("UPdate error :", error);
    throw error;
  }
};

// add to cart

export const addedToCart = async (token, data) => {
  debugger;
  try {
    const res = await axios.post(`${BASE_URL}/cart/add-cart`, data, {
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

// get user cart
export const getUserCart = async (token, id) => {
  try {
    const res = await axios.get(`${BASE_URL}/cart/user/${id}`, {
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

// about order
export const placeOrder = async (token, userID, data) => {
  debugger;
  try {
    const res = await axios.post(
      `${BASE_URL}/orders/checkout/${userID}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(res.data);
    return res.data;
  } catch (error) {
    // console.error("Price update error:", error);
    throw error;
  }
};

// get all dashboard data

export const getDashboardData = async (token) => {
  debugger;
  try {
    const res = await axios.get(`${BASE_URL}/dashboard`, {
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
