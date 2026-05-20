CREATE TABLE stores (
    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,

    status TINYINT DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,

    code VARCHAR(50) UNIQUE,
    name VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,

    store_id INT,
    role_id INT,

    name VARCHAR(100),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,

    password VARCHAR(255),

    avatar VARCHAR(255),

    phone VARCHAR(20),

    status TINYINT DEFAULT 1,

    last_login DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100),

    image VARCHAR(255),

    sort_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,

    category_id INT,

    name VARCHAR(255),

    slug VARCHAR(255) UNIQUE,

    image VARCHAR(255),

    description TEXT,

    base_price INT,

    cost_price INT,

    is_combo TINYINT DEFAULT 0,

    status TINYINT DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_sizes (
    id INT PRIMARY KEY AUTO_INCREMENT,

    product_id INT,

    size_name VARCHAR(20),

    price INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE toppings (
    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(255),

    image VARCHAR(255),

    price INT,

    stock INT DEFAULT 0,

    status TINYINT DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_toppings (
    id INT PRIMARY KEY AUTO_INCREMENT,

    product_id INT,

    topping_id INT,

    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (topping_id) REFERENCES toppings(id)
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,

    store_id INT,

    user_id INT,

    customer_id INT NULL,

    order_code VARCHAR(50),

    subtotal INT,

    discount_amount INT DEFAULT 0,

    tax_amount INT DEFAULT 0,

    total_amount INT,

    payment_method VARCHAR(50),

    payment_status VARCHAR(50),

    order_status VARCHAR(50),

    note TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,

    order_id INT,

    product_id INT,

    product_name VARCHAR(255),

    size_name VARCHAR(20),

    quantity INT,

    price INT,

    total_price INT,

    note TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE order_item_toppings (
    id INT PRIMARY KEY AUTO_INCREMENT,

    order_item_id INT,

    topping_id INT,

    topping_name VARCHAR(255),

    price INT,

    FOREIGN KEY (order_item_id) REFERENCES order_items(id),
    FOREIGN KEY (topping_id) REFERENCES toppings(id)
);

CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,

    order_id INT,

    payment_method VARCHAR(50),

    amount INT,

    transaction_code VARCHAR(255),

    status VARCHAR(50),

    paid_at DATETIME,

    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE inventories (
    id INT PRIMARY KEY AUTO_INCREMENT,

    store_id INT,

    name VARCHAR(255),

    unit VARCHAR(50),

    quantity DECIMAL(10,2),

    min_quantity DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE inventory_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,

    inventory_id INT,

    type VARCHAR(20),

    quantity DECIMAL(10,2),

    note TEXT,

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (inventory_id) REFERENCES inventories(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,

    product_id INT,

    inventory_id INT,

    quantity DECIMAL(10,2),

    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (inventory_id) REFERENCES inventories(id)
);

CREATE TABLE shifts (
    id INT PRIMARY KEY AUTO_INCREMENT,

    store_id INT,

    user_id INT,

    start_cash INT,

    end_cash INT,

    expected_cash INT,

    actual_cash INT,

    difference_cash INT,

    started_at DATETIME,

    ended_at DATETIME,

    status VARCHAR(50),

    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(255),

    phone VARCHAR(20) UNIQUE,

    email VARCHAR(100),

    points INT DEFAULT 0,

    total_spent INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vouchers (
    id INT PRIMARY KEY AUTO_INCREMENT,

    code VARCHAR(50) UNIQUE,

    discount_type VARCHAR(20),

    discount_value INT,

    max_discount INT,

    min_order_amount INT,

    expired_at DATETIME,

    quantity INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);