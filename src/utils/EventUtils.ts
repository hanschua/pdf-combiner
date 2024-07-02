
const createDebounce = (fn: (event: Event) => void): (() => Function) => {
  let timer;
  return async (event: Event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(event);
    }, 500);
  };
};

export default {
  createDebounce
};
