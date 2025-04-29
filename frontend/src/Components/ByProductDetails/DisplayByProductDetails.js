import React, { useEffect, useState } from 'react';
import ByProductNav from '../Nav/ByProductNav';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const URL = "http://Localhost:5000/BadInventorys";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: '30px auto',
  maxWidth: '1100px',
  borderRadius: '12px',
  boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif'
}));

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#4CAF50'
});

const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle',
  fontWeight: 'bold',
  fontSize: '1rem',
  color: 'white',
  padding: '12px'
});

const StyledTableCell2 = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle',
  fontSize: '0.95rem',
  color: '#333',
  padding: '10px'
});

const StyledButton = styled(Button)({
  borderRadius: '8px',
  padding: '6px 16px',
  margin: '4px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.875rem',
  boxShadow: 'none'
});

function DisplayByProductDetails() {
  const navigate = useNavigate();
  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://Localhost:5000/BadInventorys/${_id}`);
      navigate("/");
      navigate("/DisplayByProductDetails");
    } catch (error) {
      console.error("Error deleting byproduct price:", error);
    }
  };

  const generatePDF = (item) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("By Product Report", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Date', new Date(item.createdAt).toLocaleDateString()],
        ['Mix Fruit Jam (500 ml)', item.Bp1],
        ['Mix Fruit Cocktails (500 ml)', item.Bp2],
        ['Jellies (500 ml)', item.Bp3],
        ['Fruit Juices (500 ml)', item.Bp4],
        ['Smoothies (500 ml)', item.Bp5],
      ],
    });

    doc.save(`ByProduct_Report_${new Date(item.createdAt).toLocaleDateString()}.pdf`);
  };

  const [BadInventorys, setUsers] = useState();
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.BadInventorys));
  }, []);

  const filteredBadInventorys = BadInventorys?.filter((user) =>
    new Date(user.createdAt).toLocaleDateString().includes(searchDate)
  );

  return (
    <div>
      <ByProductNav />
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>By Product Details Display Page</h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Date (e.g. 4/23/2025)"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{
            padding: '10px',
            width: '60%',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
      </div>

      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Mix Fruit Jam (500 ml)</StyledTableCell>
              <StyledTableCell>Mix Fruit Cocktails (500 ml)</StyledTableCell>
              <StyledTableCell>Jellies (500 ml)</StyledTableCell>
              <StyledTableCell>Fruit Juices (500 ml)</StyledTableCell>
              <StyledTableCell>Smoothies (500 ml)</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {filteredBadInventorys && filteredBadInventorys.map((user, i) => (
              <TableRow
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? '#f9f9f9' : '#ffffff',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#f9f9f9' : '#ffffff'}
              >
                <StyledTableCell2>{new Date(user.createdAt).toLocaleDateString()}</StyledTableCell2>
                <StyledTableCell2>{user.Bp1}</StyledTableCell2>
                <StyledTableCell2>{user.Bp2}</StyledTableCell2>
                <StyledTableCell2>{user.Bp3}</StyledTableCell2>
                <StyledTableCell2>{user.Bp4}</StyledTableCell2>
                <StyledTableCell2>{user.Bp5}</StyledTableCell2>
                <StyledTableCell2>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
    <Link to={`/DisplayByProductDetails/${user._id}`} style={{ textDecoration: 'none' }}>
      <StyledButton variant="contained" color="info">
        Update
      </StyledButton>
    </Link>
    <StyledButton
      variant="contained"
      color="error"
      onClick={() => deleteHandler(user._id)}
    >
      Delete
    </StyledButton>
    <StyledButton
      variant="contained"
      color="success"
      onClick={() => generatePDF(user)}
    >
      Generate Report
    </StyledButton>
  </div>
</StyledTableCell2>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
}

export default DisplayByProductDetails;
