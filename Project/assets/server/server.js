const express = require("express")
const mysql = require("mysql2")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.static("public"))

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err)
    return
  }
  console.log("Connected to the database")
})

// Helper function to execute SQL queries
function query(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

// API Routes

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await query("SELECT * FROM products")
    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// User registration
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Check if user already exists
    const existingUser = await query("SELECT * FROM users WHERE email = ?", [email])
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert the new user
    await query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// User login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body

  try {
    // Find the user
    const users = await query("SELECT * FROM users WHERE email = ?", [email])
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const user = users[0]

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.json({ token })
  } catch (error) {
    console.error("Error logging in:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Place an order
app.post("/api/orders", authenticateToken, async (req, res) => {
  const { items, total, name, address, phone } = req.body
  const userId = req.user.userId

  try {
    // Start a transaction
    await query("START TRANSACTION")

    // Insert the order
    const orderResult = await query(
      "INSERT INTO orders (user_id, total_price, order_date, shipping_name, shipping_address, shipping_phone) VALUES (?, ?, NOW(), ?, ?, ?)",
      [userId, total, name, address, phone],
    )

    const orderId = orderResult.insertId

    // Insert order items
    for (const item of items) {
      await query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", [
        orderId,
        item.id,
        item.quantity,
        item.price,
      ])

      // Update product inventory (assuming you have a quantity field in the products table)
      await query("UPDATE products SET quantity = quantity - ? WHERE id = ?", [item.quantity, item.id])
    }

    // Commit the transaction
    await query("COMMIT")

    res.status(201).json({ message: "Order placed successfully", orderId })
  } catch (error) {
    // Rollback the transaction in case of error
    await query("ROLLBACK")
    console.error("Error placing order:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Authentication required" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" })
    }
    req.user = user
    next()
  })
}

// Serve HTML files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

