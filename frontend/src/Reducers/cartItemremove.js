import {
  USER_REMOVE_CART_REQUEST,
  USER_REMOVE_CART_SUCCESS,
  USER_REMOVE_CART_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_REMOVE_CART_REQUEST:
      return { deleted: false };
    case USER_REMOVE_CART_SUCCESS:
      return { deleted: true };
    case USER_REMOVE_CART_ERROR:
      return { deleted: false };
    default:
      return state;
  }
};
