import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../api/blog";
import { Link } from "react-router-dom";

import Pagination from "../pagination/Pagination";

import "../styles/blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [,setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlogs = await fetchBlogs();
        setBlogs(fetchedBlogs);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
  
    fetchData();
  }, []);
  

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredPosts = blogs.filter((post) =>
    post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="front-page-wrapper">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="blog-page-wrapper">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
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
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div>No posts found.</div>
            )}
          </>
        )}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Blog;
