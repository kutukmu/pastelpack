import {
  USER_ITEM_NUMBER_REQUEST,
  USER_ITEM_NUMBER_SUCCESS,
  USER_ITEM_NUMBER_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_ITEM_NUMBER_REQUEST:
      return { loading: true };
    case USER_ITEM_NUMBER_SUCCESS:
      return { loading: false, items: action.payload };
    case USER_ITEM_NUMBER_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
