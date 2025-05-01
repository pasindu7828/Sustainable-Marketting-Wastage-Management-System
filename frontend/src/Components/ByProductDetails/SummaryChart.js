import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';
import { Typography, Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const URL = "http://localhost:5000/BadInventorys";
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

function SummaryChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      const response = await axios.get(URL);
      const items = response.data.BadInventorys;

      let totals = { Bp1: 0, Bp2: 0, Bp3: 0, Bp4: 0, Bp5: 0 };
      items.forEach(item => {
        totals.Bp1 += parseInt(item.Bp1 || 0);
        totals.Bp2 += parseInt(item.Bp2 || 0);
        totals.Bp3 += parseInt(item.Bp3 || 0);
        totals.Bp4 += parseInt(item.Bp4 || 0);
        totals.Bp5 += parseInt(item.Bp5 || 0);
      });

      const formatted = [
        { name: 'Jam', value: totals.Bp1 },
        { name: 'Cocktails', value: totals.Bp2 },
        { name: 'Jellies', value: totals.Bp3 },
        { name: 'Juices', value: totals.Bp4 },
        { name: 'Smoothies', value: totals.Bp5 },
      ];

      setChartData(formatted);
    };

    fetchHandler();
  }, []);

  // Generate PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('By-Product Summary Report', 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['By-Product', 'Total Quantity']],
      body: chartData.map(item => [item.name, item.value]),
    });

    doc.save(`ByProduct_Summary_${new Date().toLocaleDateString()}.pdf`);
  };

  // Generate CSV
  const handleDownloadCSV = () => {
    const headers = ['By-Product,Total Quantity'];
    const rows = chartData.map(item => `${item.name},${item.value}`);
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `ByProduct_Summary_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        By-Product Summary Chart
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDownloadCSV}>
          Download CSV
        </Button>
      </div>

      {/* Updated layout: Charts side by side */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'center' }}>
        <BarChart
          width={700}
          height={400}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default SummaryChart;
