import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
} from "../Contants/productConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, list: action.payload };
    case PRODUCT_LIST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
