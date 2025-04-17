const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const roleRoutes = require("./routes/roleRoutes");

const userRoutes = require("./routes/userRoutes")

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(require("cors")({ origin: true, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/roles", roleRoutes);

app.use("/api/users", userRoutes); // This gives you /api/users/allUser


// Start Server + Create Admin
connectDB().then(async () => {
  const exists = await Admin.findOne({ email: "admin@example.com" });
     console.log(exists)
  if (!exists) {
    const hash = await bcrypt.hash("admin123", 10);
    await Admin.create({ name: "Admin", email: "admin@example.com", password: hash, role: "Admin" });
    console.log("✅ Admin created");
  }

  app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
});
