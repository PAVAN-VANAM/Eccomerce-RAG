# E-commerce RAG (Retrieval-Augmented Generation) Project

A modern e-commerce platform built with React, Node.js, and advanced AI capabilities using RAG (Retrieval-Augmented Generation) technology.

## 🚀 Features

- **AI-Powered Product Search**: Advanced search capabilities using RAG technology
- **Modern UI/UX**: Built with React, Tailwind CSS, and Shadcn UI components
- **Secure Authentication**: Google OAuth and JWT-based authentication
- **Payment Integration**: Razorpay payment gateway integration
- **Vector Database**: Qdrant for efficient similarity search
- **AI Chat**: Google's Generative AI for intelligent product recommendations

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- React Query
- Zustand (State Management)
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Qdrant (Vector Database)
- Google Generative AI
- JWT Authentication
- Razorpay Integration
- Ollama (Local LLM)

## 📋 Prerequisites

- Node.js 18.x
- MongoDB
- Qdrant Server
- Google Cloud Platform Account (for Generative AI)
- Razorpay Account
- Ollama (for local LLM capabilities)

### Installing Ollama

1. Download and install Ollama from [https://ollama.ai/download](https://ollama.ai/download)
2. After installation, pull the required models:
   ```bash
   # Pull the base model
   ollama pull granite-embedding:latest

    It run at http://localhost:11434/api/embeddings

   # Pull the embedding model
   ollama pull qwen2.5:1.5b

    It run at http://localhost:11434/api/generate
   
   ```

## 🚀 Getting Started

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   QDRANT_URL=your_qdrant_url
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the backend server:
   ```bash
   npm run serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd chroma-commerce-chat-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `QDRANT_URL`: Qdrant vector database URL
- `GOOGLE_AI_API_KEY`: Google AI API key
- `RAZORPAY_KEY_ID`: Razorpay API key ID
- `RAZORPAY_KEY_SECRET`: Razorpay API key secret
- `OLLAMA_BASE_URL`: URL for Ollama API (default: http://localhost:11434)

## 📁 Project Structure

```
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── llm/
│   ├── middleware/
│   ├── models/
│   ├── qdrant/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
└── chroma-commerce-chat-main/
    ├── src/
    ├── public/
    └── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Shadcn UI for the beautiful component library
- Google AI for the powerful generative AI capabilities
- Qdrant for the vector database solution
- Ollama for providing local LLM capabilities 