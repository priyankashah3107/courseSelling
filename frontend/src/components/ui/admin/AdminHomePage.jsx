import React from 'react'
import styles from '../../../style.js'
import AdminNavbar from './AdminNavbar'


const AdminHomePage = () => {
  return (
    <div className="bg-[#efefef] h-screen w-full text-black ">

      <div className={`${styles.paddingX} ${styles.flexCenter} text-black`}>
        <div className={`${styles.boxWidth} `}>
          <AdminNavbar />
        </div>
      </div>


      {/* fetch created course data and give admin to update the created course and delete course */}
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