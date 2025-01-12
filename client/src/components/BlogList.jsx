/** @format */

const BlogList = ({ posts, onEdit }) => {
  if (posts.length === 0) {
    return <p> No Posts Yet, Start by Adding One! </p>;
  }
  return (
    <ul>
      {posts.map((post, index) => (
        <span key={index}>
          <span>
            <b>
              <i> {post.title} </i>
            </b>
          </span>
          <span> ▶ </span>
          <span> {post.content} </span>
          <button onClick={() => onEdit(post)}> Edit </button>
          <br />
          <br />
        </span>
      ))}
    </ul>
  );
};

export default BlogList;
