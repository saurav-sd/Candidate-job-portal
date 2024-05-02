import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

function Filters({jobData, onFilterChange}) {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [experience, setExperience] = useState('');
    const [salary, setSalary] = useState('');
    const [filteredData, setFilteredData] = useState(jobData || []);
    

    console.log("jobData= ", jobData)
    // JobRole
    const roles = jobData ? [...new Set(jobData.map(job => job.jobRole))] : []; // Extract unique job roles from jobData
    const filteredRoles = roles.filter(role => role.toLowerCase().includes(role.toLowerCase()));

    //Location
    const locations = jobData ? [...new Set(jobData.map(job => job.location))] : []; // Extract unique Location from jobData
    const filteredLocation = locations.filter(location => location.toLowerCase().includes(location.toLowerCase()));

    //Minimum experience
    const experiences = jobData ? [...new Set(jobData.map(job => job.minExp))] : []; // Extract unique Experience from jobData
    const filteredExperience = experiences.filter((experience, index, self) => self.indexOf(experience) === index).sort((a, b) => a - b);;

    console.log("filteredExperience=", filteredExperience);

    //Minimum Salary
    const salaries = jobData ? [...new Set(jobData.map(job => job.minJdSalary))] : []; // Extract unique Salary from jobData
    const filteredSalary = salaries.filter((salary,index,self) => self.indexOf(salary) === index).sort((a, b) => a - b);

    console.log("filteredRoles=", filteredRoles);
    console.log("filteredData=", filteredData);
    
    const handleJobChange = (event, newValue) => {
        console.log("newvalue =", newValue);
        // const selectedRole = event.target?.value || ''; // Get the selected value from newValue
        setRole(newValue, event.target.value);
    
        // Filter jobData based on selected role and update filteredData
        const filteredData = jobData.filter(job => job.jobRole.toLowerCase() === newValue?.toLowerCase());
        setFilteredData(filteredData);
        onFilterChange(filteredData);
    
        console.log("filteredData=", filteredData);
    };

    const handleLocationChange = (event, newValue) => {
        console.log("newvalue =", newValue);
        // const selectedRole = event.target?.value || ''; // Get the selected value from newValue
        setLocation(newValue, event.target.value);
    
        // Filter jobData based on selected role and update filteredData
        const filteredData = jobData.filter(job => job.location.toLowerCase() === newValue?.toLowerCase());
        setFilteredData(filteredData);
        onFilterChange(filteredData);
    
        console.log("filteredData=", filteredData);
    };

    const handleExperienceChange = (event, newValue) => {
        console.log("newvalue =", newValue);
        // const selectedRole = event.target?.value || ''; // Get the selected value from newValue
        setExperience(newValue, event.target.value);
    
        // Filter jobData based on selected role and update filteredData
        const filteredData = jobData.filter(job => (job.minExp != null && job.minExp === newValue));
        setFilteredData(filteredData);
        onFilterChange(filteredData);
    
        console.log("filteredData=", filteredData);
    };

    const handleSalaryChange = (event, newValue) => {
        console.log("newvalue =", newValue);
        // const selectedRole = event.target?.value || ''; // Get the selected value from newValue
        setSalary(newValue, event.target.value);
    
        // Filter jobData based on selected role and update filteredData
        const filteredData = jobData.filter(job => (job.minJdSalary !== null && job.minJdSalary === newValue));
        setFilteredData(filteredData);
        onFilterChange(filteredData);
    
        console.log("filteredData=", filteredData);
    }
    
    const getOptionLabel = (option) => option;
    
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Autocomplete
        options={filteredRoles}
        getOptionLabel={getOptionLabel}
        onChange={handleJobChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-basic"
            size='small'
            variant="outlined"
            placeholder="Role"
            value={role}
            // onChange={handleJobChange}
            style={{ width: 200 }}
          />
        )}
          />
          <Autocomplete
        options={filteredLocation}
        getOptionLabel={getOptionLabel}
        onChange={handleLocationChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-basic"
            size='small'
            variant="outlined"
            placeholder="Location"
            value={location}
            // onChange={handleChange}
            style={{ width: 200 }}
          />
        )}
          />
          <Autocomplete
        options={filteredExperience}
        getOptionLabel={getOptionLabel}
        onChange={handleExperienceChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-basic"
            size='small'
            variant="outlined"
            placeholder="Min-Experience"
            value={experience}
            // onChange={handleExperienceChange}
            style={{ width: 200 }}
          />
        )}
          />
          <Autocomplete
        options={filteredSalary}
        getOptionLabel={getOptionLabel}
        onChange={handleSalaryChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-basic"
            size='small'
            variant="outlined"
            placeholder="Min-Salary"
            value={salaries}
            // onChange={handleSalaryChange}
            style={{ width: 200 }}
          />
        )}
      />
    </Box>
  )
}

export default Filters