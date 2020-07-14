import _fetch from "./request.js";
function getRcode(data) {
  return _fetch({
    url: "/sendsms",
    data,
    method: "post",
  });
}

function registerUser(data) {
  return _fetch({
    url: "/register",
    data,
    method: "post",
  });
}

function toLogin(data) {
  return _fetch({
    url: "/login",
    data,
    method: "post",
  });
}
export { getRcode, registerUser, toLogin };
