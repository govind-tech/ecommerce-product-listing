# Full-Stack E-Commerce Product Listing Website

## Project Overview

This project is a full-stack e-commerce product listing website developed
using HTML, CSS, JavaScript, Python Flask, and SQLite.

Users can browse products, search for products, filter them by category,
and view individual product details.

## Features

- Display products with images and prices
- Search products by name, category, or description
- Filter products by category
- View individual product details
- REST API to retrieve product information
- SQLite database integration
- Error handling for products that do not exist
- Responsive website layout

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- REST API

### Database
- SQLite

## Project Structure

```text
ecommerce_project/
├── app.py
├── init_db.py
├── seed.py
├── schema.sql
├── database.db
├── requirements.txt
├── README.md
├── templates/
│   ├── index.html
│   └── product_details.html
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        ├── headphones.png
        ├── smartwatch.png
        └── keyboard.png