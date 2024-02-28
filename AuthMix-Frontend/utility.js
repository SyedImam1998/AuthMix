import Cookies from "js-cookie";

export const getCookiesDetails=()=>{
    const isLoggedIn=Cookies.get("isLoggedIn");
    return isLoggedIn;
}

export  const checkIsLoggedIn = async () => {
    const isLoggedIn = getCookiesDetails();
    console.info(isLoggedIn)
    if (!isLoggedIn) return setIsLoggedIn(false);
    try {
      const result = await loggedInCheckApi();
      setIsLoggedIn(result);
    } catch (error) {
      console.error("Error while checking loggedin status:", error);
      alert("Something went wrong while checking loggedin status");
    }
  };
