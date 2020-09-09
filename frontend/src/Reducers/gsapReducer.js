export default (state = {}, action) => {
  switch (action.type) {
    case "GSAP_STARTED":
      return { isHere: true };
    default:
      return state;
  }
};
