const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.account.token,
  id: state => state.account.id,
  name: state => state.account.name,
  roles: state => state.account.roles,
  permission_routes: state => state.permission.routes,
  search: state => state.header.search,
  create: state => state.header.create,
  errorLogs: state => state.errorLog.logs
}
export default getters
