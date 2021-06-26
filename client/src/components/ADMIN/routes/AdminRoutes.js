import eventRoutes from "../Events/eventRoutes";
import blogRoutes from "../Blogs/blogRoutes";
import projectRoutes from "../Projects/projectRoutes";
import homeRoutes from "../Home/homeRoutes";
const routes = [...eventRoutes, ...blogRoutes, ...projectRoutes, ...homeRoutes];
export default routes;
