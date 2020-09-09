import {
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_ERROR,
} from "../Contants/productConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_REVIEW_ERROR:
      return { loading: false, success: false };
    default:
      return state;
  }
};
