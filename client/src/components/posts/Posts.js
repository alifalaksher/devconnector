import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner.gif";
import { getPosts } from "../../actions/posts";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, posts: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {posts.length > 0 && loading ? (
        <Spinner />
      ) : (
        <Fragment>
        <PostForm />
          <div className="posts">
            {posts.map(post=>
              <PostItem key={post._id} post={post} />
            )}
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);
