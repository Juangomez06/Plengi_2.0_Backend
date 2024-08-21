import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DefaultPaginationValues, ResponseBase } from 'src/utils';
import { CreateLabourDto, UpdateLabourDto } from './labours.dto';

@Injectable()
export class LaboursService {
  constructor(private prisma: PrismaService) { }

  async getAllLabours(options: any): Promise<ResponseBase> {
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

    const allLabours = await this.prisma.labours.findMany({
      skip: parseInt(options?.skip) | skipDefault,
      take: parseInt(options?.take) | takeDefault,
      where: { ...condition },
      orderBy: { ...sort }
    });

    return new ResponseBase(
      allLabours,
      HttpStatus.OK,
      'Get data successfully'
    );
  }

  async getLabour(id: number): Promise<ResponseBase> {
    const labour = await this.prisma.labours.findUnique({
      where: { id: Number(id) },
    });

    if (!labour) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'Labour not found'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      labour,
      HttpStatus.OK,
      'Get data successfully'
    )
  }

  async createLabour(data: CreateLabourDto): Promise<ResponseBase> {
    let labour = null;

    try {
      labour = await this.prisma.labours.create({
        data: {
          ...data
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          labour,
          HttpStatus.BAD_REQUEST,
          'Labour not created'
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      labour,
      HttpStatus.CREATED,
      'Labour created'
    );
  }

  async createLabourWithApu(data: any): Promise<ResponseBase> {
    let labour = null;

    try {
      labour = await this.prisma.labours.create({
        data: {
          name: data.name,
          unitMeasurement: data.unit_measurement,
          unitValue: data.unit_value,
          workType: data.work_type,
          apus: {
            create: [
              {
                amount: data.amount,
                performance: data.performance,
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
          labour,
          HttpStatus.NOT_FOUND,
          'Labour not created'
        ),
        HttpStatus.NOT_FOUND
      );
    }

    return new ResponseBase(
      labour,
      HttpStatus.CREATED,
      'Labour created'
    );
  }

  async updateLabour(id: number, data: UpdateLabourDto): Promise<ResponseBase> {
    let labour = null;

    try {
      labour = await this.prisma.labours.update({
        where: { id: Number(id) },
        data: {
          ...data
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          labour,
          HttpStatus.BAD_REQUEST,
          'Labour not updated'
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      labour,
      HttpStatus.OK,
      'Labour updated'
    );
  }

  async updateLabourWithApu(id: number, data: any): Promise<ResponseBase> {
    let labour = null;
    const apu_id = data.apu_id;
    const labour_id = Number(id)

    try {
      labour = await this.prisma.labours.update({
        where: { id: labour_id },
        data: {
          name: data.name,
          unitMeasurement: data.unit_measurement,
          unitValue: data.unit_value,
          workType: data.work_type,
          apus: {
            update: [
              {
                where: {
                  apu_id_labour_id: { apu_id, labour_id },
                  apu_id: data.apu_id,
                  labour_id: labour_id,
                },
                data: {
                  amount: data.amount,
                  performance: data.performance
                }
              }
            ]
          }
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          labour,
          HttpStatus.NOT_FOUND,
          'Labour not updated'
        ),
        HttpStatus.NOT_FOUND
      );
    }

    return new ResponseBase(
      labour,
      HttpStatus.OK,
      'Labour updated'
    );
  }

  async deleteLabour(id: number): Promise<ResponseBase> {
    try {
      await this.prisma.labours.update({
        where: { id: Number(id) },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'Labour not deleted'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      null,
      HttpStatus.OK,
      'Labour deleted'
    );
  }
}
