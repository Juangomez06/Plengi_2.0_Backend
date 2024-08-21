import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DefaultPaginationValues, ResponseBase } from 'src/utils';
import { CreateMaterialDto, UpdateMaterialDto } from './materials.dto';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) { }

  async getAllMaterials(options: any): Promise<ResponseBase> {
    let condition = {};
    let sort = {};
    const skipDefault = DefaultPaginationValues.SKIP_DEFAULT;
    const takeDefault = DefaultPaginationValues.TAKE_DEFAULT;

    if (options?.showDelete === 'true') {
      condition = {
        NOT: {
          deletedAt: null,
        }
      };
    } else {
      condition = {
        deletedAt: null
      };
    }

    if (options?.name) {
      condition = {
        ...condition,
        name: {
          contains: options.name,
          mode: 'insensitive'
        }
      }
    }

    if (options?.sort) {
      sort = {
        id: options.sort
      }
    }

    const allMaterials = await this.prisma.materials.findMany({
      skip: parseInt(options?.skip) | skipDefault,
      take: parseInt(options?.take) | takeDefault,
      where: { ...condition },
      orderBy: { ...sort }
    });

    return new ResponseBase(
      allMaterials,
      HttpStatus.OK,
      'Get data successfully'
    );
  }

  async getMaterial(id: number): Promise<ResponseBase> {
    const material = await this.prisma.materials.findUnique({
      where: { id: Number(id) },
    });

    if (!material) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'Material not found'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      material,
      HttpStatus.OK,
      'Get data successfully'
    );
  }

  async createMaterial(data: CreateMaterialDto): Promise<ResponseBase> {
    let material = null;

    try {
      material = await this.prisma.materials.create({
        data: {
          ...data
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          material,
          HttpStatus.BAD_REQUEST,
          'Material not created'
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      material,
      HttpStatus.CREATED,
      'Material created'
    );
  }

  async createMaterialWithApu(data: any): Promise<ResponseBase> {
    let material = null;

    try {
      material = await this.prisma.materials.create({
        data: {
          name: data.name,
          unitMeasurement: data.unit_measurement,
          unitValue: data.unit_value,
          providerType: data.provider_type,
          apus: {
            create: [
              {
                amount: data.amount,
                waste: data.waste,
                apu: {
                  connect: {
                    id: data.apu_id,
                  },
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          material,
          HttpStatus.NOT_FOUND,
          'Material not created'
        ),
        HttpStatus.NOT_FOUND
      );
    }

    return new ResponseBase(
      material,
      HttpStatus.CREATED,
      'Material created'
    );
  }

  async updateMaterial(id: number, data: UpdateMaterialDto): Promise<ResponseBase> {
    let material = null;

    try {
      material = await this.prisma.materials.update({
        where: { id: Number(id) },
        data: {
          ...data
        }
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          material,
          HttpStatus.BAD_REQUEST,
          'Material not updated'
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      material,
      HttpStatus.OK,
      'Material updated'
    );
  }

  async updateMaterialWithApu(id: number, data: any): Promise<ResponseBase> {
    let material = null;
    const apu_id = data.apu_id;
    const material_id = data.material_id;

    try {
      material = await this.prisma.materials.update({
        where: { id: Number(id) },
        data: {
          name: data.name,
          unitMeasurement: data.unit_measurement,
          unitValue: data.unit_value,
          providerType: data.provider_type,
          apus: {
            update: [
              {
                where: {
                  apu_id_material_id: { apu_id, material_id },
                  apu_id: data.apu_id,
                  material_id: data.material_id,
                },
                data: {
                  amount: data.amount,
                  waste: data.waste
                }
              }
            ]
          }
        }
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          material,
          HttpStatus.NOT_FOUND,
          'Material not updated'
        ),
        HttpStatus.NOT_FOUND
      );
    }

    return new ResponseBase(
      material,
      HttpStatus.OK,
      'Material updated'
    );
  }

  async deleteMaterial(id: number): Promise<ResponseBase> {
    try {
      await this.prisma.materials.update({
        where: { id: Number(id) },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'Material not deleted'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      null,
      HttpStatus.OK,
      'Material deleted'
    );
  }
}
