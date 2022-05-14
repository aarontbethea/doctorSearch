const getAPIResult = async (url,setData) => {
    const response = await fetch(url);
    const jsonData = await response.json();
    props.setData(jsonData);
    console.log("Request Returned");
    console.log(jsonData);
  };

export default getAPIResult;