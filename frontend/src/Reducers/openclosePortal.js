export default (state = { isOpen: false }, action) => {
  switch (action.type) {
    case "CLOSE_PORTAL":
      return { isOpen: action.payload };
    case "OPEN_PORTAL":
      return { isOpen: action.payload };
    default:
      return state;
  }
};
