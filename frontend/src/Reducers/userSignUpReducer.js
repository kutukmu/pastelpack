import {
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_REGISTER_ERROR:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
