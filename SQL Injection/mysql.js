const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const config = require('./config'); // make sure you are importing config correctly

const connection = mysql.createConnection({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DB_NAME,
});

connection.connect();

// Secure Example 1
router.get('/example1/user/:id', (req, res) => {
    let userId = req.params.id;
    let query = {
        sql: "SELECT * FROM users WHERE id = ?",
        values: [userId]
    };
    connection.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Secure Example 2
router.get('/example2/user/:id', (req, res) => {
    let userId = req.params.id;
    connection.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Secure Example 3
router.get('/example3/user/:id', (req, res) => {
    let userId = req.params.id;
    let query = {
        sql: "SELECT * FROM users WHERE id = ?",
        values: [userId]
    };
    connection.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

module.exports = router;

