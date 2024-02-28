import axios from "../../axios-config";

export const loggedInCheckApi = async () => {
  try {
    const isLoggedIn = await axios.get("/user/isLoggedIn");
    console.log(isLoggedIn.data);
    return isLoggedIn.data === "OK" ? true : false;
  } catch (error) {
    return false;
  }
};
