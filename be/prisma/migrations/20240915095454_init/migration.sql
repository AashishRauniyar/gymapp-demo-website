-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('member', 'trainer', 'admin');

-- CreateEnum
CREATE TYPE "FitnessGoal" AS ENUM ('gain', 'maintain', 'loss');

-- CreateEnum
CREATE TYPE "FitnessLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('sedentary', 'lightly_active', 'active', 'very_active');

-- CreateEnum
CREATE TYPE "WorkoutPreference" AS ENUM ('strength', 'cardio', 'hiit', 'yoga', 'mixed');

-- CreateTable
CREATE TABLE "trainers" (
    "trainer_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "specialization" VARCHAR(100),

    CONSTRAINT "trainers_pkey" PRIMARY KEY ("trainer_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT,
    "profile_image" TEXT,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "gender" "Gender" NOT NULL,
    "role" "Role" NOT NULL,
    "fitness_goal" "FitnessGoal" NOT NULL,
    "fitness_level" "FitnessLevel" NOT NULL,
    "bmi" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "health_issues" TEXT,
    "activity_level" "ActivityLevel" NOT NULL,
    "workout_preference" "WorkoutPreference" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "workout_id" SERIAL NOT NULL,
    "workout_name" VARCHAR(100) NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "trainer_id" INTEGER,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("workout_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainers_email_key" ON "trainers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("trainer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
