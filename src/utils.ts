
export class ResponseBase {
  data: any
  statusCode: number;
  message?: string;
  error?: string;

  constructor(
    data: any,
    statusCode: number,
    message?: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export enum DefaultPaginationValues {
  SKIP_DEFAULT = 0,
  TAKE_DEFAULT = 10
}

export enum SortRecords {
  ASC = 'asc',
  DESC = 'desc'
}
