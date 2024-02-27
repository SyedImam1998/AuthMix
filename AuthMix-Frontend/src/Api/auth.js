import axios from "../../axios-config";

export const auth = async () => {
  try {
    const isLoggedIn = await axios.get("/checkIsLoggedIn");
    if (!isLoggedIn) throw new Error("token expired");
    return isLoggedIn;
  } catch (error) {
    return error;
  }
};
