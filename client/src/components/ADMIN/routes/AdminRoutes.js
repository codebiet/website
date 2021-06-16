import eventRoutes from "../Events/eventRoutes";
import blogRoutes from "../Blogs/blogRoutes";
const routes = [...eventRoutes, ...blogRoutes];
export default routes;
