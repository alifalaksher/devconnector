import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { addLike, deletePost, removeLike } from "../../actions/posts";

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, name, user, avatar, text, date, likes, comment },
  showActions
}) => {
  return (
    <Fragment>
      <div className="post bg-white p-1 my-1" key={_id}>
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              {" "}
              <button
                onClick={(e) => addLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-up"></i>
                {likes.length && <span> {likes.length}</span>}
              </button>
              <button
                onClick={(e) => removeLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{" "}
                {comment.length > 0 && (
                  <span className="comment-count">{comment.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user.user._id && (
                <button
                  onClick={(e) => deletePost(_id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};
PostItem.defaultProps={
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
