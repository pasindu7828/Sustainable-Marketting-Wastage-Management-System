import React, { useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import User from '../User/User';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid
} from '@mui/material';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Nav />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          User Details
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center' }}>
            {error}
          </Typography>
        ) : users?.length === 0 ? (
          <Typography sx={{ textAlign: 'center' }}>
            No users found
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {users?.map((user, i) => (
              <Grid item xs={12} key={i}>
                <User user={user} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default Users;
