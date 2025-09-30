const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const methodOverride = require("method-override");
const path = require("path");
const cors = require("cors");
const passport = require("./config/passport.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
// const flash = require("connect-flash");

const Product = require("./models/product.js");
const User = require("./models/user.js");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/marcari");
}

//show products
app.get("/api/products", async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
});

//see a product
app.get("/api/products/:id", async (req, res) => {
  let { id } = req.params;
  const productListing = await Product.findById(id);
  res.json(productListing);
});

//create product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log("New product added");
    res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        updated_at: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//delete
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletionProduct = await Product.findByIdAndDelete(id);
    if (!deletionProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log(deletionProduct);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//users
app.get("/api/users/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json(req.user);
});

//register
app.post("/api/users/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashed });

    req.logIn(newUser, (err) => {
      if (err) return next(err);
      return res.json({
        message: "User registered and logged in",
        user: newUser,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//login
app.post("/api/users/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ error: info?.message || "Login failed" });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ user });
    });
  })(req, res, next);
});

//logout
app.post("/api/users/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "logged out" });
  });
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
