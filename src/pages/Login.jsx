import React, {useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { useAuth } from "../appwrite/AuthContext";

function Login() {
  const navigate = useNavigate()
  const {user, loginUser} = useAuth()

  const loginForm = useRef(null)

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = loginForm.current.email.value
    const password = loginForm.current.password.value

    const userInfo = {email, password}
    loginUser(userInfo)

  }
 
  return (
    <div className="Login-wrapper h-full w-full flex items-center justify-center">
      <div className="container h-80 w-96 bg-[var(--secondary-color)] rounded-lg px-14 pt-4">
        <div className="login-register-container">
          <form ref={loginForm} onSubmit={handleSubmit}>

            <div className="flex justify-center mb-5">
              <h4 className="text-2xl font-semibold font-serif text-[var(--text-color1)]">
                Login
              </h4>
            </div>

            <div className="form-field-wrapper mb-3">
              <label htmlFor="emailId">
                <div className="text-[var(--text-color1)]">Email:</div>
              </label>
              <div className="bg-[var(--input-field)] flex items-center gap-1 rounded-md pl-2 h-8">
                <label htmlFor="emailId">
                  <MdEmail />
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  id="emailId"
                />
              </div>
            </div>

            <div className="form-field-wrapper mb-4">
              <label htmlFor="passwordId">
                <div className="text-[var(--text-color1)]">Password:</div>
              </label>
              <div className="bg-[var(--input-field)] flex items-center gap-1 rounded-md pl-2 h-8">
                <label htmlFor="passwordId">
                <IoLockClosed />
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Enter password..."
                  className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  id="passwordId"
                />
              </div>
            </div>
            
            <label>
            <div className="form-field-wrapper bg-[var(--primary-color)] flex items-center justify-center h-8 rounded-md mb-2 cursor-pointer">
              <input type="submit" value="Login" className="btn text-[var(--text-color1)] cursor-pointer" />
            </div>
            </label>
          </form>

          <p className="text-[var(--text-color1)] text-xs">
            Don't have an account? <Link to="/register" className="text-[var(--primary-color)] underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
