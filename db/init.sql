-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    age INT,
    gender VARCHAR(10),
    weight DECIMAL(5, 2),   -- weight in kg
    height DECIMAL(5, 2)    -- height in cm
);

-- Trainers table
CREATE TABLE IF NOT EXISTS trainers (
    trainer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) -- Trainer's specialization (e.g., "Strength", "Cardio")
);

-- Workouts table
CREATE TABLE IF NOT EXISTS workouts (
    workout_id SERIAL PRIMARY KEY,
    workout_name VARCHAR(100) NOT NULL,
    sets INT NOT NULL,
    reps INT NOT NULL,
    trainer_id INT REFERENCES trainers(trainer_id)
);
