import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DeleteCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [cardName, setCardName] = useState(location.state.cardName);
  const [bucketName, setBucketName] = useState(location.state.bucketName);
  const [cardLink, setCardLink] = useState(location.state.cardLink);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  async function deleteCard() {
    fetch("http://localhost:4000/deleteCard", {
      method: "post",
      body: JSON.stringify({
        card_name: cardName,
        bucket_name: bucketName,
        card_link: cardLink,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessage1("DELETED");
    setMessage2("redirecting to the home page .... ");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteCard();
        }}
      >
        <label for="bucket-name">Are You Sure To Delete This Card</label>
        <br></br>
        <br></br>
        <button className="submit-button">YES</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <div className="heads">
        <h6 style={{ color: "white" }}>{message1}</h6>
        <br></br>
        <p style={{ color: "white" }}>{message2} </p>
      </div>
    </div>
  );
};

export default DeleteCard;
