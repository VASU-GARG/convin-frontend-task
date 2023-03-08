import { Link } from "react-router-dom";
// import addNewBucketForm from "./addNewBucketForm"

const AddButton = ({ url, msg1 }) => {
  return (
    <Link to={`/${url}`}>
      <div className="button-div">
        <button className="button">{msg1}</button>
      </div>
    </Link>
  );
};

export default AddButton;
