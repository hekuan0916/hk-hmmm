import _fetch from './request.js'
function getQuestionList (params) {
  return _fetch({
    url: '/question/list',
    params
  })
}
export { getQuestionList }
