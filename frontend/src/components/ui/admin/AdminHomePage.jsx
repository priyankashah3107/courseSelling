import React from 'react'
import styles from '../../../style.js'
import AdminNavbar from './AdminNavbar'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { formatCurrency } from '../../../utils/formatCurrency.js'
import toast from 'react-hot-toast'


const getAllCourses = async () => {
  try {
    //  const res = await axios.get("/api/v1/courses/getcourses", {withCredentials: true })
    const res = await axios.get("/api/v1/courses/courseadmin", {withCredentials: true })

     console.log("Fetch Data from AdminHomePage", res)
     return res.data;
  } catch (error) {
     console.log("Error while fetching the AllCourses", error)
     return null;
  }
}


const AdminHomePage = () => {
  const navigate = useNavigate()
  const {data, isError, isLoading, error} = useQuery({
      queryKey: ["allCourses"],
      queryFn: getAllCourses
  })


// patch request to update the course 
const {mutate} = useMutation({
    mutationFn: async({title, image, description, price, category}) => {
      try {
        const res = await axios.patch(`/api/v1/courses/updatecourse/${id}`, {
          title, image, description, price, category
        })
        console.log("Particular Course from AdminHome Page", res)
        return res.data
      } catch (error) {
        console.log("error to update the Course", error)
        throw error
      }
    }, 
    onSuccess: () => {
      toast.success("Course Updated Successfully 🎉")
    }, 
    onError: () => {
      toast.error(`Course Updation Failed: ${err.response?.data?.message || err.message} `)
    }
})


const handleNavigateUpdateButton = (id) => {
  navigate(`/update/${id}`)
}

const handleUpdate = () => {
  console.log("Update Course Data",  title, image, description, price, category)
  mutate( title, image, description, price, category)
}



 // delete the course by their courseId 

 const {mutate: deleteCourseById} = useMutation({
     mutationFn:  async(id) => {
      try {
        const res = await axios.delete(`/api/v1/courses/deletecourses/${id}`)
        return res.data
      } catch (error) {
        console.log("Error while deleting the course", error)
        throw error
      }
     }, 
     onSuccess: () => {
      toast.success("Course Deleted Successfully 🎉")
     }, 
     onError: () => {
      toast.error("Unable to delete the course")
     }
 })

 const handleDeleteCourseById = (id) => {
    deleteCourseById(id)
 }

  return (
    <div className="bg-[#efefef] h-screen w-full text-black ">

      <div className={`${styles.paddingX} ${styles.flexCenter} text-black`}>
        <div className={`${styles.boxWidth} `}>
          <AdminNavbar />
        </div>
      </div>


      {/* fetch created course data and give admin to update the created course and delete course */}
           
           <div className='min-h-screen bg-[#e4e4e4] py-10 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
            <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data?.content?.map((val, index) => (
              <div key={index} className="bg-[#ffffff] rounded-lg p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group"> 
              <div></div>
              <img
              src={val.image}
              alt={val.title}
              className="w-full h-40 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300"/>
               <h2 className="text-lg sm:text-xl font-semibold mt-4 line-clamp-1 text-black">
                 {val.title}
              </h2>
              <p className="text-black mt-2 text-sm line-clamp-2">
              {val.description}
              </p>
              <div className="mt-auto pt-4">
                    <p className="text-xl font-medium text-[#1b1b1b]">
                      {formatCurrency(val.price)}
                    </p>
                    <button 
                    onClick={() => handleNavigateUpdateButton(val._id)} 
                      className="mt-3 w-full bg-gradient-to-r from-[#1b184b] to-[#1A2980] text-white font-semibold rounded-md px-5 py-2.5 hover:from-[#1A2980] hover:to-[#2a0f4e] transition-all duration-300 transform hover:-translate-y-0.5">
                     Update
                    </button>
                    <button 
                    onClick={() => handleDeleteCourseById(val._id)}
                      className="mt-3 w-full bg-gradient-to-r from-[#ff3f3f] to-[#e60808] text-white font-semibold rounded-md px-5 py-2.5 hover:from-[#e7453f] hover:to-[#f62b2b] transition-all duration-300 transform hover:-translate-y-0.5">
                     Delete
                    </button>
                  </div>
              </div>
            ))}
          </div>
            </div>
         
         </div>

    </div>
  )
}

export default AdminHomePage



// HomePage before and after login 
// before auth navbar homepage 
// after login 


// navbar logo logout
// homePage leftBar create: createCourse, updateCourse DeleteCourse, 
// how many user purchased the samecourse their info like email 