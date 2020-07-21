import _fetch from "./request.js";

function getBusinessList(params) {
  return _fetch({
    url: "/enterprise/list",
    params,
  });
}

function setBusinessStatus(data) {
  return _fetch({
    url: "/enterprise/status",
    method: "post",
    data,
  });
}

function delBusiness(data) {
  return _fetch({
    url: "/enterprise/remove",
    method: "post",
    data,
  });
}

function addBusiness(data) {
  return _fetch({
    url: "/enterprise/add",
    method: "post",
    data,
  });
}

function editBusiness(data) {
  return _fetch({
    url: "/enterprise/edit",
    method: "post",
    data,
  });
}

export {
  getBusinessList,
  setBusinessStatus,
  delBusiness,
  addBusiness,
  editBusiness,
};
