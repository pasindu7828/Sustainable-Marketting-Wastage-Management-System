import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container, Grid, Avatar, Link, Paper, Stack, Divider, Menu, MenuItem, Card, CardContent, TextField } from '@mui/material';
import { FaLeaf, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { BsCart2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import CartPopup from './CartPopup';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const categories = [
  { 
    name: 'Apples', 
    img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&h=800&q=80' 
  },
  { 
    name: 'Oranges', 
    img: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&h=800&q=80' 
  },
  { 
    name: 'Bananas', 
    img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&h=800&q=80' 
  },
  { 
    name: 'Grapes', 
    img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&h=800&q=80' 
  },
  { 
    name: 'Watermelons', 
    img: 'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?auto=format&fit=crop&w=800&h=800&q=80' 
  },
  { 
    name: 'Mango', 
    img: 'https://th.bing.com/th/id/OIP.zzB-RUq1RlCFutGUbXjOJQHaFF?cb=iwc1&rs=1&pid=ImgDetMain' 
  },
  { 
    name: 'Wood Apples', 
    img: 'https://th.bing.com/th/id/OIP.mQgiR8j_cfvKo6PROet10gHaE8?cb=iwc1&rs=1&pid=ImgDetMain' 
  },
  { 
    name: 'Pineapples', 
    img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&h=800&q=80' 
  },
  { 
    name: 'Papayas', 
    img: 'https://www.foodrepublic.com/img/gallery/how-to-eat-papaya-for-the-uninitiated/l-intro-1684865402.jpg' 
  },
  { 
    name: 'Guavas', 
    img: 'https://th.bing.com/th/id/R.bdeb897ed821c058503f8f3ba682c4b6?rik=QCbtAUq8l%2fNkBQ&pid=ImgRaw&r=0'
  },
];

const productFieldMap = [
  { name: 'Apple', img: categories[0].img, quantity: 'shopapple', price: 'spApple' },
  { name: 'Orange', img: categories[1].img, quantity: 'shoporange', price: 'spOrange' },
  { name: 'Banana', img: categories[2].img, quantity: 'shopbanana', price: 'spBanana' },
  { name: 'Grapes', img: categories[3].img, quantity: 'shopgrapes', price: 'spGraphes' },
  { name: 'Watermelon', img: categories[4].img, quantity: 'shopwatermelon', price: 'spWatermelon' },
  { name: 'Mango', img: categories[5].img, quantity: 'shopmango', price: 'spMango' },
  { name: 'Wood Apple', img: categories[6].img, quantity: 'shopwoodapple', price: 'spWoodapple' },
  { name: 'Pineapple', img: categories[7].img, quantity: 'shoppineapple', price: 'spPineapple' },
  { name: 'Papaya', img: categories[8].img, quantity: 'shoppapaya', price: 'spPapaya' },
  { name: 'Guava', img: categories[9].img, quantity: 'shopguava', price: 'spGoava' },
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [inventory, setInventory] = useState(null);
  const [shopPrices, setShopPrices] = useState(null);
  const [goodInventory, setGoodInventory] = useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedKg, setSelectedKg] = useState({});
  

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isLoggedIn = !!currentUser;

  // Add refreshInventory function
  const refreshInventory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/GoodInventorys');
      const goods = res.data.GoodInventorys;
      setGoodInventory(goods && goods.length > 0 ? goods[goods.length - 1] : null);
    } catch (err) {
      console.error('Error refreshing inventory:', err);
    }
  };

  useEffect(() => {
    // Fetch latest shop prices
    axios.get('http://localhost:5000/ShopPrices')
      .then(res => {
        const prices = res.data.ShopPrices;
        setShopPrices(prices && prices.length > 0 ? prices[prices.length - 1] : null);
      });
    // Fetch latest inventory (still used for other purposes)
    axios.get('http://localhost:5000/Inventorys')
      .then(res => {
        const invs = res.data.Inventorys;
        setInventory(invs && invs.length > 0 ? invs[invs.length - 1] : null);
      });
    // Fetch latest GoodInventorys for shop quantities
    refreshInventory();
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  // Handle kg input change
  const handleKgInput = (key, value, maxKg) => {
    setSelectedKg(prev => ({ ...prev, [key]: Math.max(1, Math.min(maxKg, Number(value))) }));
  };

  // Add to cart
  const handleAddToCart = (product, quantity, maxKg) => {
    if (!shopPrices || !goodInventory) return;
    const existingIdx = cart.findIndex(item => item.name === product.name);
    if (existingIdx !== -1) {
      // Update quantity if already in cart
      const newCart = [...cart];
      newCart[existingIdx].quantityKg = Math.min(newCart[existingIdx].quantityKg + quantity, maxKg);
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        {
          name: product.name,
          img: product.img,
          price: shopPrices[product.price] || 0,
          quantityKg: quantity,
          maxKg: maxKg
        }
      ]);
    }
  };

  // Handle order placed
  const handleOrderPlaced = () => {
    setCart([]);
    refreshInventory();
  };

  // Profile menu handlers
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setAnchorEl(null);
    navigate('/');
  };
  const handleEditProfile = () => {
    setAnchorEl(null);
    if (currentUser && currentUser.email) {
      navigate(`/edit-user/${currentUser.email}`);
    }
  };
  const handleViewProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  // Handle search from Navbar
  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  // Filtered product list for search
  const filteredProducts = productFieldMap.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <Navbar 
        onCartClick={() => setCartOpen(true)} 
        onSearch={handleSearch}
      />

      {/* Hero Section */}
      <Box sx={{ width: '100%', mt: 4, mb: 6 }}>
        <Container maxWidth="xl">
          <Paper elevation={0} sx={{ position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80"
              alt="Fresh fruits and vegetables"
              style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 24 }}
            />
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center', pl: { xs: 2, md: 10 } }}>
              <Typography variant="h2" fontWeight={800} color="#fff" sx={{ mb: 2, fontSize: { xs: 32, md: 56 } }}>
                Fresh from Farm<br />to Your Table
              </Typography>
              <Typography variant="h6" color="#fff" sx={{ mb: 3, maxWidth: 500 }}>
                Supporting local farmers while bringing you the freshest, highest quality fruits and vegetables
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Menu Categories */}
      <Container maxWidth="xl" sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#222' }}>
          Our Fresh Produce
        </Typography>
        <Typography sx={{ mb: 4, color: '#666' }}>
          Direct from local farmers to your doorstep
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat, idx) => (
            <Grid item key={idx} xs={6} sm={3} md={1.5} sx={{ textAlign: 'center' }}>
              <Avatar src={cat.img} alt={cat.name} sx={{ width: 90, height: 90, mx: 'auto', mb: 1, boxShadow: 2 }} />
              <Typography fontWeight={500}>{cat.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Product Cards Section */}
      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: '#222' }}>
          Shop Our Products
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          {filteredProducts.map((product, idx) => {
            const quantity = goodInventory ? goodInventory[product.quantity] : null;
            const price = shopPrices ? shopPrices[product.price] : null;
            const key = product.name;
            const maxKg = quantity || 0;
            const selected = selectedKg[key] || 1;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx} sx={{ display: 'flex', height: '100%' }}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 5,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 2px 16px 0 rgba(76,175,80,0.10)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    width: '100%',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.03)',
                      boxShadow: '0 8px 32px 0 rgba(56,142,60,0.18)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      boxShadow: 3,
                      border: '3px solid #e8f5e9',
                      background: '#fff',
                    }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, width: '100%', p: 0 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#388e3c' }}>{product.name}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      {quantity !== null && quantity !== undefined ? `${quantity} kg available` : 'Out of stock'}
                    </Typography>
                    <Typography color="success.main" fontWeight={600} sx={{ mb: 1 }}>
                      {price !== null && price !== undefined ? `Rs. ${price} / kg` : 'N/A'}
                    </Typography>
                  {isLoggedIn && (
                    <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                      <TextField
                        type="number"
                        size="small"
                        label="Kg"
                        value={selected}
                        onChange={e => handleKgInput(key, e.target.value, maxKg)}
                        inputProps={{ min: 1, max: maxKg, style: { width: 60 } }}
                        sx={{ width: 80, mr: 1 }}
                        disabled={!quantity || quantity <= 0}
                      />
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: 8, px: 2, fontWeight: 600, textTransform: 'none' }}
                        onClick={() => handleAddToCart(product, selected, maxKg)}
                        disabled={!quantity || quantity <= 0}
                      >
                        Add to cart
                      </Button>
                    </Box>
                    </>
                  )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {/* Cart Popup */}
        <CartPopup
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          setCart={setCart}
          user={currentUser}
          onOrderPlaced={handleOrderPlaced}
        />
      </Container>

      {/* App Download Section */}
      <Divider sx={{ my: 6 }} />
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          For Better Experience Download<br />AgriFlow App
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: 60 }} />
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style={{ height: 60 }} />
        </Stack>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#222', color: '#fff', py: 6, mt: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <FaLeaf style={{ color: '#4caf50', fontSize: 32 }} />
                <Typography variant="h5" fontWeight={700} sx={{ color: '#fff', letterSpacing: 1 }}>
                  AgriFlow
                </Typography>
              </Box>
              <Typography sx={{ color: '#ccc', mb: 2 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </Typography>
              <Box display="flex" gap={2}>
                <IconButton sx={{ bgcolor: '#333', color: '#fff' }}><FaFacebookF /></IconButton>
                <IconButton sx={{ bgcolor: '#333', color: '#fff' }}><FaTwitter /></IconButton>
                <IconButton sx={{ bgcolor: '#333', color: '#fff' }}><FaLinkedinIn /></IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight={700} sx={{ mb: 2 }}>COMPANY</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Link href="#" underline="hover" color="#fff">Home</Link>
                <Link href="#" underline="hover" color="#fff">About Us</Link>
                <Link href="#" underline="hover" color="#fff">Delivery</Link>
                <Link href="#" underline="hover" color="#fff">Privacy Policy</Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight={700} sx={{ mb: 2 }}>GET IN TOUCH</Typography>
              <Typography sx={{ color: '#ccc' }}>+94-37-206-2073</Typography>
              <Typography sx={{ color: '#ccc' }}>Contact@agriflow.com</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: '#444' }} />
          <Typography align="center" sx={{ color: '#aaa' }}>
            Copyright 2025 © AgriFlow.com – All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 