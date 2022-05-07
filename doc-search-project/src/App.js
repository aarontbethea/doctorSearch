import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';
//external widgets
import IndSearchForm from "./widgets/type-one-search.jsx";
import ResultsViewer from './widgets/resultsView';
function App() {
  //set up state value
  const [searchData,setData] = useState({});

  //set up condition to render results widget
  let resForm;
  const isEmpty = Object.keys(searchData).length === 0;
  console.log("Empty Object?");
  console.log(isEmpty);
  if (!isEmpty) {
    resForm = <ResultsViewer searchData={searchData}/>
  } else {
    resForm = <p><i>Enter search criteria to view results!</i></p>
  }

  return (
    <div className="App">
      <IndSearchForm searchData={searchData} setData={setData}/>
      <hr/>
      {resForm}
      
    </div>
  );
}

export default App;
