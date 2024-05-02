import React,{useState, useEffect} from "react";
import "./App.css";
import JobCard from "./components/JobCard";
import fetchData from "./components/fetchJobData";
import Filters from "./components/Filters";

function App() {

  const [jobData, setJobData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

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
  

  
  return (
    <div className="App">
      <Filters jobData={jobData} onFilterChange={handleFilterChange}/>
      {filteredData && filteredData.length > 0 ? (
            <JobCard jobData={filteredData} />
        ) : (
            <JobCard jobData={jobData} />
        )}
    </div>
  );
}

export default App;
