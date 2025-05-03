import { useContext, useState, useEffect, createContext } from "react";
import { account } from "./config";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import db from "./databases";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserStatus();
    // setLoading(false)
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      console.log("Session", response);

      let accountDetails = await account.get();

      if (accountDetails.emailVerification == false) {
        navigate("/login");
        account.deleteSession("current");
      } else {
        console.log("accountDetails", accountDetails);
        setUser(accountDetails);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const logoutUser = () => {
    account.deleteSession("current");
    setUser(null);
    alert("User Logged Out")
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
  
    try {
      const id = ID.unique();
      await account.create(
        id,
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );
  
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password1
      );
  
      const link = account.createVerification('https://rayblog-omega.vercel.app/verify');
      await db.userProfile.create({ userName: userInfo.name},id);
  
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      if (accountDetails.emailVerification == false) {
        navigate("/login");
        account.deleteSession("current");
      } else {
        setUser(accountDetails);
      }
    } catch (error) {
      
    }
    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="h-screen flex items-center justify-center text-[var(--text-color1)]">
        Loading...
      </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
