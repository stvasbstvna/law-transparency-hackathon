import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const commentsContext = createContext();
const APIcomments = "http://localhost:8000/comments";

export function useCommentContexts() {
  return useContext(commentsContext);
}

const CommentsContext = ({ children }) => {
  const [comments, setComments] = useState([]);

  async function getComments() {
    const { data } = await axios(APIcomments);
    setComments(data);
  }
 
  async function addComment(newData) {
    await axios.post(APIcomments, newData);
    getComments();
  }

  const value = {
    comments,
    getComments,
    addComment,
  };
  return (
    <commentsContext.Provider value={value}>
      {children}
    </commentsContext.Provider>
  );
};

export default CommentsContext;
