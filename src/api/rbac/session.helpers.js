export const sessionHelpers = {
  sessionCheck,
  sessionSave,
  userHasSession
}
const databaseRoles = [{'1000': 'Super User'}, {'1001': 'Admin'}, {'1002': 'User'}, {'1003': 'Moderator'}]
function sessionSave (session, data) {
  session.data = data
}
function userHasSession (req) {
  return req.session.user && req.cookies.user_sid
}
function sessionCheck (access = []) {
  return (req, res, next) => {
    if (req.session.data && req.cookies.data_sid) {
      let flag = access.indexOf(databaseRoles.find((value) => {
        return parseInt(Object.keys(value)) === req.session.data.role
      }).values())
      console.log(flag)
    } else {
      console.log(req.session, req.cookies)
    }
    next()
  }
}