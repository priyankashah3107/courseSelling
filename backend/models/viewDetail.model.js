import mongoose from "mongoose";

const buyDetailsSchema = new mongoose.Schema({
    mainTitle: {
        type: String, 
        unique: true,
        required: true
    },
    validity: {
        type: Number,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },

    // Hierarchical Structure:
// syllabus → modules → topics: The nesting represents sections containing modules, and modules containing topics.
    syllabus: [
        {
            sectionTitle: {type: String, required: true},
            modules: [
                {
                    moduleTitle: {type: String,  required: true},
                    topics: [
                        {
                            title: {type: String, required: true},
                            description: {type: String}
                        }
                    ]
                }
            ]
        }
    ],

    coursebuyId: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }
})


export default mongoose.model("buyDetails", buyDetailsSchema)






// ref: harkirat.classx.co.in

// {
//     "mainTitle": "Complete MERN Stack Journey",
//     "validity": 12,
//     "description": "Learn MERN Stack from beginner to advanced with hands-on projects.",
//     "syllabus": [
//       {
//         "sectionTitle": "Foundation",
//         "modules": [
//           {
//             "moduleTitle": "JavaScript Basics",
//             "topics": [
//               { "title": "Async nature of JS", "description": "Understanding event loops and async operations" },
//               { "title": "Node.js runtime", "description": "How Node.js works and its runtime environment" }
//             ]
//           },
//           {
//             "moduleTitle": "Databases",
//             "topics": [
//               { "title": "MongoDB", "description": "Deep dive into NoSQL database" },
//               { "title": "PostgreSQL", "description": "Basics and advanced features of SQL database" }
//             ]
//           }
//         ]
//       },
//       {
//         "sectionTitle": "Frontend",
//         "modules": [
//           {
//             "moduleTitle": "React Basics",
//             "topics": [
//               { "title": "State Management", "description": "Using Recoil for state management" },
//               { "title": "Tailwind CSS", "description": "Utility-first CSS framework deep dive" }
//             ]
//           }
//         ]
//       }
//     ]
//   }
  