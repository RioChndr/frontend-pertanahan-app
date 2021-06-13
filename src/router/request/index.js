// Document Pages
const DocumentLayout = () => import(/* webpackChunkName: "request" */ "@/pages/Documents/DocumentLayout");
const DocumentCreate = () => import(/* webpackChunkName: "request" */ "@/pages/Documents/DocumentCreate");
const DocumenList = () => import(/* webpackChunkName: "request" */ "@/pages/Documents/DocumentList");
const DocumentUploadFile = () => import(/* webpackChunkName: "request" */ "@/pages/Documents/DocumentUploadFile");
const DocumentPickup = () => import(/* webpackChunkName: "request" */ "@/pages/Documents/DocumentPickUp");

export default [{
  path: "request",
  name: "request",
  component: DocumentLayout,
  redirect: "request/list",
  children: [
    { path: "list", name: "list", component: DocumenList },
    { path: "create", name: "create", component: DocumentCreate },
    {
      path: "upload-file/:id",
      name: "upload-file",
      component: DocumentUploadFile
    }, {
      path: 'pickup',
      name: 'request.pickup',
      component: DocumentPickup
    }
  ]
}]