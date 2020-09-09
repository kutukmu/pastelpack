import {
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_ERROR,
} from "../Contants/productConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { loading: true };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ADD_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
