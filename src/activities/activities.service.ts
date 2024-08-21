import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DefaultPaginationValues, ResponseBase } from 'src/utils';
import { CreateActivityDto, UpdateActivityDto } from './activities.dto';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) { }

  async getAllActivities(options: any): Promise<ResponseBase> {
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
    } else if (options?.order) {
      sort = {
        order: options.order
      }
    }

    const allActivities = await this.prisma.activities.findMany({
      skip: parseInt(options?.skip) | skipDefault,
      take: parseInt(options?.take) | takeDefault,
      where: { ...condition },
      orderBy: { ...sort }
    });

    return new ResponseBase(
      allActivities,
      HttpStatus.OK,
      'Get data successfully'
    );
  }

  async getActivity(id: number): Promise<ResponseBase> {
    const activity = await this.prisma.activities.findUnique({
      where: { id: Number(id) },
    });

    if (!activity) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'Activity not found'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      activity,
      HttpStatus.OK,
      'Get data successfully'
    );
  }

  async createActivity(data: CreateActivityDto): Promise<ResponseBase> {
    let activity = null;
    const defaultOrder: number = 1;
    
    // Get last order
    const lastOrder = await this.prisma.activities.aggregate({
      _max: {
        order: true
      },
    });

    if (lastOrder && typeof lastOrder?._max?.order === 'number') {
      data.order = lastOrder._max.order + defaultOrder;
    } else {
      data.order = defaultOrder;
    }

    try {
      activity = await this.prisma.activities.create({
        data: {
          ...data
        },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          activity,
          HttpStatus.BAD_REQUEST,
          'Activity not created'
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      activity,
      HttpStatus.CREATED,
      'Activity created'
    );
  }

  async updateActivity(id: number, data: UpdateActivityDto): Promise<ResponseBase> {
    let activity = null;

    try {
      activity = await this.prisma.activities.update({
        where: { id: Number(id) },
        data: {
          ...data
        }
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          activity,
          HttpStatus.BAD_REQUEST,
          'Activity not updated'
        ),
        HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseBase(
      activity,
      HttpStatus.OK,
      'Activity updated'
    );
  }

  async deleteActivity(id: number): Promise<ResponseBase> {
    try {
      await this.prisma.activities.update({
        where: { id: Number(id) },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new HttpException(
        new ResponseBase(
          null,
          HttpStatus.NOT_FOUND,
          'Activity not deleted'
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseBase(
      null,
      HttpStatus.OK,
      'Activity deleted'
    );
  }

}
