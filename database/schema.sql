CREATE DATABASE IF NOT EXISTS christmas_puzzle;
USE christmas_puzzle;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE puzzles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    size INT NOT NULL,
    difficulty VARCHAR(20)
);

CREATE TABLE game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    puzzle_id INT,
    moves INT,
    time_seconds INT,
    completed BOOLEAN,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
