import { type ValueTransformer } from 'typeorm';
export declare class DecimalTransformer implements ValueTransformer {
    to(decimal?: number): string | undefined;
    from(decimal?: string): number | undefined;
}
