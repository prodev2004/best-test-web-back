const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/proxy-image", async (req, res) => {
    try {
        const imageUrl = req.query.url;
        if (!imageUrl) {
            return res.status(400).send("Image URL is required");
        }

        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

        res.setHeader("Content-Type", response.headers["content-type"]);
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Error fetching image");
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
