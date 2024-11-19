import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPost, createPost, editPost } from "../features/post/postSlice";

function ViewPost() {
  const { posts, error, loading } = useSelector((state) => state.post);
  const [post, setPost] = useState({});
  const [editId, setEditId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const handleEdit = (post) => {
    setPost(post);
    setEditId(post.id);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId === "") {
      dispatch(createPost(post));
    } else {
      dispatch(editPost({ ...post, id: editId }));
    }
    setPost({});
    setEditId("");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{editId ? "Edit Post" : "Create Post"}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label"> Title </label>
                  <input type="text" className="form-control" id="title" name="title"
                    value={post.title || ""} onChange={handleInput} placeholder="Enter title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label"> Description </label>
                  <textarea className="form-control" id="description" name="description"
                    rows="3" value={post.description || ""} onChange={handleInput}
                    placeholder="Enter description"></textarea>
                </div>
                <button type="submit" className="btn btn-dark fw-bold">
                  {editId ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-8">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>
                    <button onClick={() => dispatch(deletePost(post.id))} type="button"
                      className="btn btn-danger btn-sm fw-bold me-2">
                      Delete
                    </button>
                    <button onClick={() => handleEdit(post)} type="button"
                      className="btn btn-warning btn-sm fw-bold">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;