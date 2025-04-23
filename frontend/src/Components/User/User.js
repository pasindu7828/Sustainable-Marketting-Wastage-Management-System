import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)({
  textDecoration: 'none'
});

function User(props) {
  const { _id, fullName, email, phone, address } = props.user;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${_id}`);
      setOpenDialog(false);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/userdetails');
      }, 2000);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  return (
    <>
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell>{_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
                <TableCell>{fullName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell>{phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell>{address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <StyledLink to={`/users/${_id}`}>
              <Button variant="contained" color="primary">
                Update
              </Button>
            </StyledLink>
            <Button 
              variant="contained" 
              color="error"
              onClick={() => setOpenDialog(true)}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={deleteHandler} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          User deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default User;
