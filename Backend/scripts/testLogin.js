const axios = require('axios');

async function testLogin() {
    try {
        const response = await axios.post('http://localhost:5000/users/login', {
            email: 'admin@gmail.com',
            password: 'admin123'
        });
        
        console.log('Login successful!');
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Login failed!');
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testLogin(); 