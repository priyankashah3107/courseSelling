import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateCourse = () => {
  const { id } = useParams();  // Get course ID from URL
  const [course, setCourse] = useState(null);  // State to store course details
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
  const navigate = useNavigate();

  // Fetch the course details using the ID
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // const res = await axios.get(`/api/v1/courses/${id}`, { withCredentials: true });
        const res = await axios.get(`/api/v1/courses/particulatcourse/${id}`, { withCredentials: true });

        setCourse(res.data.content);
        setTitle(res.data.content.title);
        setImage(res.data.content.image);
        setDescription(res.data.content.description);
        setPrice(res.data.content.price);
        // setCategory(res.data.content.category);
      } catch (error) {
        console.log('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`/api/v1/courses/updatecourse/${id}`, {
        title, image, description, price
      });

      if (res.status === 200) {
        toast.success('Course updated successfully 🎉');
        navigate('/admin');  // Navigate back to admin page (or wherever you want after update)
      }
    } catch (error) {
        console.log(error.message)
      toast.error('Error updating course: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="update-course-form">
      <h2>Update Course</h2>
      {course ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Image</label>
            <input 
              type="text" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Price</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
            />
          </div>
          {/* <div>
            <label>Category</label>
            <input 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              required 
            />
          </div> */}
          <button type="submit">Update Course</button>
        </form>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default UpdateCourse;
