import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

function MoveCardForm() {
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const [buckets, setBuckets] = useState([]);
  const [fromBucket, setFromBucket] = useState(location.state.bucketName);
  const [toBucket, setToBucket] = useState("");
  const [cardName, setCardName] = useState(location.state.cardName);
  const [cardLink, setCardLink] = useState(location.state.cardLink);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  useEffect(() => {
    requestBuckets();
  }, []);

  async function requestBuckets() {
    const res = await fetch("http://localhost:4000/getuserDetails");
    const json = await res.json();
    setBuckets(json.buckets);
  }

  async function moveCard() {
    console.log(fromBucket);
    console.log(toBucket);
    console.log(cardName);
    // console.log(newBucketName);
    fetch("http://localhost:4000/moveCard", {
      method: "post",
      body: JSON.stringify({
        fromBucketName: fromBucket,
        toBucketName: toBucket,
        cardName: cardName,
        cardLink: cardLink,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessage1("Card Moved Successfully");
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
          moveCard();
        }}
      >
        <div className="move-card-initial-info">
          <p style={{ color: "black" }}>Bucket Name : {fromBucket}</p>
          <p style={{ color: "black" }}>Card Name : {cardName}</p>
        </div>
        <label htmlFor="toBucketSelection">
          Choose The Bucket To Which You Want To Move This Card
          <select
            className="select-input"
            id="select-to-bucket"
            value={toBucket}
            placeholder="Choose To Bucket"
            onChange={(e) => {
              setToBucket(e.target.value);
            }}
            onBlur={(e) => {
              setToBucket(e.target.value);
            }}
          >
            <option />
            {buckets.map((data) => (
              <option key={data.name} value={data.name}>
                {data.name}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <button className="submit-button">MOVE</button>
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
}

export default MoveCardForm;
