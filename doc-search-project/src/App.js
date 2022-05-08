import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
//external widgets
import IndSearchForm from "./widgets/type-one-search.jsx";
import ResultsViewer from './widgets/resultsView';

//sample modal
function App() {
  //set up state value
  const [searchData,setData] = useState({});

  //set up condition to render results widget
  let resForm;
  const isEmpty = Object.keys(searchData).length === 0;
  console.log("Empty Object?");
  console.log(isEmpty);
  if (!isEmpty) {
    if ('result_count' in searchData){
      resForm = <ResultsViewer searchData={searchData}/>
    //check result structure
    } else if ('Errors' in searchData) {
      //render the error description
      resForm = <div className="alert alert-warning" role="alert">
        {searchData.Errors[0].description}
    </div>
      //return 
    } else {
      resForm = <div className="alert alert-danger" role="alert">
      An unknown error occurred
    </div>
    }
    
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
