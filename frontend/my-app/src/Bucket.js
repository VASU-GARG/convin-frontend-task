import Card from "./Card";
const Bucket = ({ name, cards }) => {
  return (
    <div className="bucket-div">
      <div className="bucket-name-div">
        <h2 style={{ color: "whitesmoke" }}>{name}</h2>
      </div>
      <div className="bucket-cards">
        {cards.map((card) => (
          <Card name={card.name} link={card.link} bucket_name={name} />
        ))}
      </div>
    </div>
  );
};

export default Bucket;
