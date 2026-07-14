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

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: response.data.id,
          firstName: response.data.firstName,
          role: response.data.role,
        }),
      );

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
