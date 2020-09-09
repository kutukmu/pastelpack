import { USER_ADDRESS_SAVE } from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESS_SAVE:
      return { ...action.payload };
    default:
      return state;
  }
};
