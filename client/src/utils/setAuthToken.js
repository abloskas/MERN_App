import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply to every request, if exists
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //if not exist, delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
