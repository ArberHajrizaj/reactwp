import axios from "axios";

export const fetchBlogs = async () => {
  let allBlogs = [];
  let pageNum = 1;
  let totalPages = 1;

  while (pageNum <= totalPages) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/posts?_embed&per_page=100&page=${pageNum}`
    );
    allBlogs = [...allBlogs, ...res.data];
    totalPages = res.headers["x-wp-totalpages"];
    pageNum++;
  }

  return allBlogs;
};

export const fetchSingleBlogPost = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
};

export const fetchMedia = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/media/${id}`);
};
