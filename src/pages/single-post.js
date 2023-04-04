import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSingleBlogPost, fetchMedia } from "../api/blog";

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
  }, [id]);

  const [featuredMedia, setFeaturedMedia] = useState();

  useEffect(() => {
    const fetchMediaData = async () => {
      if (blog) {
        const { data } = await fetchMedia(blog.featured_media);
        setFeaturedMedia(data);
      }
    };

    fetchMediaData();
  }, [blog]);

  return (
    <div className="single-post container">
      {blog && (
        <div className="single-post container">
          <h1 className="post-title">{blog.title.rendered}</h1>
          {featuredMedia && (
            <div className="single-image-section">
              <img
                className="comparingImages"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
                src={featuredMedia.source_url}
              />
            </div>
          )}
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: blog.excerpt.rendered,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SinglePost;
