-- CreateTable
CREATE TABLE "public"."CompanyBranch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "CompanyBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Division" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyBranch_name_key" ON "public"."CompanyBranch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Division_name_branchId_key" ON "public"."Division"("name", "branchId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_divisionId_key" ON "public"."Department"("name", "divisionId");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_departmentId_key" ON "public"."Unit"("name", "departmentId");

-- AddForeignKey
ALTER TABLE "public"."Division" ADD CONSTRAINT "Division_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Department" ADD CONSTRAINT "Department_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Department" ADD CONSTRAINT "Department_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "public"."Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Unit" ADD CONSTRAINT "Unit_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Unit" ADD CONSTRAINT "Unit_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "public"."Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Unit" ADD CONSTRAINT "Unit_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
