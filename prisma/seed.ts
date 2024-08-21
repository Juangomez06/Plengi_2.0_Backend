import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
  const materials = await prisma.materials.createMany({
    data: [
      {
        name: 'varilla de 1/4',
        unitMeasurement: 'und',
        unitValue: 12.000,
        providerType: 'proveedor 1'
      },
      {
        name: 'varilla de 3/8',
        unitMeasurement: 'und',
        unitValue: 18.000,
        providerType: 'proveedor 2'
      },
      {
        name: 'varilla de 1/2',
        unitMeasurement: 'und',
        unitValue: 26.000,
        providerType: 'proveedor 3'
      }
    ]
  });

  const teams = await prisma.workTeams.createMany({
    data: [
      {
        name: 'retroexcavadora',
        unitMeasurement: 'h',
        unitValue: 120.000,
        teamType: 'pesado'
      },
      {
        name: 'volqueta',
        unitMeasurement: 'viaje',
        unitValue: 80.000,
        teamType: 'pesado'
      },
      {
        name: 'compactador',
        unitMeasurement: 'dia',
        unitValue: 80.000,
        teamType: 'pesado'
      }
    ]
  });

  const labours = await prisma.labours.createMany({
    data: [
      {
        name: 'maestro de obra',
        unitMeasurement: 'dia',
        unitValue: 110.000,
        workType: 'manual'
      },
      {
        name: 'oficia',
        unitMeasurement: 'dia',
        unitValue: 90.000,
        workType: 'manual'
      },
      {
        name: 'ayudante 1',
        unitMeasurement: 'dia',
        unitValue: 60.000,
        workType: 'manual'
      }
    ]
  })

  console.log({ materials, teams, labours });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1);
  });
