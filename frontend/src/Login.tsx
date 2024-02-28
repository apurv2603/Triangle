import {
  Container,
  Box,
  CardMedia,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/verifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          password: password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("User verified:", user);
        navigate(`/Dj/${email}`);
      } else if (response.status === 401) {
        console.log("Invalid credentials");
      } else {
        console.error("Failed to verify user");
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image="/triangleLogo.png"
            alt="Custom Logo"
            sx={{ width: 120, height: 100 }} // Adjust width and height as needed
          />
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#d2343e", // Custom background color
                color: "white", // Text color
                "&:hover": {
                  backgroundColor: "#a82a32", // Change background color on hover
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
