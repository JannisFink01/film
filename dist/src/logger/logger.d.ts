import { type SonicBoom } from 'sonic-boom';
import type pino from 'pino';
export declare const getLogger: (context: string, kind?: string) => pino.Logger<pino.ChildLoggerOptions & SonicBoom>;
