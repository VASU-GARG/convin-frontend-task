import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddNewBucketForm from "./AddNewBucketForm";
import AddNewCardForm from "./AddNewCardForm";
import MoveCardForm from "./MoveCardForm";
import ViewHistory from "./ViewHistory";
import AddButton from "./AddButton";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <header>
      <nav class="navbar navbar-expand-lg  fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">
            <AddButton url="" msg1="HOME" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <AddButton url="addNewBucket" msg1="ADD NEW BUCKET" />
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <AddButton url="addNewCard" msg1="ADD NEW CARD" />
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <AddButton url="viewHistory" msg1="HISTORY" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <Link to="/">HOME</Link>
      <AddButton url="addNewBucket" msg1="ADD NEW BUCKET" />
      <AddButton url="addNewCard" msg1="ADD NEW CARD" />
      <AddButton url="viewHistory" msg1="HISTORY" /> */}
    </header>
    <Routes>
      <Route path="/addNewBucket" element={<AddNewBucketForm />} />
      <Route path="/addNewCard" element={<AddNewCardForm />} />
      <Route path="/moveCard" element={<MoveCardForm />} />
      <Route path="/viewHistory" element={<ViewHistory />} />
      <Route path="/deleteCard" element={<DeleteCard />} />
      <Route path="/editCard" element={<EditCard />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
