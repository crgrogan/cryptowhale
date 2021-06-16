export const getWindowWidth = () => {
  let width = window.innerWidth > 700 ? 700 : window.innerWidth - 50;
  return width;
};
