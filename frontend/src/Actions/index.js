import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_ADD_CART_REQUEST,
  USER_ADD_CART_SUCCESS,
  USER_ADD_CART_ERROR,
  USER_ITEM_NUMBER_REQUEST,
  USER_ITEM_NUMBER_SUCCESS,
  USER_ITEM_NUMBER_ERROR,
  USER_REMOVE_CART_REQUEST,
  USER_REMOVE_CART_SUCCESS,
  USER_REMOVE_CART_ERROR,
  USER_ITEM_QTY_REQUEST,
  USER_ITEM_QTY_SUCCESS,
  USER_ITEM_QTY_ERROR,
  USER_ADDRESS_SAVE,
  USER_PAYMENT_SAVE,
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_ERROR,
  USER_ORDER_DETAIL_REQUEST,
  USER_ORDER_DETAIL_SUCCESS,
  USER_ORDER_DETAIL_ERROR,
  USER_STRIPE_REQUEST,
  USER_STRIPE_SUCCESS,
  USER_STRIPE_ERROR,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_ERROR,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_ERROR,
  USER_ORDERS_UPDATE_REQUEST,
  USER_ORDERS_UPDATE_SUCCESS,
  USER_ORDERS_UPDATE_ERROR,
  USER_CONTACT_FORM_REQUEST,
  USER_CONTACT_FORM_SUCCESS,
  USER_CONTACT_FORM_ERROR,
  USER_LOGOUT,
} from "../Contants/userConstants";

import {
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_ERROR,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODCUT_DELETE_ERROR,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_ERROR,
  PRODCUT_EDIT_REQUEST,
  PRODCUT_EDIT_SUCCESS,
  PRODCUT_EDIT_ERROR,
  FIND_FEATURED_PRODUCT_REQUEST,
  FIND_FEATURED_PRODUCT_SUCCESS,
  FIND_FEATURED_PRODUCT_ERROR,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_ERROR,
} from "../Contants/productConstants";

import Cookie from "js-cookie";

import history from "../history";

//User Actions
const userSignUpAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post("/api/user/signup", user);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_ERROR,
      payload: error.message,
    });
  }
};
const logOutAction = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
  history.push("/");
};

const signInAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });

    const { data } = await axios.post("/api/user/signin", user);

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.user });
    Cookie.set("userInfo", JSON.stringify(data.user));
    history.push("/");
  } catch (error) {
    const { data } = error.response;
    dispatch({ type: USER_SIGNIN_ERROR, payload: data.message });
  }
};

//User Actions
//gsap Animation
const gsapAction = () => (dispatch) => {
  dispatch({ type: "GSAP_STARTED" });
  Cookie.set("gsapAnimation", { isHere: true });
};
//gsap Animation
//Product Actions

const addProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADD_REQUEST });
    const { signInUser } = getState();
    const { data } = await axios.post("/api/product", product, {
      headers: {
        Authorization: "barear " + signInUser.token,
      },
    });
    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: PRODUCT_ADD_ERROR, payload: error.message });
  }
};

const getProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/product");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.list });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message });
  }
};

const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const { signInUser } = getState();
    await axios.delete(`/api/product/${id}`, {
      headers: {
        Authorization: "barear " + signInUser.token,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: PRODCUT_DELETE_ERROR, payload: error.message });
  }
};

const getProductDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_ERROR, payload: error.message });
  }
};

const editProductAction = (product, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODCUT_EDIT_REQUEST });
    const { signInUser } = getState();
    const { data } = await axios.put(`/api/product/${id}`, product, {
      headers: {
        Authorization: "barear " + signInUser.token,
      },
    });

    dispatch({ type: PRODCUT_EDIT_SUCCESS, payload: data });
    history.push("/editproducts");
  } catch (error) {
    dispatch({ type: PRODCUT_EDIT_ERROR, payload: error.message });
  }
};

//Product Actions

// Add to cart

const addToCartAction = (productid) => async (dispatch, ownState) => {
  const userid = ownState().signInUser._id;
  const { signInUser } = ownState();
  try {
    dispatch({ type: USER_ADD_CART_REQUEST });

    const { data } = await axios.post(
      `/api/user/${userid}/cart`,
      {
        productid,
      },
      {
        headers: {
          Authorization: "barear " + signInUser.token,
        },
      }
    );

    dispatch({ type: USER_ADD_CART_SUCCESS, payload: data.item });
  } catch (error) {
    dispatch({ type: USER_ADD_CART_ERROR, payload: error.message });
  }
};

