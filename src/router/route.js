const files = import.meta.glob('../views/*.vue')
const routes = []
for (const path in files) {
  const name = path.split('/').pop().replace('.vue', '')
  // 排除 not found
  if (name === 'NotFound') continue
  // 排除 homeView
  if (name === 'HomeView') continue
  routes.push({
    path: '/' + name,
    name: name,
    component: files[path]
  })
}
export default routes