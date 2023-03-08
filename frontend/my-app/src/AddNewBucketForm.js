import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewBucketForm = () => {
  const navigate = useNavigate();
  const [newBucketName, setNewBucketName] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  async function storeNewBucket() {
    // console.log(newBucketName);
    fetch("http://localhost:4000/addNewBucket", {
      method: "post",
      body: JSON.stringify({ bucketName: newBucketName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessage1("Bucket Added Successfully");
    setMessage2("redirecting to the home page .... ");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }
  return (
    <div>
      <div className="heads">
        <h4 style={{ color: "white" }}>Add Bucket</h4>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          storeNewBucket();
        }}
      >
        <label for="bucket-name">Bucket Name:</label>
        <input
          type="text"
          id="name"
          className="text-input"
          name="name"
          required
          value={newBucketName}
          placeholder="Bucket Name"
          onChange={(e) => setNewBucketName(e.target.value)}
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
