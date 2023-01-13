import axios from "axios";

export const fetchBlogs = async () => {
  return await axios.get(``);
};

export const fetchSingleBlogPost = async (id) => {
  return await axios.get(`/${id}`);
};




