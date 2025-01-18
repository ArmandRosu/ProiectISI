-- Create the Users table
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create the Libraries table
CREATE TABLE Libraries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    sector INT NOT NULL,
    opening_hours VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL
);

-- Create the SearchLogs table
CREATE TABLE SearchLogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    search_query VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create the Routes table
CREATE TABLE Routes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    library_id INT NOT NULL,
    distance DECIMAL(10, 2) NOT NULL,
    travel_time INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (library_id) REFERENCES Libraries(id) ON DELETE CASCADE
);

-- Insert sample data into the Libraries table
INSERT INTO Libraries (name, address, sector, opening_hours, latitude, longitude)
VALUES 
    ('Library 1', 'Address 1', 1, '10:00-20:00', 44.4268, 26.1025),
    ('Library 2', 'Address 2', 2, '09:00-19:00', 44.4358, 26.1165),
    ('Library 3', 'Address 3', 3, '08:00-18:00', 44.4389, 26.1187);

-- Insert sample data into the Users table
INSERT INTO Users (name, email, password, role)
VALUES 
    ('John Doe', 'john.doe@example.com', 'password123', 'user'),
    ('Admin User', 'admin@example.com', 'adminpassword', 'admin');

-- Functionality for logging search queries
DELIMITER //
CREATE TRIGGER log_search_query
AFTER INSERT ON SearchLogs
FOR EACH ROW
BEGIN
    INSERT INTO SearchLogs (user_id, search_query)
    VALUES (NEW.user_id, NEW.search_query);
END//
DELIMITER ;

-- Sample query to log a search query
INSERT INTO SearchLogs (user_id, search_query)
VALUES (1, 'Library 1');

-- Insert a route (example: from user 1 to Library 2)
INSERT INTO Routes (user_id, library_id, distance, travel_time)
VALUES 
    (1, 2, 5.75, 15); -- Distance in km, travel time in minutes

-- Query to fetch all routes for a specific user
SELECT r.id, l.name AS library_name, r.distance, r.travel_time
FROM Routes r
JOIN Libraries l ON r.library_id = l.id
WHERE r.user_id = 1;

-- Query to fetch libraries based on sector and opening hours
SELECT * 
FROM Libraries
WHERE sector = 1 AND opening_hours = '10:00-20:00';
