export {
  sessionCheck,
  sessionSave,
  userHasSession,
  validateSession
}
const databaseRoles = [{'1000': 'Super User'}, {'1001': 'Admin'}, {'1002': 'User'}, {'1003': 'Moderator'}]
const  sessionSave = (session, data)  => {
  session.data = data
}
const  userHasSession = (session)  => {
  return session.cookie && session.data
}
 const sessionCheck = (access = [])  => {
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

 const validateSession = async (req)  => {
   try {
    if (userHasSession(req.session)) {
      return req.session.user
    } else {
      throw ({status: 401, error: 'User Invalid Session'})
    }
   } catch (error) {
      throw ({status: 500, error: error})
   }

}