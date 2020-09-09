import { USER_ADD_CART_SUCCESS } from "../Contants/userConstants";

export default (state = { items: [] }, action) => {
  switch (action.type) {
    case USER_ADD_CART_SUCCESS:
      return { items: [...state.items, action.payload] };
    default:
      return state;
  }
};
