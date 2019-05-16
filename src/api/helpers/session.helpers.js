export {
  sessionCheck,
  sessionSave,
  userHasSession,
  validateSession,
  deleteSession
}

const databaseRoles = [{'1000': 'Super User'}, {'1001': 'Admin'}, {'1002': 'User'}, {'1003': 'Moderator'}]
const  sessionSave = (session, data)  => {
  const roleName = databaseRoles.filter((role) => {
    return Object.keys(role).indexOf(data.role.toString()) > -1 
  })
  session.data = {...{role: Object.values(roleName[0])[0], username: data.username}}
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
    }
    next()
  }
}

 const validateSession = (req)  => {
   return new Promise((resolve, reject) => {
    try {
      if (userHasSession(req.session)) {
        resolve(req.session.data)
      } else {
        reject({status: 401, error: 'User Invalid Session'})
      }
     } catch (error) {
        reject ({status: 500, error: error})
     }
   })
}
const deleteSession = (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((error) => {
      console.log(error)
      if (error) {
        reject(error)
      }
      resolve('Session Deleted')
    })
  })
}