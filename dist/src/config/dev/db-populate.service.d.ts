import { type OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class DbPopulateService implements OnApplicationBootstrap {
    #private;
    constructor(dataSource: DataSource);
    onApplicationBootstrap(): Promise<void>;
    populateTestdaten(): Promise<void>;
}
