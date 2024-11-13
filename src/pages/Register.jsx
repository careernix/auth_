// src/pages/Register.js
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import registerImage from "../assets/register.jpg"; // Ensure the correct image import path

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility of password
  const [errorMessage, setErrorMessage] = useState(""); // For storing validation error messages
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields and email format
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password,
      });
      console.log("response", response.data);
      navigate("/login");
    } catch (error) {
      console.error("There was an error registering:", error);
      setErrorMessage("There was an error with the registration. Please try again.");
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "column", md: "row", lg: "row", xs: "column" },
          width: { sm: "90vw", md: "60vw", lg: "60vw", xs: "90vw" },
          height: { sm: "90vh", md: "60vh", lg: "60vh", xs: "90vh" },
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "10px",
          gap: "10px",
        }}
      >
        <Box sx={{ height: { xs: "300px", lg: "100%", md: "100%", sm: "100%" } }}>
          <img
            src={registerImage}
            alt="Register"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
          />
        </Box>

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
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!emailRegex.test(email) && email.length > 0} 
                helperText={
                  !emailRegex.test(email) && email.length > 0
                    ? "Please enter a valid email address."
                    : ""
                }
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 0}}>
                  {errorMessage}
                </Alert>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>

              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
