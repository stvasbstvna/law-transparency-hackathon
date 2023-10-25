import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage() {
  const navigate = useNavigate();
  const { updateProduct, getOneProduct, product } = useProductContext();
  const { id } = useParams();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    price: "",
    photo: "",
    category: "",
  });

  useEffect(() => {
    getOneProduct(id);
  }, []);

  useEffect(() => {
    if (product) {
      setFormValue(product);
    }
  }, [product]);

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
      return;
    }

    updateProduct(id, { ...formValue, price: +formValue.price, likes: [] });

    navigate(-1);
  };

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f0f2f5", // Фоновый цвет, аналогичный фейсбуку
  };

  const formStyle = {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    background: "#fff", // Фон формы, аналогичный фейсбуку
    borderRadius: "8px", // Закругленные углы формы, как у фейсбука
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Тень, аналогичная фейсбуку
  };

  const inputStyle = {
    marginBottom: "20px",
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  };

  return (
    <div style={pageStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Новый продукт</h1>
        <input
          style={inputStyle}
          placeholder="Title"
          required
          name="title"
          autoFocus
          value={formValue.title}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          placeholder="Description"
          required
          name="description"
          value={formValue.description}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          placeholder="Price"
          required
          name="price"
          type="number"
          value={formValue.price}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          placeholder="Photo"
          required
          name="photo"
          value={formValue.photo}
          onChange={handleChange}
        />

        <select
          style={inputStyle}
          name="category"
          value={formValue.category}
          onChange={handleChange}
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

        <button type="submit" style={inputStyle}>
          Change
        </button>
      </form>
    </div>
  );
}
