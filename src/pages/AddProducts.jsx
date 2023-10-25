import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import AuthPage from "./AuthPage";

export default function AddProducts() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { addProduct } = useProductContext();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    photo: "",
    category: "",
  });

  function handleChange(e) {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.photo.trim() ||
      !formValue.description.trim() ||
      !formValue.category.trim()
    ) {
      alert("Заполните поля");
      return;
    }
    addProduct({
      ...formValue,
      selected: false,
      likes: [],
      date: "",
      user: user.email,
    });

    navigate("/");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "150px",
    width: "50rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const leftColumnStyle = {
    flex: 1,
    marginRight: "10px",
  };

  const rightColumnStyle = {
    flex: 2,
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const selectStyle = {
    ...inputStyle,
    height: "40px",
  };

  const buttonStyle = {
    backgroundColor: "#1877f2",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    fontSize: "18px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={containerStyle}>
        <div style={leftColumnStyle}>
          <Typography variant="h5" style={{ marginBottom: "20px" }}>
            Добавить пост
          </Typography>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Название..."
              required
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              placeholder="Фото..."
              required
              name="photo"
              value={formValue.photo}
              onChange={handleChange}
              style={inputStyle}
            />
            <select
              id="category"
              name="category"
              value={formValue.category}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="экономический">экономический</option>
              <option value="социальный">социальный</option>
              <option value="правовые">правовые</option>
              <option value="юридический">юридический</option>
              <option value="экологический">экологический</option>
              <option value="парламентский">парламентский</option>
              <option value="правительственный">правительственный</option>
              <option value="общественный">общественный</option>
            </select>
            <button type="submit" style={buttonStyle}>
              Запостить
            </button>
          </form>
        </div>
        <div style={rightColumnStyle}>
          <textarea
            cols="50" // Adjust the number of columns
            rows="15"
            placeholder="Описание"
            required
            name="description"
            value={formValue.description}
            onChange={handleChange}
            style={{ ...inputStyle, height: "100%" }} // Make the textarea full height
          ></textarea>
        </div>
      </div>
    </Container>
  );
}
