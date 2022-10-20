import axios from "axios";

// export const fetchBlogs = async (category) => {
//   return await axios.get(`?categories=${category}`);
// };

export const fetchSingleBlogPost = async (id) => {
  return await axios.get(`/${id}`);
};

// export const fetchLatestBlogPost = async (category) => {
//   return await axios.get(`/beforeafters/latest?categories=${category}`);
// };
