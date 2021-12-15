const express = require('express')
const path = require('path');

const app = express()
const port = process.env.PORT || 5000 // Heroku will need the PORT environment variable

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => console.log(`App is live on port ${port}!`))