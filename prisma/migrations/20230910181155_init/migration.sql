-- CreateEnum
CREATE TYPE "Measurement" AS ENUM ('cm');

-- CreateEnum
CREATE TYPE "TypeConstruction" AS ENUM ('ck');

-- CreateTable
CREATE TABLE "APU" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "measurement" "Measurement" NOT NULL,
    "type_construction" "TypeConstruction" NOT NULL,
    "transport" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "APU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APU_Activity" (
    "apu_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "APU_Activity_pkey" PRIMARY KEY ("apu_id","activity_id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "unexpected" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APU_Material" (
    "apu_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "waste" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "APU_Material_pkey" PRIMARY KEY ("apu_id","material_id")
);

-- CreateTable
CREATE TABLE "Materials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit_measurement" TEXT NOT NULL,
    "unit_value" DOUBLE PRECISION NOT NULL,
    "provider_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APU_WorkTeam" (
    "apu_id" INTEGER NOT NULL,
    "workteam_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "performance" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "APU_WorkTeam_pkey" PRIMARY KEY ("apu_id","workteam_id")
);

-- CreateTable
CREATE TABLE "WorkTeams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit_value" DOUBLE PRECISION NOT NULL,
    "unit_measurement" TEXT NOT NULL,
    "team_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "WorkTeams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APU_Labour" (
    "apu_id" INTEGER NOT NULL,
    "labour_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "performance" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "APU_Labour_pkey" PRIMARY KEY ("apu_id","labour_id")
);

-- CreateTable
CREATE TABLE "Labours" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit_measurement" TEXT NOT NULL,
    "unit_value" DOUBLE PRECISION NOT NULL,
    "work_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Labours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "APU_Activity" ADD CONSTRAINT "APU_Activity_apu_id_fkey" FOREIGN KEY ("apu_id") REFERENCES "APU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APU_Activity" ADD CONSTRAINT "APU_Activity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APU_Material" ADD CONSTRAINT "APU_Material_apu_id_fkey" FOREIGN KEY ("apu_id") REFERENCES "APU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APU_Material" ADD CONSTRAINT "APU_Material_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APU_WorkTeam" ADD CONSTRAINT "APU_WorkTeam_apu_id_fkey" FOREIGN KEY ("apu_id") REFERENCES "APU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APU_WorkTeam" ADD CONSTRAINT "APU_WorkTeam_workteam_id_fkey" FOREIGN KEY ("workteam_id") REFERENCES "WorkTeams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APU_Labour" ADD CONSTRAINT "APU_Labour_apu_id_fkey" FOREIGN KEY ("apu_id") REFERENCES "APU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APU_Labour" ADD CONSTRAINT "APU_Labour_labour_id_fkey" FOREIGN KEY ("labour_id") REFERENCES "Labours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
