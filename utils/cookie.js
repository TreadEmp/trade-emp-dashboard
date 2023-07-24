import cookie from "js-cookie";

// set Token
export const setToken =  (key, data) => {
  localStorage.setItem('accessToken', value)
  // return cookie.set(key, data, { expires: 1 });
};

// remove Token
export const removeToken =  () => {
  cookie.remove("token");
};

// get Token
export const getToken =  (key) => {
  const data = cookie.get(key);

  return data;
};

//get Token Value
export const getTokenValue =  (key, data) => {
  const name = key + "=";
  const cDecoded = decodeURIComponent(data);
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
};
