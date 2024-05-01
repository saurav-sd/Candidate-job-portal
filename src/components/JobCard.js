import React, { useState } from "react";
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

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {jobData &&
        jobData.map((job) => (
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
    </Box>
  );
}

export default JobCard;
