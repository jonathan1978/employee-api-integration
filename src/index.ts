import express, { Request } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes';
import ApiKeyModel from './models/ApiKeyModel';

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = 3000;

// Middleware to validate API key
const apiKeyValidator = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const apiKey = req.header('X-API-Key');
  if (!apiKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    // Check if the API key exists in the database
    const apiKeyExists = await ApiKeyModel.exists({ key: apiKey });
    if (!apiKeyExists) {
      return res.status(401).json({ message: 'Invalid API key' });
    }
  } catch (error: Error | any) {
    console.error('Error checking API key in database:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  next();
};

app.use(express.json());

// Apply API key validation middleware globally
app.use(apiKeyValidator);

// Connect to MongoDB
// TODO: Move database username and password to env

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.w16e0rn.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url);

// Apply employee routes
app.use('/employees', employeeRoutes);

// 404 middleware
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next:express. NextFunction) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
