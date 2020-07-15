import _fetch from "./request.js";
import { getLocal } from "@/utils/local.js";
// import { Message } from "element-ui";

function getUserInfo() {
  return _fetch({
    url: "/info",
    headers: { token: getLocal() },
  });
}
function logout() {
  return _fetch({
    url: "/logout",
    // headers: {
    //   token: getLocal(),
    // },
  });
}

export { getUserInfo, logout };
