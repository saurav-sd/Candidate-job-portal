const fetchData = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw
    };

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to fetch job data");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchData;

// export const fetchData = async (offset) => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     limit: 10,
//     offset: offset,
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//   };

//   const response = await fetch(
//     "https://api.weekday.technology/adhoc/getSampleJdJSON",
//     requestOptions
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch job data");
//   }

//   return response.json();
// };
