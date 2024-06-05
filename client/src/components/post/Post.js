import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getPost } from "../../actions/posts";
import Spinner from "../layouts/Spinner";
import { connect } from "react-redux";
import PostItem from "../posts/PostItem";
const Post = ({ getPost, posts: { post, loading }, match }) => {
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost(match.params.id)])
  return (
    <Fragment>
      {post == null || loading ? <Spinner /> : <Fragment>
        <PostItem post={post} showActions={false} />
      </Fragment>}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPost })(Post);
