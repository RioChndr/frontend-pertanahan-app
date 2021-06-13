import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Misc
import miscRoutes from './misc';

// Auth
import authRoutes from './auth';

// Request
import requestRoutes from './request';

// Settings
import settingsRoutes from './setting';

// History
import historyRoutes from './history';

// Delivery
import deliveryRoutes from './delivery';

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      ...miscRoutes,
      ...requestRoutes,
      ...settingsRoutes,
      ...historyRoutes,
      ...deliveryRoutes
    ]
  },
  ...authRoutes,
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
    function view(name) {
      var res= require('../components/Dashboard/Views/' + name + '.vue');
      return res;
    };
**/

export default routes;
