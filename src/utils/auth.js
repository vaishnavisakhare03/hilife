export const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user?.role === "ADMIN";
};

export const isLoggedIn = () => {

  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("currentUser");

  return !!(token && currentUser);
};