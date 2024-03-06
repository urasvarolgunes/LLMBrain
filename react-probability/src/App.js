import logo from "./logo.svg";
import "./App.css";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import IntroModal from "./IntroModal";

function App() {
  const firstWordChoices = [
    "Love",
    "Aliens",
    "World",
    "Dogs",
    "Ocean",
    "Politics",
  ];
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
    setWindowTextId((prev) => 0);
  };

  const [windowTextId, setWindowTextId] = useState(0);

  const handleNext = () => {
    setWindowTextId((prev) => prev + 1);
  };

  const [prevTokens, setPrevTokens] = useState([
    "The",
    " winners",
    " of",
    " this",
    " year's",
  ]);
  const [candidates, setCandidates] = useState({ tokens: [], values: [] });

  // useEffect is called when prevTokens changes, and also at the first render.
  useEffect(() => {
    console.log("after new word:" + prevTokens);
    console.log("probs", candidates.values);
    fetch("http://159.203.156.200", {
      method: "POST",
      body: JSON.stringify({
        text: prevTokens.join(""),
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) =>
        setCandidates((prev) => {
          return response;
        })
      )
      .catch((error) => console.error(error));
  }, [prevTokens]);

  const pickWord = ({ target }) => {
    const newToken = target.innerHTML;
    setPrevTokens((prev) => {
      return [...prev, newToken];
    });
  };

  const deleteLast = () => {
    if (prevTokens.length === 1) {
      const message =
        "If you wish to start the sequence with a different word, please pick a new first word from the choices below!";
      alert(`${message}`);
    } else {
      setPrevTokens((prev) => {
        return prev.slice(0, -1);
      });
    }
  };

  const changeFirstWord = ({ target }) => {
    const newFirstToken = target.innerHTML;
    setPrevTokens((prev) => {
      return [newFirstToken];
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1> LLM Brain </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            color="light"
            onClick={deleteLast}
            style={{
              borderWidth: windowTextId > 5 ? "5px" : 0,
              borderColor: "yellow",
            }}
          >
            {" "}
            Delete Last Word
          </Button>
          <Button
            onClick={setModalIsOpenToTrue}
            style={{
              borderWidth: windowTextId > 6 ? "5px" : 0,
              borderColor: "orange",
            }}
          >
            {" "}
            Instructions{" "}
          </Button>
          <IntroModal
            windowTextId={windowTextId}
            handleNext={handleNext}
            modalIsOpen={modalIsOpen}
            setModalIsOpenToFalse={setModalIsOpenToFalse}
            setModalIsOpenToTrue={setModalIsOpenToTrue}
          >
            {" "}
          </IntroModal>
        </div>

        <div
          style={{
            width: "95vw",
            height: "5vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {prevTokens.map((token, index) => (
            <div>
              <p style={{ marginRight: "2vw", color: "aqua" }}> {index + 1} </p>
              <Button color="danger" style={{ marginRight: "1vw" }}>
                {" "}
                {token}{" "}
              </Button>
              <p style={{ color: "yellow" }}> {windowTextId > 2 && "^"} </p>
            </div>
          ))}
          <div
            style={{
              height: "50vh",
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-between",
              marginRight: "1vh",
            }}
          >
            <p style={{ color: "aqua" }}> Next Word </p>
            {candidates.tokens.map((token) => (
              <Button
                color="success"
                onClick={pickWord}
                style={{
                  borderWidth: windowTextId > 4 ? "5px" : 0,
                  borderColor: "orange",
                }}
              >
                {token}
              </Button>
            ))}
          </div>

          <div
            style={{
              height: "50vh",
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "aqua" }}> Probability </p>
            {candidates.values.map((value) => (
              <Button
                color="info"
                style={{
                  borderWidth: windowTextId > 3 ? "5px" : 0,
                  borderColor: "yellow",
                  pointerEvents: "none",
                }}
              >
                {(Math.round(value * 10000) / 100).toString() + "%"}
              </Button>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "50vh",
            alignSelf: "start",
            borderColor: "yellow",
            borderWidth: 5,
            borderStyle: windowTextId > 6 ? "dashed" : "none",
          }}
        >
          <p style={{ marginRight: "1vw", marginLeft: "1vw" }}>
            {" "}
            Change First Word To:{" "}
          </p>
          {firstWordChoices.map((token, index) => (
            <Button
              onClick={changeFirstWord}
              color="danger"
              style={{ marginRight: "1vw" }}
            >
              {token}
            </Button>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
