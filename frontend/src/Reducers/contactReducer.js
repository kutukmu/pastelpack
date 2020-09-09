import {
  USER_CONTACT_FORM_REQUEST,
  USER_CONTACT_FORM_SUCCESS,
  USER_CONTACT_FORM_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_CONTACT_FORM_REQUEST:
      return { loading: true };
    case USER_CONTACT_FORM_SUCCESS:
      return { loading: false, status: action.payload };
    case USER_CONTACT_FORM_ERROR:
      return { loading: false, status: action.payload };
    default:
      return state;
  }
};
