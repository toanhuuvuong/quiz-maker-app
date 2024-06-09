const Base64Util = { encodedString, decodedString };

function encodedString(str: string) {
  return btoa(str);
}

function decodedString(str: string) {
  return atob(str);
}

export default Base64Util;
