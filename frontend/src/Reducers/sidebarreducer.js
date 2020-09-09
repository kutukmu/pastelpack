export default (state = { isOpen: false }, action) => {
  switch (action.type) {
    case "CLOSE_SIDEBAR":
      return { isOpen: action.payload };
    case "OPEN_SIDEBAR":
      return { isOpen: action.payload };
    default:
      return state;
  }
};
