import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateBPlist() {
  const [inputs, setInputs] = useState({
    bp1: "",
    bp2: "",
    bp3: "",
    bp4: "",
    bp5: "",
  });

  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("ID from URL:", id); // Debugging: Log the ID
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ByproductPrices/${id}`);
        console.log("API Response:", res.data); // Debugging: Log the response
        if (res.data && res.data.user) {
          setInputs({
            bp1: res.data.user.bp1 || "",
            bp2: res.data.user.bp2 || "",
            bp3: res.data.user.bp3 || "",
            bp4: res.data.user.bp4 || "",
            bp5: res.data.user.bp5 || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/ByproductPrices/${id}`, {
        bp1: inputs.bp1 ? Number(inputs.bp1) : undefined,
        bp2: inputs.bp2 ? Number(inputs.bp2) : undefined,
        bp3: inputs.bp3 ? Number(inputs.bp3) : undefined,
        bp4: inputs.bp4 ? Number(inputs.bp4) : undefined,
        bp5: inputs.bp5 ? Number(inputs.bp5) : undefined,
      });
      history("/BPPriceDetails");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Byproduct Prices</h1>
      <form onSubmit={handleSubmit}>
        <label>By Product 1 (500 ml):</label>
        <br />
        <input
          type="text"
          name="bp1"
          onChange={handleChange}
          value={inputs.bp1}
        />
        <br /><br />

        <label>By Product 2 (500 ml):</label>
        <br />
        <input
          type="text"
          name="bp2"
          onChange={handleChange}
          value={inputs.bp2}
        />
        <br /><br />

        <label>By Product 3 (500 ml):</label>
        <br />
        <input
          type="text"
          name="bp3"
          onChange={handleChange}
          value={inputs.bp3}
        />
        <br /><br />

        <label>By Product 4 (500 ml):</label>
        <br />
        <input
          type="text"
          name="bp4"
          onChange={handleChange}
          value={inputs.bp4}
        />
        <br /><br />

        <label>By Product 5 (500 ml):</label>
        <br />
        <input
          type="text"
          name="bp5"
          onChange={handleChange}
          value={inputs.bp5}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateBPlist;