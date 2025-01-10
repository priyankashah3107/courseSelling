// gpt

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const UpdateCourse = () => {
//   const { id } = useParams();  // Get course ID from URL
//   const [course, setCourse] = useState(null);  // State to store course details
//   const [title, setTitle] = useState('');
//   const [image, setImage] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
// //   const [category, setCategory] = useState('');
//   const navigate = useNavigate();

//   // Fetch the course details using the ID
//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//
//         const res = await axios.get(`/api/v1/courses/particulatcourse/${id}`, { withCredentials: true });

//         setCourse(res.data.content);
//         setTitle(res.data.content.title);
//         setImage(res.data.content.image);
//         setDescription(res.data.content.description);
//         setPrice(res.data.content.price);
//         // setCategory(res.data.content.category);
//       } catch (error) {
//         console.log('Error fetching course details:', error);
//       }
//     };

//     fetchCourseDetails();
//   }, [id]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.patch(`/api/v1/courses/updatecourse/${id}`, {
//         title, image, description, price
//       });

//       if (res.status === 200) {
//         toast.success('Course updated successfully 🎉');
//         navigate('/admin');  // Navigate back to admin page (or wherever you want after update)
//       }
//     } catch (error) {
//         console.log(error.message)
//       toast.error('Error updating course: ' + error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="update-course-form">
//       <h2>Update Course</h2>
//       {course ? (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Image</label>
//             <input
//               type="text"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Price</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>
//           {/* <div>
//             <label>Category</label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             />
//           </div> */}
//           <button type="submit">Update Course</button>
//         </form>
//       ) : (
//         <p>Loading course details...</p>
//       )}
//     </div>
//   );
// };

// export default UpdateCourse;

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const fetchCourseDetails = async (id) => {
  try {
    const res = await axios.get(`/api/v1/courses/particulatcourse/${id}`, {
      withCredentials: true,
    });
    console.log("fetchCourseDetails from UpdateCourse Details", res);
    return res.data;
  } catch (error) {
    console.log("Error while fetching the FetchCourseDeatils", error);
    throw error;
  }
};

const UpdateCourse = () => {
  const { id } = useParams(); // Get the courseId from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    category: "",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCourseById", id],
    queryFn: () => fetchCourseDetails(id),
    enabled: !!id, // Only run the query if the id is available
  });

  // Use useEffect to update formData once data is fetched
  useEffect(() => {
    if (data?.content) {
      setFormData({
        title: data.content.title || "",
        image: "", // You can handle file upload separately if needed
        description: data.content.description || "",
        price: data.content.price || "",
        category: data.content.category || "",
      });
    }
  }, [data]); // Run this effect when `data` is fetched

  // update the course by their courseId

  const { mutate } = useMutation({
    mutationFn: async ({ title, image, description, price, category }) => {
      try {
        const res = await axios.patch(`/api/v1/courses/updatecourse/${id}`, {
          title,
          image,
          description,
          price,
          category,
        });
        console.log("Particular Course from AdminHome Page", res);
        return res.data;
      } catch (error) {
        console.log("error to update the Course", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Course Updated Successfully 🎉");
    },
    onError: () => {
      toast.error(
        `Course Updation Failed: ${err.response?.data?.message || err.message} `
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Course Data", formData);
    mutate(formData);
    navigate("/admin");

    // Send `formData` to the server (e.g., via a mutation for updating the course)
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) return <div>Loading...</div>;

  // If the course ID does not exist or another error occurs
  if (isError) {
    return <div>Error: {error.message || "Course not found"}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-lg sm:text-3xl font-semibold mb-4 text-center">
          Update Course
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            Title
            <textarea
              name="title"
              placeholder="Enter the Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-md resize-none overflow-hidden"
              rows="1"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          </label>

          <label className="flex flex-col">
            Image
            <input
              name="image"
              type="file"
              placeholder="Upload image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-md"
            />
          </label>

          <label className="flex flex-col">
            Description
            <textarea
              name="description"
              placeholder="Enter the Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-md resize-none overflow-hidden"
              rows="1"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          </label>

          <label className="flex flex-col">
            Price
            <input
              name="price"
              type="text"
              onChange={handleChange}
              placeholder="Enter the Price"
              value={formData.price}
              className="w-full bg-gray-100 p-3 rounded-md"
            />
          </label>

          <label className="flex flex-col">
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded-md"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Web Designing">Web Designing</option>
              <option value="Web3">Web3</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Data Structure and Algorithms">
                Data Structure and Algorithms
              </option>
            </select>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg font-bold bg-[#323232] text-white"
          >
            {isLoading ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
