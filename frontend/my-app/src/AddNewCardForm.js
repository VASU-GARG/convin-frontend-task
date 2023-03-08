import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddNewBucketForm = () => {
  const navigate = useNavigate();
  const [newCardName, setNewCardName] = useState("");
  const [newCardLink, setNewCardLink] = useState("");
  const [bucketSelected, setBucketSelected] = useState("");
  const [buckets, setBuckets] = useState([]);
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

  async function storeNewCard() {
    // console.log(newBucketName);
    fetch("http://localhost:4000/addNewCard", {
      method: "post",
      body: JSON.stringify({
        bucketName: bucketSelected,
        cardName: newCardName,
        cardLink: newCardLink,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessage1("Card Added Successfully");
    setMessage2("redirecting to the home page .... ");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }
  return (
    <div>
      <div className="heads">
        <h4 style={{ color: "white" }}>Add Card</h4>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          storeNewCard();
        }}
      >
        <label htmlFor="bucketSelection">
          Choose the Bucket
          <br></br>
          <select
            className="select-input"
            id="select-bucket"
            value={bucketSelected}
            placeholder="Choose Bucket"
            onChange={(e) => {
              setBucketSelected(e.target.value);
            }}
            onBlur={(e) => {
              setBucketSelected(e.target.value);
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

        <input
          id="newCardName"
          className="text-input"
          value={newCardName}
          placeholder="Card Name"
          onChange={(e) => setNewCardName(e.target.value)}
        />

        <input
          id="newCardLink"
          className="text-input"
          value={newCardLink}
          placeholder="Card Link"
          onChange={(e) => setNewCardLink(e.target.value)}
        />
        <button className="submit-button">ADD</button>
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

export default AddNewBucketForm;
