import { useState, useEffect } from "react";

const ViewHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  async function getHistory() {
    const res = await fetch("http://localhost:4000/getuserDetails");
    const json = await res.json();
    setHistory(json.history);
  }

  return (
    <div>
      <div className="history-msg-div">
        <h2 style={{ color: "whitesmoke" }}>HISTORY</h2>
      </div>
      {history
        .slice()
        .reverse()
        .map((data, index) => (
          <div className="history-card-div">
            <div className="history-card-link-div">
              <h4 style={{ color: "black" }}>Card Name : {data.cardName}</h4>
              <h4 style={{ color: "black" }}>
                Link :{" "}
                <a className="history-link" href={data.link} target="_blank">
                  {data.link}
                </a>
              </h4>
            </div>

            <div className="history-date-time-div">
              <h4 style={{ color: "black" }}>{data.date}</h4>
              <h4 style={{ color: "black" }}>{data.time}</h4>
            </div>
          </div>
        ))}
    </div>
  );
};
export default ViewHistory;
