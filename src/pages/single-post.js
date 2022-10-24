import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSingleBlogPost } from "../api/blog";

import "../styles/single-post.css";

const SinglePost = () => {
  const [blog, setBlog] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSingleBlogPost(id);

      setBlog(data);
    };

    fetchData();
  }, []);

  return (
    <div className="single-post container">
      {blog && (
        <div className="single-post container">
          <h1 className="post-title">{blog.title}</h1>
          <div className="avant-section">
            <img
              className="comparingImages"
              style={{
                width: "100%",
                objectFit: "cover",
              }}
              src={blog.featured_image}
            />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: blog.excerpt,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SinglePost;
