import React, { lazy, Suspense } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const ReviewBlog = lazy(() =>
  import("../components/ReviewBlog/ReviewBlogPage")
);
import Loader from "../components/Loader/Loader";
export default (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <ReviewBlog {...props} />
      <Footer />
    </Suspense>
  );
};
