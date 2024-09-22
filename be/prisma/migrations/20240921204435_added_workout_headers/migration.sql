-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "description" TEXT,
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "image_urls" TEXT[],
ADD COLUMN     "target_body_part" TEXT,
ADD COLUMN     "video_url" TEXT,
ADD COLUMN     "workout_group" TEXT,
ADD COLUMN     "workout_level" VARCHAR(50);

-- CreateTable
CREATE TABLE "_UserWorkouts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserWorkouts_AB_unique" ON "_UserWorkouts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserWorkouts_B_index" ON "_UserWorkouts"("B");

-- AddForeignKey
ALTER TABLE "_UserWorkouts" ADD CONSTRAINT "_UserWorkouts_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWorkouts" ADD CONSTRAINT "_UserWorkouts_B_fkey" FOREIGN KEY ("B") REFERENCES "workouts"("workout_id") ON DELETE CASCADE ON UPDATE CASCADE;
