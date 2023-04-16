export const stopEvent = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};

export const lockScroll = () => {
  document.body.classList.add("lockScroll");
};

export const unlockScroll = () => {
  document.body.classList.remove("lockScroll");
};
