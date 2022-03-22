export const isInviewPort = (id: string) => {
  const title = document.getElementById(id);
  const rect = title?.getBoundingClientRect();
  const isVisible = !!(
    rect &&
    rect?.top >= 0 &&
    rect?.left >= 0 &&
    rect?.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect?.right <= (window.innerWidth || document.documentElement.clientWidth)
  );

  return isVisible;
};
