import axios from "axios";

// Set up Axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//Export API functions
export const fetchBlogs = async () => {
  let allBlogs = [];
  let pageNum = 1;
  let totalPages = 1;

  while (pageNum <= totalPages) {
    const res = await api.get(
      `/posts?_embed&per_page=100&page=${pageNum}`
    );
    allBlogs = [...allBlogs, ...res.data];
    totalPages = res.headers["x-wp-totalpages"];
    pageNum++;
  }

  return allBlogs;
};

// Fetching Single Post
export const fetchSingleBlogPost = async (id) => {
  return await api.get(`/posts/${id}`);
};

// Fetching Media
export const fetchMedia = async (id) => {
  return await api.get(`/media/${id}`);
};

// Fetching Comments
export const fetchComments = async (postId) => {
  const response = await api.get(`/comments?post=${postId}`);
  return response.data;
};
