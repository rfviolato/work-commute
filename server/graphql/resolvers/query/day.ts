import { IDayQueryParams } from './interface';

export default async (parent: any, { day }: IDayQueryParams) => ({ day });
