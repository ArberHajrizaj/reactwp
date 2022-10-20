import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/blog.css";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [paginationPages, setPaginationPages] = useState(0);

  const [searchParam] = useSearchParams();

  const getQueryParam = (key) => searchParam.get(key);

  const getPageNumber = () => Math.ceil(blogs.length / 4);

  useEffect(() => {
    const fetchData = async () => {
      const modifiedArray = data.map((item) => ({
        ...item,
      }));

      setBlogs(modifiedArray);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setPaginationPages(getPageNumber());
  }, [blogs]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="row">
        {postData.slice(page * 4, (page + 1) * 4).map((data) => {
          <div className="col-3" key={data.id}>
            <div className="card">
              <div className="post">
                <img
                  alt={data.title}
                  src={data.featured_image_src ? data.featured_image_src : null}
                  className="card-img-top"
                />
                <div className="card-body">
                  <Link to={`/${data.id}`}>
                    <h2 className="card-title">{data.title}</h2>
                  </Link>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: data.excerpt,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>;
        })}
        <div className="pagination">
        <div
          className="hover-pagination"
          onClick={() => page !== 0 && setPage(page - 1)}
        >
          &laquo;
        </div>
        {[...Array(paginationPages)].map((a, i) => (
          <div className="hover-pagination" onClick={() => setPage(i)} key={i}>
            {i + 1}
          </div>
        ))}
        <div
          className="hover-pagination"
          onClick={() =>
            page < paginationPages - 1 ? setPage(page + 1) : undefined
          }
        >
          &raquo;
        </div>
      </div>
      </div>
    </div>
  );
};

export default Homepage;
