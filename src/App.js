import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [indexValue, setIndexValue] = useState(0);

  const prevSlide = () => {
    if (indexValue > 0) {
      setIndexValue(indexValue - 1);
      return;
    }
    setIndexValue(people.length - 1);
  };

  const nextSlide = () => {
    if (indexValue < people.length - 1) {
      setIndexValue(indexValue + 1);
      return;
    }
    setIndexValue(0);
  };

  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [indexValue]);

  return (
    <main>
      <section className="container">
        <header className="head">
          <h1>
            <span>/ </span>Reviews
          </h1>
        </header>
        <section className="review-container">
          <button
            className="prev"
            onClick={() => {
              prevSlide();
            }}
          >
            <FaAngleLeft style={{ color: "white" }} />
          </button>

          {people.map((person, index) => {
            const { image, name, title, quote } = person;
            
            let slidePosition = "";
            if (index === indexValue) {
              slidePosition = "activeSlide";
            }
            if (index === indexValue + 1) {
              slidePosition = "nextSlide";
            }
            if (index > indexValue + 1) {
              slidePosition = "lastSlide";
            }
            if (index === indexValue - 1) {
              slidePosition = "lastSlide";
            }
            if (index < indexValue - 1) {
              slidePosition = "nextSlide";
            }

            return (
              <article key={index} className={slidePosition}>
                <div className="img-container">
                  <img src={image} alt="" />
                </div>
                <h1 className="person-name">{name}</h1>
                <h3 className="person-role">{title}</h3>
                <p className="person-info">{quote}</p>
                <FaQuoteRight
                  style={{
                    fontSize: "3rem",
                    margin: "1rem 0",
                    color: "#ba5d2c",
                  }}
                />
              </article>
            );
          })}
          <div className="btn-container">
            <button
              className="nxt"
              onClick={() => {
                nextSlide();
              }}
            >
              <FaAngleRight style={{ color: "white" }} />
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
