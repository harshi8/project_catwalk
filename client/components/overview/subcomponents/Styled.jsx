import React from 'react';
import styled from "styled-components";

//component styles
const OverviewWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(150px, 40%);
  margin-bottom: 1rem;
`;

const Banner = styled.div`
  height: 2rem;
  grid-column: 1 / span 2;
  text-transform: uppercase;
  font-style: italic;
  vertical-align: middle;
  display: grid;
  place-items: center;
`;

//right side elements
const Slogan = styled.h2`
  margin-top: 1rem;
  margin-left: 10%;
  width: 90%;
  align-self: end;
  color: #3D4849;
`;

const Description = styled.div`
  margin-left: 10%;
  width: 90%;
  align-self: end;
`;

//left side elements
const StarsWrapper = styled.div`
  margin-top: 2rem;
  font-size: .8rem;
  display: flex;
  & > a {
    margin-left: 1rem;
  }
`;

const Category = styled.div`
  padding: .5rem 0;
  text-transform: uppercase;
  color: grey;
`;

const Name = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #3D4849;
`;

const Price = styled.div`
  margin: 1rem 0;
`;

const ButtonRow1 = styled.div`
  margin-top: 1rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonRow2 = styled.div`
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyleHeader = styled.div`
  margin-top: -1rem;
  & > h4 {
    display: inline-block;
  }
`;

const StyleSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 1rem;
  width: 80%;
`;

const StyleContainer = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  height: 3.75rem;
  width: 3.75rem;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const FeatureChecklist = styled.div`
  margin-top: 1.5rem;
  margin-left: 1rem;
  display: flex;
  flex-flow: column nowrap;
`;

const Column1 = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Column2 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-left: 1rem;
`;

const SocialButtonRow = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: space-evenly;
  & > * {
    color: inherit;
  }
`;

export { SocialButtonRow, Column1, Column2, FeatureChecklist, StyleContainer, StyleSelector, StyleHeader, ButtonRow2, ButtonRow1, Price, Name, Category, StarsWrapper, Description, Slogan, Banner, OverviewWrapper };