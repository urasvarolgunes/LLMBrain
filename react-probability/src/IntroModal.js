import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "reactstrap";

function ModalComponent({
  windowTextId,
  handleNext,
  modalIsOpen,
  setModalIsOpenToFalse,
  setModalIsOpenToTrue,
}) {
  const windowTextList = [
    "Welcome to LLMBrain! This app lets you play with Large Language Models and observe how they think behind the scenes.",
    `The main objective of generative LLMs such as ChatGPT, is to determine what the NEXT WORD should be for a GIVEN A SEQUENCE OF WORDS.
     Behind the scenes, the model calculates the probability of each word in the corpus being the next one and picks one the top rated words.`,
    `The corpus consists of all the words that the model has seen during its learning phase. More than 50,000 words in a corpus is pretty common.`,
    `In the example on the left, the current sequence consists of the five words: ["The", "winners", "of", "this", "year's"].`,
    "The model has already calculated the probabilities for the next possible words. We show the top 10 here.",
    "You can click on one of the possible next words to update the current sequence. The model will update its calculations to include the last word.",
    "You can click on 'Delete Last Word' to delete the last word from the sequence.",
    `If you wish to start the sequence with a different word, you can pick from the options provided below.
     You can click on 'Instructions' to see these instructions again at any time. Hope you enjoy the app!`,
  ];

  const customStyles = {
    content: {
      height: "45vh",
      width: "40vw",
      marginTop: "30vh",
      marginBottom: "25vh",
      marginRight: "25vw",
      marginLeft: "50vw",
      backgroundColor: "orange",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <Button
          color="danger"
          style={{
            height: "4vh",
            width: "4vh",
            alignSelf: "end",
            justifySelf: "start",
          }}
          onClick={setModalIsOpenToFalse}
        >
          x
        </Button>
        <img
          src="/llm_brain.webp"
          style={{
            borderRadius: "3vw",
            height: "14vh",
            width: "14vh",
            alignSelf: "center",
          }}
        />
        <p style={{ marginTop: "5vh" }}> {windowTextList[windowTextId]} </p>
        <Button
          color="success"
          onClick={
            windowTextId === windowTextList.length - 1
              ? setModalIsOpenToFalse
              : handleNext
          }
        >
          {windowTextId === windowTextList.length - 1
            ? "Complete Tutorial"
            : "Next"}
        </Button>
      </Modal>
    </div>
  );
}
export default ModalComponent;
