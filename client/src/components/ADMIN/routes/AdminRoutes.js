import eventRoutes from "../Events/eventRoutes";
import blogRoutes from "../Blogs/blogRoutes";
import projectRoutes from "../Projects/projectRoutes";
import homeRoutes from "../Home/homeRoutes";
import feedbackRoutes from "../Feedback/feedbackRoutes";
import careerRoutes from "../Career/careerRoutes";
const routes = [
  ...eventRoutes,
  ...blogRoutes,
  ...projectRoutes,
  ...homeRoutes,
  ...feedbackRoutes,
  ...careerRoutes,
];
export default routes;
