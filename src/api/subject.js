import _fetch from "./request.js";

function getSubjectList(params) {
  return _fetch({
    url: "/subject/list",
    params,
  });
}

function setSubjectStatus(data) {
  return _fetch({
    url: "/subject/status",
    method: "post",
    data,
  });
}

function addSubject(data) {
  return _fetch({
    url: "/subject/add",
    method: "post",
    data,
  });
}

function editSubject(data) {
  return _fetch({
    url: "/subject/edit",
    method: "post",
    data,
  });
}

function delSubject(data) {
  return _fetch({
    url: "/subject/remove",
    method: "post",
    data,
  });
}
export {
  getSubjectList,
  setSubjectStatus,
  addSubject,
  editSubject,
  delSubject,
};
