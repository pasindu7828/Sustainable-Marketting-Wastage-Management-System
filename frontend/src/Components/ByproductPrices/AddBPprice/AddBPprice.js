import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  TextField,
  Box,
  Container,
  IconButton,
  CssBaseline,
  styled,
  useTheme
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

// Styled components
const DashboardContainer = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f5f7fa'
});

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: theme.spacing(4, 'auto'),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  maxWidth: '1200px'
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.common.white,
  fontSize: '0.875rem'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  margin: theme.spacing(0.5),
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: '0.75rem'
}));

const ActionCell = styled(TableCell)({
  minWidth: '200px'
});

function AddBPprice({ bpprices = [] }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/ByproductPrices/${_id}`);
      navigate("/BPPriceDetails");
    } catch (error) {
      console.error("Error deleting byproduct price:", error);
    }
  };

  const renderTableRow = (bpprice) => {
    const { _id, bp1, bp2, bp3, bp4, bp5, createdAt } = bpprice;
    const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : "N/A";

    return (
      <TableRow 
        key={_id} 
        sx={{ 
          '&:nth-of-type(odd)': { 
            backgroundColor: theme.palette.action.hover 
          },
          '&:last-child td': {
            borderBottom: 0
          }
        }}
      >
        {[bp1, bp2, bp3, bp4, bp5].map((value, index) => (
          <TableCell key={index}>
            <TextField
              type="number"
              name={`bp${index+1}`}
              defaultValue={value || ''}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                sx: {
                  backgroundColor: theme.palette.common.white,
                  borderRadius: theme.shape.borderRadius
                }
              }}
            />
          </TableCell>
        ))}
        <TableCell>{formattedDate}</TableCell>
        <ActionCell>
          <Box display="flex" justifyContent="center">
            <Link to={`/BPPriceDetails/${_id}`} style={{ textDecoration: 'none' }}>
              <StyledButton 
                variant="contained" 
                color="primary"
                startIcon={<EditIcon fontSize="small" />}
              >
                Update
              </StyledButton>
            </Link>
            <StyledButton 
              variant="contained" 
              color="error"
              startIcon={<DeleteIcon fontSize="small" />}
              onClick={() => deleteHandler(_id)}
              sx={{ ml: 1 }}
            >
              Delete
            </StyledButton>
          </Box>
        </ActionCell>
      </TableRow>
    );
  };

  return (
    <DashboardContainer>
      <CssBaseline />
      
      {/* Full-width App Bar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Byproduct Price Management
          </Typography>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MainContent>
        <Toolbar /> {/* Spacer for AppBar */}
        
        <Container maxWidth="xl">
          <StyledTableContainer component={Paper}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell>Mix Fruit Jam (500 ml)</StyledTableCell>
                  <StyledTableCell>Mix Fruit Cocktails (500 ml)</StyledTableCell>
                  <StyledTableCell>Jellies (500 ml)</StyledTableCell>
                  <StyledTableCell>Fruit Juices (500 ml)</StyledTableCell>
                  <StyledTableCell>Smoothies (500 ml)</StyledTableCell>
                  <StyledTableCell>Last Updated</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {bpprices.map(renderTableRow)}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/BPPriceDetails/new"
              sx={{ 
                px: 4,
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              Add New Price Entry
            </Button>
          </Box>
        </Container>
      </MainContent>
    </DashboardContainer>
  );
}

export default AddBPprice;