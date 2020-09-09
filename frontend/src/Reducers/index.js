import { combineReducers } from "redux";
import signUpUser from "./userSignUpReducer";
import signInUser from "./userSignInReducer";
import addProduct from "./addedProductreducer";
import ProductList from "./ProductListreducer";
import ProductDelete from "./productDeletereducer";
import ProductDetail from "./ProductDetailReducer";
import cartItems from "./addToCartReducer";
import cartNumber from "./getCartItemsReducer";
import removeItem from "./cartItemremove";
import qtyIncrease from "./qtyIncrease";
import addressreducer from "./addressreducer";
import paymentreducer from "./paymentReducer";
import orderreducer from "./orderReducer";
import orderdetails from "./orderdetailreducer";
import stripe from "./stripe";
import userOrders from "./finduserorders";
import allorders from "./allordersreducers";
import orderUpdate from "./orderupdate";
import featuredProduct from "./findfeatured";
import portal from "./openclosePortal";
import addreview from "./addReviewreducer";
import contact from "./contactReducer";
import sidebar from "./sidebarreducer";
import gsapReducer from "./gsapReducer";

export default combineReducers({
  signUpUser: signUpUser,
  signInUser: signInUser,
  newProduct: addProduct,
  productList: ProductList,
  productDelete: ProductDelete,
  productDetail: ProductDetail,
  cartItems: cartItems,
  cartNumber: cartNumber,
  isDeleted: removeItem,
  qtyIncrease: qtyIncrease,
  userAddress: addressreducer,
  payment: paymentreducer,
  order: orderreducer,
  orderDetails: orderdetails,
  stripe: stripe,
  userOrders: userOrders,
  allorders: allorders,
  orderUpdate: orderUpdate,
  featuredProduct: featuredProduct,
  portal: portal,
  addreview: addreview,
  contact: contact,
  sidebar: sidebar,
  gsapAnimation: gsapReducer,
});
