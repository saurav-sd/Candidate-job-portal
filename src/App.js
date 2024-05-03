import React,{useState, useEffect} from "react";
import "./App.css";
import JobCard from "./components/JobCard";
import fetchData from "./components/fetchJobData";
import Filters from "./components/Filters";

function App() {

  const [jobData, setJobData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  // const [originalData, setOriginalData] = useState(null);
  const [filteredDataChange, setFilteredDataChange] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const data = await fetchData();
        // console.log("data :", data.jdList);
        setJobData(data.jdList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobData();
  }, []);

  const handleFilterChange = (filteredData) => {
    setFilteredData(filteredData);
  };
  
  const handleFilterDataChange = () => {
    setFilteredDataChange(true); // Reset filteredData to original unfiltered data
  };
  

  
  return (
    <div className="App">
      <Filters jobData={jobData} onFilterChange={handleFilterChange} onFilterDataChange={handleFilterDataChange} />
      {(filteredDataChange && filteredData === null) ? (
        <div className="no-data-message">No data found.</div>
      ) : (
        <JobCard jobData={filteredDataChange ? filteredData : jobData} />
      )}
    </div>
  );
}

export default App;
