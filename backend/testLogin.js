const axios = require('axios');

const loginTest = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@example.com',
      password: 'adminpass'
    });

    console.log('Login successful!');
    console.log('Token:', response.data.token);
    console.log('Name:', response.data.name);
  } catch (err) {
    if (err.response) {
      console.error('Login failed:', err.response.data.message);
    } else {
      console.error('Error:', err.message);
    }
  }
};

loginTest();
