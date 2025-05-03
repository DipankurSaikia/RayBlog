import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from './pages/Verify'
import Preview from "./components/Createcomponents/Preview/Preview";
import { BlogProvider } from "./Contexts/BlogContext";
import { AuthProvider } from "./appwrite/AuthContext";
import PrivateRoutes from "./appwrite/PrivateRoutes";
import Post from "./pages/Post";
import User from './pages/User'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <Routes>
            <Route path="/verify" element={<Verify/>}></Route>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/user/:id" element={<User />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/create" element={<Create />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/preview" element={<Preview />} /> */}
            </Route>
          </Routes>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
