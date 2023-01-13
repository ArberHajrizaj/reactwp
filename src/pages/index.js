import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";

import { fetchBlogs } from "../api/blog";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/blog.css";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);



  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchBlogs();

      const modifiedArray = data.map((item) => ({
        ...item,
      }));
      setBlogs(modifiedArray);
    };
    fetchData();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage + setPostsPerPage - setPostsPerPage;
  const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="container" blogs={currentPosts}>
        <div className="row">
          {blogs.length > 0 && (
            <>
              {blogs.map((o) => (
                <div className="col-3" key={o.id}>
                  <div className="card">
                    <div className="post">
                      <img
                        alt={o.better_featured_image.alt_text}
                        src={
                          o.better_featured_image.source_url
                            ? o.better_featured_image.source_url
                            : null
                        }
                        className="card-img-top"
                      />

                      <div className="card-body">
                        <Link to={`/${o.id}`}>
                          <h2 className="card-title">{o.title.rendered}</h2>
                        </Link>
                        <div
                          className="content"
                          dangerouslySetInnerHTML={{
                            __html: o.excerpt.rendered,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <Pagination
          totalPosts={blogs.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Homepage;
