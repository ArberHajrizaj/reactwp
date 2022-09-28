import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  const [postData, setPostData] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost/myblog/wp-json/wl/v1/posts" ).then((res) => {
      let posts = res.data;
      setPostData(posts);
    });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="posts">
      {postData.map((data) => {

        return (
          <div className="post" key={data.id}>
            <h1 className="postTitle">{data.title}</h1>
            <img src={data.featured_image.thumbnail ? data.featured_image.thumbnail : 'wrong'} className="postImage" />
           
      
          </div>
        );
      })}
    </div>
  );
};

export default Post;
