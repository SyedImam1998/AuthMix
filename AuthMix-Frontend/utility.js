import Cookies from "js-cookie";
import { loggedInCheckApi } from "./src/Api/auth";
import axios from "./axios-config";

export const getCookiesDetails = () => {
  const isLoggedIn = Cookies.get("AuthMix-cookie");
  console.info(isLoggedIn);
  if (!isLoggedIn) return false;
  return true;
};

export const checkIsLoggedIn = async () => {
  const isLoggedIn = getCookiesDetails();
  console.info(isLoggedIn);
  if (!isLoggedIn) return false;
  try {
    const result = await loggedInCheckApi();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error while checking loggedin status:", error);
    alert("Something went wrong while checking loggedin status");
  }
};

export const checkValidJwtAccessToken = async () => {
  try {
    const data = await axios.post("/jwtUser/checkValidJwtToken", {
      email: "syedimam1998@gmail.com", // should be dynamic email
    });
    console.log(data.data);
    return data.data === "OK" ? true : false;
  } catch (error) {
    return false;
  }
};
