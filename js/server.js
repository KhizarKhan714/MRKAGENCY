
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mrkagency', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', UserSchema);

// Registration Route
app.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullname,
        email,
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ error: 'User registration failed' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
    res.send({ token });
});

// Protected Route
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        res.send({ message: 'Welcome to the dashboard!' });
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
echo "const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mrkagency', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', UserSchema);

// Registration Route
app.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullname,
        email,
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ error: 'User registration failed' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
    res.send({ token });
});

// Protected Route
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        res.send({ message: 'Welcome to the dashboard!' });
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});" > server.js
const ServiceSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

const Service = mongoose.model('Service', ServiceSchema);
app.post('/add-service', async (req, res) => {
    const { name, description, price } = req.body;

    const service = new Service({
        name,
        description,
        price
    });

    try {
        await service.save();
        res.status(201).send({ message: 'Service added successfully' });
    } catch (error) {
        res.status(400).send({ error: 'Failed to add service' });
    }
});const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

// Example: Protected Route
app.get('/dashboard', authMiddleware, (req, res) => {
    res.send({ message: 'Welcome to the dashboard!' });
});app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Handle contact form submission (e.g., save to database, send email, etc.)
    // Here we'll just log it for simplicity
    console.log(`New contact form submission: ${name}, ${email}, ${message}`);
    
    res.status(200).send({ message: 'Message received, we will contact you shortly.' });
});const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));