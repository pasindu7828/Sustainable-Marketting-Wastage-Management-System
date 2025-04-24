import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Typography,
    TablePagination,
    Chip,
    Stack,
    TextField,
    InputAdornment
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Search as SearchIcon
} from '@mui/icons-material';

const products = [
    {
        id: 1,
        image: "https://via.placeholder.com/50",
        title: "Playstation 5 Digital Edition",
        color: "white",
        price: 250.99,
        producer: "Sony",
        createdAt: "01.02.2023"
    },
    {
        id: 2,
        image: "https://via.placeholder.com/50",
        title: "Dell Laptop KR211822",
        color: "black",
        price: 499.99,
        producer: "Dell",
        createdAt: "01.02.2023"
    },
    // Add more sample products as needed
];

const ProductsTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.producer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (id) => {
        console.log('Edit product:', id);
    };

    const handleDelete = (id) => {
        console.log('Delete product:', id);
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h2">
                    Products
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => console.log('Add new product')}
                >
                    Add New Product
                </Button>
            </Box>

            <Paper sx={{ width: '100%', mb: 2 }}>
                <Box sx={{ p: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">ID</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Producer</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((product) => (
                                    <TableRow
                                        hover
                                        key={product.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 50,
                                                    width: 50,
                                                    objectFit: 'cover',
                                                    borderRadius: 1
                                                }}
                                                alt={product.title}
                                                src={product.image}
                                            />
                                        </TableCell>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={product.color}
                                                size="small"
                                                sx={{
                                                    backgroundColor: product.color,
                                                    color: product.color === 'white' ? 'black' : 'white'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>${product.price.toFixed(2)}</TableCell>
                                        <TableCell>{product.producer}</TableCell>
                                        <TableCell>{product.createdAt}</TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEdit(product.id)}
                                                    color="primary"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDelete(product.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ProductsTable; 