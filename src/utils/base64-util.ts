const Base64Util = {
  encodedString(str: string) {
    return btoa(str);
  },
  decodedString(str: string) {
    return atob(str);
  },
};

export default Base64Util;
