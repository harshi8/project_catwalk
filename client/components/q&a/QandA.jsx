import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { CgSearch } from 'react-icons/cg';
import QuestionSearch from './subcomponents/QuestionSearch.jsx';

const QandAStyle = styled.div`
  background-color: LightGray;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`;

const QandA = (props) => {
  return (
    <>
      <QandAStyle>
        <div>Questions and Answers</div>
        <QuestionSearch current={props}/>
        <div>-------------------------------------------------------</div>
        <div>
          <span>
            Question: Does this work?
            </span>
            <span>
              Helpful? Yes 25 | Add Answer
          </span>
        </div>
        <div>Answer: It does for now <b/>
          <div>by User1337, May 1, 2019 | Helpful? Yes(0) | Report</div>
        </div>
        <button>More Answered Questions</button>
        <button>Add a question +</button>
      </QandAStyle>
    </>
  );
}

export default QandA;