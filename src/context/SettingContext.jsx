import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  showSuccessMessage,
  showInfoMessage,
  showDangerMessage,
} from "../utils/notification";

const SettingContext = React.createContext();
const SettingContextUpdate = React.createContext();

export const loadSetting = () => {
  return useContext(SettingContext);
};

export const updateSetting = () => {
  return useContext(SettingContextUpdate);
};

export const SettingProvider = ({ children }) => {
  const navigate = useNavigate();
  const [displayAuthForm, setDisplayAuthForm] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error("err invalid token:", error);
      return true;
    }
  };
  const [tokenExipred, setTokenExpired] = useState(isTokenExpired(token));
  function hasAdminRole(jwtToken) {
    try {
      const tokenParts = jwtToken.split(".");
      if (tokenParts.length !== 3) return false;

      const payload = JSON.parse(atob(tokenParts[1]));
      return Array.isArray(payload.roles) && payload.roles.includes("admin");
    } catch (error) {
      return false;
    }
  }
  function extractNameFromToken(token) {
    if (!token) return "";
    const payloadBase64 = token ? token.split(".")[1] : "";
    const payloadJson = atob(payloadBase64); // Decode base64
    const payload = JSON.parse(payloadJson);

    // Return the "sub" field which typically contains the user identifier
    return payload.name ? payload.name : "";
  }
  const [isAdmin, setIsAdmin] = useState(hasAdminRole(token));
  const [userName, setUserName] = useState(extractNameFromToken(token));
  const [bearerToken, setBearerToken] = useState(
    token ? `Bearer ${JSON.parse(token)}` : ""
  );
  const [header, setHeader] = useState({
    headers: { Authorization: bearerToken },
  });
  const [logoutVisible, setLogoutVisible] = useState(false);

  const toggleDisplayAuthForm = () => {
    setDisplayAuthForm(!displayAuthForm);
  };

  const toggleLogoutVisible = () => {
    setLogoutVisible(!logoutVisible);
  };

  const refreshValues = () => {
    const tempToken = localStorage.getItem("userToken") || null;
    const tempBearerToken = tempToken ? `Bearer ${JSON.parse(tempToken)}` : "";
    setToken(tempToken);
    setLoggedIn(tempToken ? true : false);
    setBearerToken(tempBearerToken);
    setHeader({ headers: { Authorization: tempBearerToken } });
  };

  const createUser = (userData) => {
    const url = `http://localhost:3000/api/create-user`;
    axios
      .post(url, userData, header)
      .then((res) => {
        if (res.status == 200) {
          showSuccessMessage("Account Created Successfully. Please Login.");
        }
      })
      .catch((err) => {
        console.log("error while creating user", err);
        showDangerMessage("This email is already in use");
      });
  };

  const loginUser = (userData) => {
    const url = `http://localhost:3000/api/login-user`;
    axios
      .post(url, userData, header)
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("userToken", JSON.stringify(res.data.token));
          setIsAdmin(hasAdminRole(res.data.token));
          showSuccessMessage("Logged In Successfully");
          setLoggedIn(true);
          toggleDisplayAuthForm();
          getLoggedInUser(`Bearer ${res.data.token}`);
          refreshValues();
        }
      })
      .catch((err) => {
        console.log("err while loggin", err);
        showDangerMessage("Email or Password dosen't match");
      });
  };

  const handelLogout = () => {
    setToken(null);
    setLoggedIn(false);
    localStorage.removeItem("userToken");
    refreshValues();
    navigate("/");
    setLogoutVisible(false);
    setIsAdmin(false);
    setUserName(null);
    showInfoMessage("Logged Out Successfully");
    // window.location.reload();
  };

  const getUserList = () => {
    const url = `http://localhost:3000/api/users`;
    axios
      .get(url, header, header)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.log("err while getting users", err);
      });
  };

  const getLoggedInUser = (token) => {
    const tempheader = { headers: { Authorization: token } };
    const url = `http://localhost:3000/api/user/me`;
    axios
      .get(url, tempheader, tempheader)
      .then((res) => {
        localStorage.setItem("userData", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("err while getting logged in user", err);
      });
  };

  const getUserName = () => {
    setUserName(extractNameFromToken(token));
  };

  return (
    <SettingContext.Provider
      value={{
        displayAuthForm,
        token,
        loggedIn,
        tokenExipred,
        isAdmin,
        bearerToken,
        header,
        logoutVisible,
        userList,
        user,
        userName,
      }}
    >
      <SettingContextUpdate.Provider
        value={{
          toggleDisplayAuthForm,
          loginUser,
          createUser,
          toggleLogoutVisible,
          handelLogout,
          getUserList,
          getLoggedInUser,
          getUserName,
        }}
      >
        {children}
      </SettingContextUpdate.Provider>
    </SettingContext.Provider>
  );
};
