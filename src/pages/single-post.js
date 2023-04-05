import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSingleBlogPost, fetchMedia, fetchComments } from "../api/blog";

import "../styles/single-post.css";

const SinglePost = () => {
  const [blog, setBlog] = useState();
  const [featuredMedia, setFeaturedMedia] = useState();
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSingleBlogPost(id);
      setBlog(data);

      if (data && data.featured_media) {
        const mediaData = await fetchMedia(data.featured_media);
        setFeaturedMedia(mediaData.data);
      }

      const commentsData = await fetchComments(id);
      setComments(commentsData);
    };

    fetchData();
  }, [id]);

  return (
    <div className="single-post container">
      {blog && (
        <div>
          {featuredMedia && (
            <div className="featured-image">
              <img src={featuredMedia.source_url} alt={featuredMedia.alt_text} />
            </div>
          )}
          <div className="content">
            <h1 className="post-title">{blog.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: blog.content.rendered }} />
          </div>
        </div>
      )}

      <div className="comments">
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments for this post.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <h3>{comment.author_name}</h3>
              <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SinglePost;
