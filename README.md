# **CourseSelling Application**

![course](https://github.com/user-attachments/assets/ea41d0eb-e497-4c78-9cbc-b73fd9105fd9)

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## **Folder Structure** 

/project-root ├── backend/ │ ├── config/ │ │ ├── connectToMongoDb.js │ │ ├── envVars.js │ ├── controllers/ │ │ ├── admin.controllers.js │ │ ├── buydetails.controllers.js │ │ ├── categories.controllers.js │ │ ├── course.controllers.js │ │ ├── getsignedurl.controllers.js │ │ ├── purchase.controllers.js │ │ └── user.controllers.js │ ├── middleware/ │ │ └── protectRoute.js │ ├── models/ │ │ ├── admin.model.js │ │ ├── categories.model.js │ │ ├── course.model.js │ │ ├── purchase.model.js │ │ ├── user.model.js │ │ └── viewDetails.model.js │ ├── routes/ │ │ ├── admin.routes.js │ │ ├── buydetails.routes.js │ │ ├── categories.routes.js │ │ ├── courses.routes.js │ │ ├── purchase.routes.js │ │ ├── signedurl.routes.js │ │ └── user.routes.js │ ├── utils/ │ │ └── generateTokenAndSetCookie.js │ ├── server.js ├── frontend/ │ ├── public/ │ │ └── images/ │ └── src/ │ ├── assets/ │ │ └── images/ │ ├── components/ │ │ ├── ui/ │ │ └── admin/ │ ├── hooks/ │ │ ├── useFetchData.jsx │ │ └── useFetch.jsx │ ├── lib/ │ │ └── utils.js │ └── utils/ │ └── formatCurrency.js │ ├── App.js │ ├── main.jsx │ ├── App.css

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


## **Introduction**  
This is a course-selling application where users can browse and purchase courses from different instructors. Admins can create, update, and delete courses.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


## **Tech Stack**

- [Vite + React](https://vite.dev/guide/) - Frontend Library
- [MongoDB](https://shorturl.at/7mJ9k) - Database
- [Node.js](https://nodejs.org/en) - JavaScript Runtime Environment
- [Express](https://expressjs.com/) - Framework for RESTful API
- [RazorPay](https://shorturl.at/16Vmj) - Payment Gateway Integration
- [AWS S3 Bucket](https://aws.amazon.com/) - Image Storage
- [Tailwind CSS](https://tailwindcss.com/docs/guides/vite) - CSS Framework

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## **Installation**

### Running Locally

> **Note:** This project uses `npm` as the package manager.

1. Clone the repository:
   ```bash
   git clone https://github.com/priyankashah3107/courseSelling


Create a .env file:

Copy .env.example and rename it to .env.
Install dependencies for the backend:

bash
Copy code
cd backend
npm install
Run the backend server:

bash
Copy code
npm run dev
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install frontend dependencies:

bash
Copy code
npm install
Run the frontend:

bash
Copy code

npm run dev

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Features**

**User Features:**
Browse courses by different categories
Purchase courses
Secure payment integration with RazorPay

**Admin Features:**
Manage courses (Create, Update, Delete)
View purchased courses and user details

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


**Contributing**
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes and commit them (git commit -am 'Add new feature').
Push the branch to your fork (git push origin feature/your-feature-name).
Create a pull request.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
**Tech Stack**

[Vite + React](https://vite.dev/guide/) Library
[mongodb](https://shorturl.at/7mJ9k) Database
[nodejs](https://nodejs.org/en) Javascript Runtime Enviornment
[express](https://expressjs.com/) Framework dor RESTFUL API
[RazorPay](https://shorturl.at/16Vmj) Payment Integration
[AWS Bucket](https://aws.amazon.com/) S3 Bucket for storing the Images
[Tailwind](https://tailwindcss.com/docs/guides/vite) CSS
