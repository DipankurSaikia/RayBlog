import React, {useRef, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useAuth } from '../appwrite/AuthContext';

function Register() {
   const registerForm = useRef(null)
   const {user, registerUser} = useAuth()
   
   const navigate = useNavigate()
   useEffect(()=>{
       if(user){
         navigate('/')
       }
     },[])

     const handleSubmit = (e) => {
      e.preventDefault
  
      const name = registerForm.current.name.value
      const email = registerForm.current.email.value
      const password1 = registerForm.current.password1.value
      const password2 = registerForm.current.password2.value
  
      if(password1 !== password2){
        alert('Passwords do not match!')
        return
      }
  
      const userInfo = {name, email, password1, password2}
      console.log(userInfo)
      registerUser(userInfo)
    }

    return (
      <div className="Register-wrapper h-full w-full flex items-center justify-center">
        <div className="container h-[26rem] w-96 bg-[var(--secondary-color)] rounded-lg px-14 pt-4">
          <div className="login-register-container">
            <form ref={registerForm} onSubmit={handleSubmit}>
  
              <div className="flex justify-center mb-5">
                <h4 className="text-2xl font-semibold font-serif text-[var(--text-color1)]">
                  Sign up
                </h4>
              </div>
  
              <div className="form-field-wrapper mb-3">
                <label htmlFor="nameId">
                  <div className="text-[var(--text-color1)]">Name:</div>
                </label>
                <div className="bg-[var(--input-field)] flex items-center gap-1 rounded-md pl-2 h-8">
                  <label htmlFor="nameId">
                  <IoPerson />
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Enter name..."
                    className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    id="nameId"
                  />
                </div>
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
  
              <div className="form-field-wrapper mb-3">
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
                    name="password1"
                    placeholder="Enter password..."
                    className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    id="passwordId"
                  />
                </div>
              </div>

              <div className="form-field-wrapper mb-4">
                <label htmlFor="confirmPasswordId">
                  <div className="text-[var(--text-color1)]">Confirm Password:</div>
                </label>
                <div className="bg-[var(--input-field)] flex items-center gap-1 rounded-md pl-2 h-8">
                  <label htmlFor="confirmPasswordId">
                  <IoLockClosed />
                  </label>
                  <input
                    required
                    type="password"
                    name="password2"
                    placeholder="Enter password..."
                    className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    id="confirmPasswordId"
                  />
                </div>
              </div>
              
              <label>
              <div className="form-field-wrapper bg-[var(--primary-color)] flex items-center justify-center h-8 rounded-md mb-2 cursor-pointer">
                <input type="submit" value="Sign up" className="btn text-[var(--text-color1)] cursor-pointer" />
              </div>
              </label>
            </form>
  
            <p className="text-[var(--text-color1)] text-xs">
              Already have an account? <Link to="/login" className="text-[var(--primary-color)] underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Register