import { HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    #private;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, typeorm: TypeOrmHealthIndicator);
    live(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    ready(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