const getNumberOfItem = (userid) => async (dispatch, getState) => {
  const { signInUser } = getState();
  try {
    dispatch({ type: USER_ITEM_NUMBER_REQUEST });

    const { data } = await axios.get(`/api/user/${userid}/cart`, {
      headers: {
        Authorization: "barear " + signInUser.token,
      },
    });

    dispatch({
      type: USER_ITEM_NUMBER_SUCCESS,
      payload: data.foundItems,
    });
  } catch (error) {
    dispatch({ type: USER_ITEM_NUMBER_ERROR, message: error.message });
  }
};

// Add to cart

// Remove from cart

const removeItemAction = (userid, itemid) => async (dispatch, getState) => {
  const { signInUser } = getState();
  try {
    dispatch({ type: USER_REMOVE_CART_REQUEST });

    await axios.delete(`/api/user/${userid}/cart/${itemid}`, {
      headers: {
        Authorization: "barear " + signInUser.token,
      },
    });
    dispatch({ type: USER_REMOVE_CART_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_REMOVE_CART_ERROR });
  }
};

// Remove from cart
// Increase qty

const increaseQtyAction = (userid, itemid, val) => async (
  dispatch,
  getState
) => {
  const { signInUser } = getState();
  try {
    dispatch({ type: USER_ITEM_QTY_REQUEST });

    await axios.put(
      `/api/user/${userid}/cart/${itemid}`,
      {
        val,
      },
      {
        headers: {
          Authorization: "barear " + signInUser.token,
        },
      }
    );

    dispatch({ type: USER_ITEM_QTY_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_ITEM_QTY_ERROR });
  }
};

// Increase qty
// descrease qty

const decreaseQtyAction = (userid, itemid, val) => async (
  dispatch,
  getState
) => {
  const { signInUser } = getState();
  try {
    dispatch({ type: USER_ITEM_QTY_REQUEST });

    await axios.put(
      `/api/user/${userid}/cart/${itemid}`,
      {
        val,
      },
      {
        headers: {
          Authorization: "barear " + signInUser.token,
        },
      }
    );

    dispatch({ type: USER_ITEM_QTY_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_ITEM_QTY_ERROR });
  }
};
// decrease qty

//Change size

const changeSizeAction = (userid, itemid, val) => async (
  dispatch,
  getState
) => {
  const { signInUser } = getState();
  try {
    dispatch({ type: USER_ITEM_QTY_REQUEST });

    await axios.put(
      `/api/user/${userid}/cart/${itemid}/size`,
      {
        val,
      },
      {
        headers: {
          Authorization: "barear " + signInUser.token,
        },
      }
    );

    dispatch({ type: USER_ITEM_QTY_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_ITEM_QTY_ERROR });
  }
};

//Change size

//ADRESS sAVE

const addressSaveAction = (data) => (dispatch) => {
  dispatch({ type: USER_ADDRESS_SAVE, payload: data });
  Cookie.set("userAddress", JSON.stringify(data));
  history.push("/payment");
};

//ADRESS sAVE
//PAYMENT sAVE

const paymentSaveAction = (data) => (dispatch) => {
  dispatch({ type: USER_PAYMENT_SAVE, payload: data });
  Cookie.set("payment", JSON.stringify(data));
  history.push("/placeorder");
};

//PAYMENT sAVE
//ORDER CREATE

const orderAction = (
  userid,
  shipping,
  subtotal,
  taxFee,
  shippingfee,
  total,
  orderitems
) => async (dispatch) => {
  try {
    dispatch({ type: USER_ORDER_REQUEST });
    const {
      data: { order },
    } = await axios.post("/api/order", {
      userid,
      shipping,
      subtotal,
      taxFee,
      shippingfee,
      total,
      orderitems,
    });
    dispatch({ type: USER_ORDER_SUCCESS, payload: order });
    history.push(`order/${order._id}`);
  } catch (error) {
    dispatch({ type: USER_ORDER_ERROR, payload: error.message });
  }
};
//ORDER CREATE

//GET ORDER

const getOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_ORDER_DETAIL_REQUEST });
    const {
      data: { order },
    } = await axios.get(`/api/order/${id}`);

    dispatch({ type: USER_ORDER_DETAIL_SUCCESS, payload: order });
  } catch (error) {
    dispatch({ type: USER_ORDER_DETAIL_ERROR, payload: error.message });
  }
};

//GET ORDER

// STRIPE ACTION

const stripeAction = (orderid, userid, token, items) => async (dispatch) => {
  try {
    dispatch({ type: USER_STRIPE_REQUEST });
    const { data } = await axios.post("/api/stripe/charge", {
      token,
      items,
    });

    if (data) {
       await axios.patch(`/api/order/${orderid}`, {
        isPaid: true,
      });
    }

    dispatch({ type: USER_STRIPE_SUCCESS, payload: data.status });
    history.push(`/profile/${userid}`);
  } catch (error) {
    dispatch({ type: USER_STRIPE_ERROR, payload: "failure" });
  }
};

// STRIPE ACTION
//get customer orders

const getUserOrders = (userid) => async (dispatch) => {
  try {
    dispatch({ type: USER_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/orders/${userid}`);

    dispatch({ type: USER_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: USER_ORDERS_ERROR, payload: error.message });
  }
};

//get customer orders
//gET ALL ORDERS
const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/orders/`);

    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: GET_ALL_ORDERS_ERROR, payload: error.message });
  }
};

//gET ALL ORDERS
//uPDATE ORDER

const updateOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_ORDERS_UPDATE_REQUEST });

    await axios.patch(`/api/order/${id}`, {
      isDelivered: true,
    });

    dispatch({ type: USER_ORDERS_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_ORDERS_UPDATE_ERROR });
  }
};

//uPDATE ORDER
//Find Featured Product

const FeaturedProductAction = () => async (dispatch) => {
  try {
    dispatch({ type: FIND_FEATURED_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/product/featured`);

    dispatch({ type: FIND_FEATURED_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: FIND_FEATURED_PRODUCT_ERROR, payload: error.message });
  }
};

//Find Featured Product

//Add Review

const addReviewAction = (id, name, rating, comment, createdAt) => async (
  dispatch,
  getState
) => {
  try {
    const { signInUser } = getState();
    dispatch({ type: PRODUCT_REVIEW_REQUEST });

    const { data } = axios.put(
      `/api/product/${id}/review`,
      {
        name,
        rating,
        comment,
        createdAt,
      },
      {
        headers: {
          Authorization: "barear " + signInUser.token,
        },
      }
    );

    dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEW_ERROR, payload: error.message });
  }
};

//Add Review

//Close Portal

const closePortal = () => (dispatch) => {
  dispatch({ type: "CLOSE_PORTAL", payload: false });
};

//Close Portal
//Open Portal

const openPortal = () => (dispatch) => {
  dispatch({ type: "OPEN_PORTAL", payload: true });
};
//Open Portal

//COntact form

const sendMailAction = (name, email, message) => async (dispatch) => {
  try {
    dispatch({ type: USER_CONTACT_FORM_REQUEST });

    const { data } = await axios.post("/api/contact/send", {
      name,
      email,
      message,
    });
    dispatch({ type: USER_CONTACT_FORM_SUCCESS, payload: data.status });
  } catch (error) {
    dispatch({ type: USER_CONTACT_FORM_ERROR, payload: "fail" });
  }
};

//COntact form

//sidebar

const closeBarAction = () => (dispatch) => {
  dispatch({ type: "CLOSE_SIDEBAR", payload: false });
};

const openBarAction = () => (dispatch) => {
  dispatch({ type: "OPEN_SIDEBAR", payload: true });
};

//sidebar

export {
  userSignUpAction,
  signInAction,
  addProductAction,
  getProductsAction,
  deleteProductAction,
  getProductDetailsAction,
  editProductAction,
  addToCartAction,
  getNumberOfItem,
  removeItemAction,
  increaseQtyAction,
  decreaseQtyAction,
  changeSizeAction,
  addressSaveAction,
  paymentSaveAction,
  orderAction,
  getOrderAction,
  stripeAction,
  getUserOrders,
  getAllOrders,
  updateOrderAction,
  FeaturedProductAction,
  addReviewAction,
  openPortal,
  closePortal,
  sendMailAction,
  logOutAction,
  closeBarAction,
  openBarAction,
  gsapAction,
};
