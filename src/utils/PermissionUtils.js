import _ from 'lodash'

const GRANT_PERMISSION = true
const DENY_PERMISSION = false
const PERMISSION_SUBJECT = ['CREATE', 'READ', 'UPDATE', 'DELETE']
const ALL_PATH = '*'

const API_METHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete'
}

const API_ALWAYS_GRANTED = []
/*********************************************PERMISSION FROM SERVER**************************************/
const getAllPathItem = () => {
  //   const permissions = AdminProfileManager.getAdminPermission();
  const permissions = []
  if (!permissions || permissions.length === 0) return null
  const allPathItem = permissions.find((item) => item.path === ALL_PATH)
  return allPathItem
}

const checkAllPathPermission = (method) => {
  const allPathItem = getAllPathItem()
  return checkMethodIsGranted(allPathItem.method, method)
}

const checkMethodIsGranted = (methodList, method) => {
  if (methodList.length === 0) {
    // console.log("Permission is granted for all")
    return GRANT_PERMISSION
  }
  // console.log("Permission is granted for some method")
  return methodList.includes(method.toUpperCase())
}

const findUrlItemPermissions = (url) => {
  //   const permissions = AdminProfileManager.getAdminPermission();
  const permissions = []
  if (!permissions || permissions.length === 0) {
    // console.log("This user has all permission", url)
    return DENY_PERMISSION
  } else {
  }
  return permissions.filter((item) => {
    const pathRegex = item.path.split('/').join('\\/')
    const regex = new RegExp(pathRegex)
    const m = regex.exec('/' + url)
    // console.log("pathRegex", m, pathRegex, url)
    return !!m
  })
}

const isGrantURLPermission = (url, method = API_METHOD.POST) => {
  if (API_ALWAYS_GRANTED.includes(url)) {
    // console.log("This is url public", url)
    return GRANT_PERMISSION
  }
  if (!!getAllPathItem()) {
    // console.log("Permission follow all paths")
    return checkAllPathPermission()
  }

  //   const permissions = AdminProfileManager.getAdminPermission();
  const permissions = []

  if (!permissions || permissions.length === 0) {
    return DENY_PERMISSION
  }
  const permissionUrls = findUrlItemPermissions(url)

  if (!permissionUrls || permissionUrls.length === 0) {
    return DENY_PERMISSION
  }
  return _.some(permissionUrls, (permissionUrl) =>
    checkMethodIsGranted(permissionUrl.method, method)
  )
  // return checkMethodIsGranted(permissionUrl.method, method)
}

export default {
  isGrantURLPermission
}
