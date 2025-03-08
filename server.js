const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Proxy route to fetch images
app.get("/proxy-image", async (req, res) => {
    try {
        const imageUrl = req.query.url;
        if (!imageUrl) {
            return res.status(400).send("Image URL is required");
        }

        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

        // Set correct content type for images
        res.setHeader("Content-Type", response.headers["content-type"]);
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Error fetching image");
    }
});

app.get("/fetch-product", async (req, res) => {
    try {
        const productUrl = req.query.url;
        if (!productUrl) {
            return res.status(400).send("Product URL is required");
        }

        const response = await axios.get(productUrl, { headers: { "User-Agent": "Mozilla/5.0" } });

        res.send(response.data);
    } catch (error) {
        res.status(500).send("Error fetching product data");
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
