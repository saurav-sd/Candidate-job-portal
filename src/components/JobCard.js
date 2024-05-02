import React, { useState,useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import './JobCard.css';

function JobCard({ jobData }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [jobList, setJobList] = useState([]); // Initialize jobList state as an empty array

  const toggleFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  console.log("job data", jobData);

  const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    // Add more currencies as needed
  };

  // Function to load more job data
  const loadMoreData = async () => {
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        limit: 10,
        offset: offset + 10, // Increment offset to fetch the next set of data
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch job data");
      }

      const newData = await response.json();
      setOffset(offset + 10); // Update offset
      setIsLoading(false);

      // Append new job data to existing list
      setJobList((prevData) => [...prevData, ...newData.jdList]);
    } catch (error) {
      console.error("Failed to fetch job data:", error);
      setIsLoading(false);
    }
  };

  // Function to handle scroll event
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
      loadMoreData();
    }
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // Update jobList state when jobData prop changes
  useEffect(() => {
    setJobList(jobData || []); // Update jobList with jobData if it exists, otherwise set it to an empty array
  }, [jobData]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {jobList &&
        jobList.map((job) => (
          <Card
            key={job.jdUid}
            sx={{ minWidth: 200, maxWidth: 300, margin: 5 }}
            className="job-card"
          >
            <CardContent style={{ textAlign: "left" }}>
              <Typography variant="h6" component="div">
                {job.jobRole}
              </Typography>
              <Typography>{job.location}</Typography>
              <Typography>
                {currencySymbols[job.salaryCurrencyCode]}
                {job.minJdSalary != null ? job.minJdSalary : 0} -{" "}
                {job.maxJdSalary} {job.salaryCurrencyCode}
              </Typography>
              <Typography variant="h5" style={{ fontWeight: 500 }}>
                About Companey :
              </Typography>
              <Typography variant="h7" style={{ fontWeight: 800 }}>
                About us
              </Typography>
              {showFullContent ? (
                <Typography>{job.jobDetailsFromCompany}</Typography>
              ) : (
                <Typography>
                  {job.jobDetailsFromCompany.substr(0, 150)}{" "}
                  {/* Displaying only first 150 characters */}
                  {job.jobDetailsFromCompany.length > 150 && "... "}
                  <Link
                    onClick={toggleFullContent}
                    sx={{ textDecoration: "none" }}
                  >
                    View More
                  </Link>
                </Typography>
              )}
              {showFullContent && (
                <Typography>
                  <Link
                    onClick={toggleFullContent}
                    sx={{ textDecoration: "none" }}
                  >
                    View Less
                  </Link>
                </Typography>
              )}
              <Typography
                sx={{ marginTop: 2, fontWeight: "bold" }}
                color="text.secondary"
              >
                Minimum Experience
              </Typography>
              <Typography>{job.minExp != null ? job.minExp : 0}</Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                        variant="contained"
                        component="a"
                        href={job.jdLink}
              >
                Easy Apply
              </Button>
            </CardActions>
          </Card>
        ))}
      {isLoading && <div>Loading...</div>}
    </Box>
  );
}

export default JobCard;
