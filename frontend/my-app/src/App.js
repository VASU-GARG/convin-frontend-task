import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Bucket from "./Bucket";

function App() {
  const [buckets, setBuckets] = useState([]);

  async function requestBuckets() {
    const res = await fetch("http://localhost:4000/getuserDetails");
    const json = await res.json();
    setBuckets(json.buckets);
  }

  useEffect(() => {
    requestBuckets();
  }, []);

  useEffect(() => {
    console.log(buckets);
  }, [buckets]);

  return (
    <div>
      {buckets.map((data, key) => (
        <Bucket name={data.name} cards={data.cards} />
      ))}
    </div>
  );
}

export default App;
