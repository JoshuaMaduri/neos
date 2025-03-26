-- CreateTable
CREATE TABLE "TCGFranchise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "TCGFranchise_pkey" PRIMARY KEY ("id")
);
