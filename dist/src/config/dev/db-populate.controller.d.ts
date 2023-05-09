import { DbPopulateService } from './db-populate.service.js';
import { Response } from 'express';
export declare class DbPopulateController {
    #private;
    constructor(service: DbPopulateService);
    dbPopulate(res: Response): Promise<Response>;
}
