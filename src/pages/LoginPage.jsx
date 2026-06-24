import { useState } from "react";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        phoneNumber,
        password,
      });

      localStorage.setItem("currentUser", JSON.stringify(response.data));

      navigate("/events");

      console.log("User saved:", response.data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
