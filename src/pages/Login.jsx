// src/pages/Login.js
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons for visibility toggle
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import loginImage from "../assets/login.jpg"; // Add the correct path to your login image

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
      console.log("login", response.data);

      if (response.data.user) {
        Cookies.set("token", response.data.user, { expires: 1 / 6 });
        navigate("/home");
      } else {
        setErrorMessage("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword); 

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0e3",
        height: "100vh",
      }}
    >
      {/* Main Box for the two-column layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "column", md: "row", lg: "row", xs: "column" }, // Flex direction based on screen size
          width: { sm: "90vw", md: "60vw", lg: "60vw", xs: "90vw" },
          height: { sm: "90vh", md: "60vh", lg: "60vh", xs: "90vh" },
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "10px", 
          gap: "10px", 
        }}
      >
        {/* Left side with image */}
        <Box>
          <img
            src={loginImage}
            alt="Login"
            style={{ width: "100%", height: "100%", objectFit: "cover",borderRadius:"10px" }}
          />
        </Box>

        {/* Right side with the form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff", 
            padding: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle icon */}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
           
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 0 }}>
                  {errorMessage}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
