import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../api/blog";
import { Link } from "react-router-dom";

import Pagination from "../pagination/Pagination";

import "../styles/blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [blogPost, setBlogPost] = useState(null);
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const res = await fetchBlogs();
  //     setBlogs(res.data);
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await fetchBlogs();
        console.log("blogs:", blogs);
        setBlogs(blogs);
        setLoading(false);
      } catch (error) {
        console.log("error:", error);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="front-page-wrapper">
      <div className="blog-page-wrapper">
        {blogs
          .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
          .map((post) => (
            <Link key={post.id} to={`${post.id}`} className="postLink">
              <div className="blog-card">
                <div className="blog-card-image">
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    style={{ borderRadius: "15px 15px 0 0" }}
                  />
                </div>
                <div className="blog-card-content">
                  <h3 className="blog-card-title">{post.title.rendered}</h3>
                  <p
                    className="blog-card-excerpt"
                    style={{ maxHeight: "3em", overflow: "hidden" }}
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={blogs.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Blog;
