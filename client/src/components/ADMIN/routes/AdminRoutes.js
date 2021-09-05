import eventRoutes from "../Events/eventRoutes";
import blogRoutes from "../Blogs/blogRoutes";
import projectRoutes from "../Projects/projectRoutes";
import homeRoutes from "../Home/homeRoutes";
import feedbackRoutes from "../Feedback/feedbackRoutes";
import careerRoutes from "../Career/careerRoutes";
import roadmapRoutes from "../Roadmaps/roadmapRoutes";
const routes = [
  ...eventRoutes,
  ...blogRoutes,
  ...projectRoutes,
  ...homeRoutes,
  ...feedbackRoutes,
  ...careerRoutes,
  ...roadmapRoutes
  
];
export default routes;
