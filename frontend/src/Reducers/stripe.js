import {
  USER_STRIPE_SUCCESS,
  USER_STRIPE_REQUEST,
  USER_STRIPE_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_STRIPE_REQUEST:
      return { loading: true };
    case USER_STRIPE_SUCCESS:
      return { loading: false, status: action.payload };
    case USER_STRIPE_ERROR:
      return { loading: false, status: action.payload };
    default:
      return state;
  }
};
