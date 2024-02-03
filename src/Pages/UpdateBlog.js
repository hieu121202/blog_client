import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/get/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const blogDetails = res.data;
        setInput({
          title: blogDetails.title,
          description: blogDetails.description,
          category: blogDetails.category._id,
        });
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/v1/get/categories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBlogDetails();
    fetchAllCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("category", input.category);
    formData.append("description", input.description);

    if (file) {
      formData.append("thumnail", file);
    }

    try {
      const res = await axios.put(
        `http://localhost:9000/api/v1/update/blog/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(res.data.message);
      // Nếu bạn muốn giữ người dùng ở trang cập nhật sau khi hoàn thành, hãy sử dụng dòng sau:
      navigate(`/`);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-2">Update Blog</h2>
        <div className="col-xl-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  className="form-control"
                  placeholder="Blog Title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  name="category"
                  value={input.category}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                >
                  <option disabled>Select Category</option>
                  {categories &&
                    categories.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="Blog description"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Thumnail
                </label>
                <input
                  name="thumbnail"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="form-control"
                  placeholder="Select Thumnail"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
