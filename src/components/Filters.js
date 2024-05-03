import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

function Filters({jobData, onFilterChange, onFilterDataChange}) {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [experience, setExperience] = useState('');
    const [salary, setSalary] = useState('');
  const [filteredData, setFilteredData] = useState(jobData || []);


    useEffect(() => {
        // Initialize filteredJobData with jobData
        setFilteredData(jobData || []);
    }, [jobData]);
    

    // console.log("jobData= ", jobData)
    // JobRole
    const roles = jobData ? [...new Set(jobData.map(job => job.jobRole))] : []; // Extract unique job roles from jobData
    const filteredRoles = roles.filter(role => role.toLowerCase().includes(role.toLowerCase()));

    //Location
    const locations = jobData ? [...new Set(jobData.map(job => job.location))] : []; // Extract unique Location from jobData
    const filteredLocation = locations.filter(location => location.toLowerCase().includes(location.toLowerCase()));

    //Minimum experience
    const experiences = jobData ? [...new Set(jobData.map(job => job.minExp))] : []; // Extract unique Experience from jobData
    const filteredExperience = experiences.filter((experience, index, self) => self.indexOf(experience) === index).sort((a, b) => a - b);

    //Minimum Salary
    const salaries = jobData ? [...new Set(jobData.map(job => job.minJdSalary))] : []; // Extract unique Salary from jobData
    const filteredSalary = salaries.filter((salary,index,self) => self.indexOf(salary) === index).sort((a, b) => a - b);

    console.log("filteredData=", filteredData);
  
  //change

  const applyFilters = () => {
    let newData = jobData;

    if (role) {
        newData = newData.filter(job => job.jobRole.toLowerCase() === role.toLowerCase());
    }
    if (location) {
        newData = newData.filter(job => job.location.toLowerCase() === location.toLowerCase());
    }
    if (experience) {
        newData = newData.filter(job => job.minExp === experience);
    }
    if (salary) {
        newData = newData.filter(job => job.minJdSalary === salary);
    }

    setFilteredData(newData);
    onFilterChange(newData);
};
    
    const handleJobChange = (event, newValue) => {
        console.log("newvalue =", newValue);
        setRole(newValue);
    
        // Filter jobData based on selected role and update filteredData
        const filteredDataa = filteredData.filter(job => job.jobRole.toLowerCase() === newValue?.toLowerCase());
        setFilteredData(filteredDataa);
      onFilterChange(filteredDataa);
      onFilterDataChange(true);
    
        console.log("filteredData==> ", filteredDataa);
    };

    const handleLocationChange = (event, newValue) => {
        console.log("newvalue =", newValue);
        setLocation(newValue);
    
        // Filter jobData based on selected role and update filteredData
        const filteredDataa = filteredData.filter(job => job.location.toLowerCase() === newValue?.toLowerCase());
        setFilteredData(filteredDataa);
      onFilterChange(filteredDataa);
      onFilterDataChange(true);
      
      console.log("filteredData==> ", filteredData);
    };

    const handleExperienceChange = (event, newValue) => {
        console.log("newvalue =", newValue);
        setExperience(newValue);
    
        // Filter jobData based on selected role and update filteredData
        const filteredDataa = filteredData.filter(job => (job.minExp != null && job.minExp === newValue));
        setFilteredData(filteredDataa);
      onFilterChange(filteredDataa);
      onFilterDataChange(true);
    };

    const handleSalaryChange = (event, newValue) => {
        console.log("newvalue =", newValue);
        setSalary(newValue);
    
        // Filter jobData based on selected role and update filteredData
        const filteredDataa = filteredData.filter(job => (job.minJdSalary !== null && job.minJdSalary === newValue));
        setFilteredData(filteredDataa);
      onFilterChange(filteredDataa);
      onFilterDataChange(true);
    
        console.log("filteredData=", filteredData);
  }
  
  const handleClearFilter = (filterName) => {
    switch (filterName) {
        case 'role':
            setRole('');
            break;
        case 'location':
            setLocation('');
            break;
        case 'experience':
            setExperience('');
            break;
        case 'salary':
            setSalary('');
            break;
        default:
            break;
    }

    applyFilters();
};

useEffect(() => {
    applyFilters();
}, [role, location, experience, salary]);
    
    const getOptionLabel = (option) => option;
    
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Autocomplete
        options={filteredRoles}
        getOptionLabel={getOptionLabel}
        onChange={handleJobChange}
        onInputChange={(event, newInputValue) => {
          if (!newInputValue) {
            handleClearFilter();
          }
      }}
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