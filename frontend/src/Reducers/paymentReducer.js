import { USER_PAYMENT_SAVE } from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_PAYMENT_SAVE:
      return { payment: action.payload };
    default:
      return state;
  }
};
