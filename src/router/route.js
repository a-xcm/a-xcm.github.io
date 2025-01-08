const files = import.meta.glob('../views/*.vue')
const routes = []
for (const path in files) {
  const name = path.split('/').pop().replace('.vue', '')
  routes.push({
    path: '/' + name,
    name: name,
    component: files[path]
  })
}
export default routes