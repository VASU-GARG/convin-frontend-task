import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [cardName, setCardName] = useState(location.state.cardName);
  const [bucketName, setBucketName] = useState(location.state.bucketName);
  const [cardLink, setCardLink] = useState(location.state.cardLink);
  const [newCardName, setNewCardName] = useState(cardName);
  const [newCardLink, setNewCardLink] = useState(cardLink);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  async function editCard() {
    fetch("http://localhost:4000/editCard", {
      method: "post",
      body: JSON.stringify({
        card_name: cardName,
        bucket_name: bucketName,
        card_link: cardLink,
        new_card_name: newCardName,
        new_card_link: newCardLink,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessage1("Card Updated Successfully");
    setMessage2("redirecting to the home page .... ");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div>
      <div className="heads">
        <h4 style={{ color: "white" }}>Edit Card</h4>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editCard();
        }}
      >
        <label for="card-name">Card Name:</label>
        <input
          type="text"
          id="name"
          className="text-input"
          name="name"
          required
          placeholder="Card Name"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
        />
        <label for="card-link">Card Link:</label>
        <input
          type="text"
          id="name"
          className="text-input"
          name="name"
          required
          placeholder="Card Link"
          value={newCardLink}
          onChange={(e) => setNewCardLink(e.target.value)}
        />
        <button className="submit-button">UPDATE</button>
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

export default EditCard;
