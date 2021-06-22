import eventRoutes from "../Events/eventRoutes";
import blogRoutes from "../Blogs/blogRoutes";
import projectRoutes from "../Projects/projectRoutes";
const routes = [...eventRoutes, ...blogRoutes, ...projectRoutes];
export default routes;
