import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const navigate = useNavigate()
const [formData, setFormData] = useState({
  title: "",
  image: "",
  description: "",
  price: "",
  category: ""
  // creator
})


const {mutate, isError, isLoading, error} = useMutation({
     mutationFn: async (formData) => {
      try {
        const res = await axios.post("/api/v1/courses/mycourses", formData)
        console.log("Create course from CreateCourse Page", formData)
        return res.data;
      } catch (error) {
        console.log("Error while Creating a course", error)
        throw error;
      }
     }, 
     onSuccess: () => {
      toast.success("Successfully course created 🎉")
      navigate("/admin")
     },
     onError: (err) => {
      toast.error(`Course creation Failed ${err.response?.data?.message || err.message}`)
     }
})

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Create Course Data", formData)
  mutate(formData)
}

const handleChange = (e) => {
  setFormData({...formData, [e.target.name]: e.target.value})
}



  return (
    <div>
      <h1>Create Course</h1>

      <form onSubmit={handleSubmit} >
        <label className='flex flex-col'>
          Title
          <textarea name="title"
           placeholder="Enter the Title"
           value={formData.title}
           onChange={handleChange}
           className='w-1/2 bg-gray-100 p-3 rounded-md resize-none overflow-hidden'
           rows="1"
           onInput={(e) => {
            e.target.style.height = "auto",
            e.target.style.height = `${e.target.scrollHeight}px`

           }}
          ></textarea>
          
        </label>

        <label className='flex flex-col'>
          image
          <input name="image" 
          type='file'
          placeholder="upload image"
          value={formData.image}
          onChange={handleChange}
          className='w-1/2 bg-gray-100 p-3 rounded-md resize-none overflow-hidden'
          />   
        </label>

        <label className='flex flex-col'>
          Description
          <textarea name="description"
          placeholder="Enter the Description"
          value={formData.description}
          onChange={handleChange}
          className='w-1/2 bg-gray-100 p-3 rounded-md resize-none overflow-hidden'
           rows="1"
           onInput={(e) => {
            e.target.style.height = "auto",
            e.target.style.height = `${e.target.scrollHeight}px`
           }}
          ></textarea> 
        </label>

        <label className='flex flex-col'>
          Price
          <input name="price"
           type='text'
           onChange={handleChange} 
          placeholder="Enter the Price"
           className='w-1/2 bg-gray-100 p-3 rounded-md resize-none overflow-hidden'
          /> 
        </label>

        <label className='flex flex-col'>
          
          category
          {/* <input type='text' placeholder="Enter the Price"
           className='w-1/2 bg-gray-100 p-3 rounded-md resize-none overflow-hidden'
          />  */}
          
          <select name="category" value={formData.category}
          onChange={handleChange}
           className='w-1/2 bg-gray-100 p-3 rounded-md '>
            <option value="Computer Science"> Computer Science</option>
            <option value="Web Development"> Web Development</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Web Designing">Web Designing</option>
            <option value="Web3">Web3</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Data Structure and Algorithms">Data Structure and Algorithms</option>
          </select>
        </label>

        <button type="submit" disabled={isLoading} className="w-1/2 py-3 px-4 rounded-lg font-bold bg-[#323232] text-white">{isLoading ? "Creating..." : "Course Created"}</button>
      </form>

    {isError && (
      <p className="text-red-500 text-center mt-4">
      {error.response?.data?.message || "Something went wrong"}
    </p>
    )}
    </div>
  )
}

export default CreateCourse