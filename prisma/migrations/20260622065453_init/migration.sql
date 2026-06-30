-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fruits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "originCountry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fruits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutritional_values" (
    "id" SERIAL NOT NULL,
    "fruitId" INTEGER NOT NULL,
    "calories" DOUBLE PRECISION,
    "proteins" DOUBLE PRECISION,
    "carbohydrates" DOUBLE PRECISION,
    "fats" DOUBLE PRECISION,
    "fibers" DOUBLE PRECISION,
    "vitaminC" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutritional_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recognition_history" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fruitId" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "confidenceScore" DOUBLE PRECISION,
    "recognizedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recognition_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fruitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nutritional_values_fruitId_key" ON "nutritional_values"("fruitId");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_fruitId_key" ON "favorites"("userId", "fruitId");

-- AddForeignKey
ALTER TABLE "nutritional_values" ADD CONSTRAINT "nutritional_values_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "fruits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recognition_history" ADD CONSTRAINT "recognition_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recognition_history" ADD CONSTRAINT "recognition_history_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "fruits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fruitId_fkey" FOREIGN KEY ("fruitId") REFERENCES "fruits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
