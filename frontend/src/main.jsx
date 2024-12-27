import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./components/ui/LoginPage.jsx";
import SignupPage from "./components/ui/SignupPage.jsx";
import HomePage from "./components/ui/HomePage.jsx";

const queryClient = new QueryClient();
// const router = createBrowserRouter([
//   { path: "/", element: <HomePage /> },
//   { path: "/login", element: <LoginPage /> },
//   { path: "/signup", element: <SignupPage /> },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>

    {/* <RouterProvider router={router} /> */}
  </StrictMode>
);
