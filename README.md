# Image Gallery App

A responsive image gallery application with upload functionality, search, and filtering capabilities.

## Features

- 📤 Image upload with drag & drop
- 🔍 Search images by title
- 🏷️ Filter images by category
- ❌ Delete images
- 📱 Responsive design
- 🖼️ Image preview

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - CSS Grid & Flexbox
- Backend:
  - Node.js
  - Express
  - Multer

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/image-gallery.git
cd image-gallery
```

## Install dependencies:

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

# Usage

## Start the backend server:

```bash
cd server
npm start
```

## Start the frontend development server:

```bash
cd client
npm start
```

## Open http://localhost:3000 in your browser
## API Endpoints
- Upload Image
- URL: /upload
- Method: POST
- Content-Type: multipart/form-data
Response:
```bash{
  "url": "http://localhost:5000/uploads/filename.jpg"
}
```
image-gallery/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Gallery/
│   │   │   ├── ImageUpload/
│   │   │   └── DeleteButton/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   └── package.json
├── server/
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── README.md

