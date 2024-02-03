import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Response:", res.data);
      setBlogs(res.data.fetchAllBlogs);
    };
    fetchAllBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/delete/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Blog deleted successfully!");
      // Cập nhật danh sách blog sau khi xóa
      const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
      setBlogs(updatedBlogs);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest posts</strong>
            </h2>

            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => {
                  return (
                    <div className="col-lg-4 col-md-12 mb-4" key={item._id}>
                      <div className="card">
                        <div
                          className="bg-image hover-overlay ripple"
                          data-mdb-ripple-color="light"
                        />

                        <img
                          src={`http://localhost:9000/${item.thumnail}`}
                          className="img-fluid"
                          alt={item.title}
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <>
                          <Link
                            to={`/blog/${item._id}`}
                            className="btn btn-primary"
                          >
                            Read More
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                          <Link
                            to={`/blog/${item._id}/update`}
                            className="btn btn-warning"
                          >
                            Update
                          </Link>
                        </>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2>Loading..</h2>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-primary text-lg-start">
        <div
          className="text-center p-3 text-white"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          &copy; Footer
          <a className="text-white mx-2" href="https://mdbootstrap.com/">
            MDBootstrap
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchAllBlogs = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:9000/api/v1/get/allblogs",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         console.log("API Response:", res.data);
//         setBlogs(res.data.fetchAllBlogs);
//       } catch (error) {
//         console.error("Failed to fetch blogs:", error);
//       }
//     };
//     fetchAllBlogs();
//   }, []);

//   return (
//     <>
//       <main className="my-5">
//         <div className="container shadow-lg">
//           <section className="text-center">
//             <h2 className="mb-5 my-3">
//               <strong>Latest posts</strong>
//             </h2>

//             <div className="row">
//               {Array.isArray(blogs) && blogs.length > 0 ? (
//                 blogs.map((item) => (
//                   <div className="col-lg-4 col-md-12 mb-4" key={item._id}>
//                     <div className="card">
//                       <div
//                         className="bg-image hover-overlay ripple"
//                         data-mdb-ripple-color="light"
//                       >
//                         <img
//                           src={`http://localhost:9000/${item.thumnail}`}
//                           className="img-fluid"
//                           alt={item.title}
//                         />
//                         <a href="#!">
//                           <div
//                             className="mask"
//                             style={{
//                               backgroundColor: "rgba(251, 251, 251, 0.15)",
//                             }}
//                           ></div>
//                         </a>
//                       </div>
//                       <div className="card-body">
//                         <h5 className="card-title">{item.title}</h5>
//                         <p className="card-text">{item.description}</p>
//                         <Link
//                           to={`/blog/${item._id}`}
//                           className="btn btn-primary"
//                         >
//                           Read More
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <h2>Loading..</h2>
//               )}
//             </div>
//           </section>
//         </div>
//       </main>

//       <footer className="bg-primary text-lg-start">
//         <div
//           className="text-center p-3 text-white"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
//         >
//           &copy; 2022 CodeWithViju
//           <a className="text-white mx-2" href="https://mdbootstrap.com/">
//             MDBootstrap
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Home;
