export const getContainerWidth = () => {
  let containerWidth = document.querySelector(".container").clientWidth;
  // let width = window.innerWidth > 700 ? containerWidth : window.innerWidth - 50;
  return containerWidth;
};
