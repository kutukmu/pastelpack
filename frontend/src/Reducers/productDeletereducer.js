import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODCUT_DELETE_ERROR,
} from "../Contants/productConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { deleting: true };
    case PRODUCT_DELETE_SUCCESS:
      return { deleting: false, success: true };
    case PRODCUT_DELETE_ERROR:
      return { deleting: false, success: false };
    default:
      return state;
  }
};
