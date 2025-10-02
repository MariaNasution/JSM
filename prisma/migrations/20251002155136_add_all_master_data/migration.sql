-- CreateTable
CREATE TABLE "public"."EmployeeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "EmployeeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "JobLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmployeeStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "EmployeeStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeType_name_key" ON "public"."EmployeeType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobLevel_name_key" ON "public"."JobLevel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeStatus_name_key" ON "public"."EmployeeStatus"("name");
