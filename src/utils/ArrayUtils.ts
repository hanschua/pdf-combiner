
function createArray(start: Integer, end: Integer) {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}

export default {
  createArray
};
