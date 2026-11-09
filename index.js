const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

app.get("/", (req, res) =>{
    res.json({
    message: "FlyRank Week 4 Auth API is running"
    });
});

app.get("/public/info", (req, res) =>{
   res.json({
    message: "This is a public route. No authentication required"
   })
})

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);  
    console.log('Supabase client initialized successfully');  
})
