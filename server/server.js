const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imagesPath = path.join(__dirname, "./images.json");
    const newImage = {
      id: Date.now(),
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      src: `/uploads/${req.file.filename}`,
      category: req.body.category,
      createdAt: new Date()
    };
    const currentImages = JSON.parse(fs.readFileSync(imagesPath, "utf8"));
    currentImages.push(newImage);
    const newContent = JSON.stringify(currentImages, null, 2);
    fs.writeFileSync(imagesPath, newContent, "utf8");
    res.json({
      url: newImage.src,
      image: newImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

app.get("/api/images", (req, res) => {
  try {
    const images = fs.readFileSync("./images.json");
    res.json(JSON.parse(images));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/images/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const imagesPath = path.join(__dirname, './images.json');
    
    const currentImages = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
    const image = currentImages.find(img => img.id === id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' }); 
    }

    const imagePath = path.join(__dirname, `.${image.src}`);
    
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image file not found' });
    }

    const ext = path.extname(imagePath).toLowerCase();
    
    const contentType = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    }[ext] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(imagePath)}"`);

    const fileStream = fs.createReadStream(imagePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/images/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const imagesPath = path.join(__dirname, './images.json');
    
    const currentImages = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
    
    const imageToDelete = currentImages.find(img => img.id === id);
    if (!imageToDelete) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imagePath = path.join(__dirname, `.${imageToDelete.src}`);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    const updatedImages = currentImages.filter(img => img.id !== id);
    fs.writeFileSync(imagesPath, JSON.stringify(updatedImages, null, 2), 'utf8');

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
