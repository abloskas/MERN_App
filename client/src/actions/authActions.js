import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
// Register User

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to localstorage
      const { token } = res.data;
      //set token to LS
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //then, set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out
export const logoutUser = () => dispatch => {
  //first, remove token from localstorage
  localStorage.removeItem("jwtToken");
  //next, remove auth header for future requests
  setAuthToken(false);
  //last, set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
