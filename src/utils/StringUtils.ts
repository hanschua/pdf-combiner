
function middleEllipsis(str: String) {
  if (str.length <= 35) {
    return str;
  }
  return str.substr(0, 20) + '...' + str.substr(str.length - 10);
}

export default {
  middleEllipsis
};
