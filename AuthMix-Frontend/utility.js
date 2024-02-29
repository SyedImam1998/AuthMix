import Cookies from "js-cookie";
import { loggedInCheckApi } from "./src/Api/auth";

export const getCookiesDetails = () => {
  const isLoggedIn = Cookies.get("AuthMix-cookie");
  console.info(isLoggedIn)
  if (!isLoggedIn) return false;
  return true;
};

export const checkIsLoggedIn = async () => {
  const isLoggedIn = getCookiesDetails();
  console.info(isLoggedIn);
  if (!isLoggedIn) return false;
  try {
    const result = await loggedInCheckApi();
    console.log('result', result)
    return result;
  } catch (error) {
    console.error("Error while checking loggedin status:", error);
    alert("Something went wrong while checking loggedin status");
  }
};
