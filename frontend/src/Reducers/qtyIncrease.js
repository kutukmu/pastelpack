import {
  USER_ITEM_QTY_REQUEST,
  USER_ITEM_QTY_SUCCESS,
  USER_ITEM_QTY_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_ITEM_QTY_REQUEST:
      return { loading: true };
    case USER_ITEM_QTY_SUCCESS:
      return { loading: false, success: true };
    case USER_ITEM_QTY_ERROR:
      return { loading: false, success: false };
    default:
      return state;
  }
};
