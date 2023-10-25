import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";

const defaultTheme = createTheme();

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, register, login } = useAuthContext();
  const { addUser } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    if (isLogin) {
      login(data.get("email"), data.get("password"));
    } else {
      register(
        data.get("email"),
        data.get("password"),
        data.get("displayName"),
        data.get("photoURL"),
        data.get("phone")
      );
      const newUser = {
        email: data.get("email"),
        name: data.get("displayName"),
        photoURL: data.get("photoURL"),
        phone: data.get("phone"),
      };
      addUser(newUser);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ marginTop: "150px" }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
          <Typography component="h1" variant="h5">
            {isLogin ? "Вход" : "Регистрация"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="displayName"
                  label="Имя"
                  name="displayName"
                  autoFocus
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="photoURL"
                  label="Фото"
                  name="photoURL"
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Телефон"
                  name="phone"
                  type="number"
                />
              </>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  onClick={() => setIsLogin((prev) => !prev)}
                  href="#"
                  variant="body2"
                >
                  {isLogin
                    ? "Нет аккаунта? Зарегистрироваться"
                    : "Уже есть аккаунт? Войти"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
