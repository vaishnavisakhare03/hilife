import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import "./RegisterPage.css";

function RegisterPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        flatNumber: "",
        tower: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const passwordRegex =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$";

        if (!new RegExp(passwordRegex).test(formData.password)) {
            setError(
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
            );
            return;
        }

        try {

            setLoading(true);

            await api.post("/users/register", {
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                flatNumber: formData.flatNumber,
                tower: formData.tower
            });

            setSuccess("Account created successfully! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error("Registration error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to create account. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-header">
                    <h1>HiLife</h1>
                    <h2>Create Account</h2>
                    <p>Join your community</p>
                </div>

                <form onSubmit={handleRegister}>

                    <div className="form-row">

                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last name"
                                required
                            />
                        </div>

                    </div>

                    <div className="form-group">
                        <label>Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            placeholder="Middle name (optional)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            maxLength="10"
                            required
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Flat Number</label>
                            <input
                                type="text"
                                name="flatNumber"
                                value={formData.flatNumber}
                                onChange={handleChange}
                                placeholder="Flat number"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Tower</label>
                            <input
                                type="text"
                                name="tower"
                                value={formData.tower}
                                onChange={handleChange}
                                placeholder="Tower"
                                required
                            />
                        </div>

                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="register-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="register-success">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                <div className="login-link">
                    Already have an account?
                    <Link to="/login"> Sign in</Link>
                </div>

            </div>

        </div>
    );
}

export default RegisterPage;