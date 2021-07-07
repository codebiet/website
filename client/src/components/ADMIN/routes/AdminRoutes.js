import eventRoutes from "../Events/eventRoutes";
import blogRoutes from "../Blogs/blogRoutes";
import projectRoutes from "../Projects/projectRoutes";
import homeRoutes from "../Home/homeRoutes";
import feedbackRoutes from "../Feedback/feedbackRoutes";
const routes = [
  ...eventRoutes,
  ...blogRoutes,
  ...projectRoutes,
  ...homeRoutes,
  ...feedbackRoutes
];
export default routes;
