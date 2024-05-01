import React,{useState, useEffect} from "react";
import "./App.css";
import JobCard from "./components/JobCard";
import fetchData from "./components/fetchJobData";

function App() {

  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const data = await fetchData();
        console.log("data :", data.jdList);
        setJobData(data.jdList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobData();
  }, []);

  
  return (
    <div className="App">
        <JobCard jobData={jobData} />
    </div>
  );
}

export default App;
