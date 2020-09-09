import {
  USER_ORDERS_UPDATE_REQUEST,
  USER_ORDERS_UPDATE_SUCCESS,
  USER_ORDERS_UPDATE_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_ORDERS_UPDATE_REQUEST:
      return { loading: true };
    case USER_ORDERS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_ORDERS_UPDATE_ERROR:
      return { loading: false, success: false };
    default:
      return state;
  }
};
