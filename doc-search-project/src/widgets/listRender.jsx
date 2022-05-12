import React from "react";
import checkVal from "../utilities/checkValue";
import toTitleCase from "../utilities/casing";

function RenderList(props) {
  //this is the list
  console.log(`Date Label: ${props.dtLabel}`);
  const listData = props.listData;
  const element = (
    <>
      {listData.map((list, indx) => {
        return <p>{indx}</p>;
      })}
    </>
  );
  return (element)
}

export default RenderList;
