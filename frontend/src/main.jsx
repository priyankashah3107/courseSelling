import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SignupPage } from "./components/ui/SignupPage.jsx";
import LoginPage from "./components/ui/LoginPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter>
    
      <App />
    </BrowserRouter> */}
    <RouterProvider router={router} />
  </StrictMode>
);
