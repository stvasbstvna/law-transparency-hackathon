import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useCommentContexts } from "../contexts/CommentsContext";
import "./SideBar.css";

const Details = ({ item }) => {
  const { isAdmin, user } = useAuthContext();
  const { deleteProduct } = useProductContext();
  const { comments, getComments, addComment } = useCommentContexts();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [commentVal, setCommentVal] = useState("");
  const [userka, setUserka] = useState(false);
  // a
  useEffect(() => {
    if (user) {
      if (typeof user === "boolean") {
        console.log("huinia");
        setUserka(false);
      } else {
        console.log("works");
        setUserka(user.email);
        setUserInfo(user);
      }
    }
  }, [user]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getComments();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!commentVal.trim()) {
      return;
    }
    const newComment = {
      productId: id,
      comment: commentVal,
      userEmail: userInfo.email,
      userPhoto: userInfo.photo,
    };
    addComment(newComment);
    console.log(newComment);
    setCommentVal("");
  }
  function handleChange(e) {
    setCommentVal(e.target.value);
  }

  const dollars = item.price * 89;

  return (
    <div className="details">
      <div className="first_block">
        <div className="first_block_item_first">
          <img src={item.photo} alt="" />
        </div>
        <div className="first_block_item_second">
          <div className="first_block_item_second_div">
            {/* <p>{dollars} kgs </p> */}
          </div>

          <div>
            <div>{/* <p>{item.user}</p> */}</div>
          </div>
          {userka ? (
            item.user === userka || isAdmin() ? (
              <div className="buttonsholder">
                <button
                  className="DeleteDetails"
                  onClick={() => {
                    const a = window.confirm("Are you sure?");
                    if (a) {
                      deleteProduct(item.id);
                      navigate(-1);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/edit/${item.id}`)}
                  className="EditDetails"
                >
                  Edit
                </button>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="second_block">
        <Typography variant="h4">{item.title}</Typography>
        <Typography variant="h6">{item.description}</Typography>
        <Typography variant="h5">Category: {item.category}</Typography>
      </div>
      {userka && (
        <div className="app-container">
          <form className="message_form" onSubmit={handleSubmit}>
            <textarea
              className="message_input"
              value={commentVal}
              onChange={handleChange}
              placeholder="Type your Comment"
              required
            />
            <button type="submit" className="send_button">
              Отправить
            </button>
          </form>

          {comments
            .filter((commentItem) => id === commentItem.productId)
            .map((commentItem, index) => (
              <div key={index} className="user_info">
                {/* <img
                  src={commentItem.userPhoto} // Add user photo here
                  alt="Аватар пользователя"
                  className="avatar"
                /> */}
                <div className="user_details">
                  <span>{commentItem.userEmail}</span>
                  <p>{commentItem.comment}</p>
                  <hr />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Details;
