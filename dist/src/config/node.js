import { existsSync, readFileSync } from 'node:fs';
import { cloud } from './cloud.js';
import { env } from './env.js';
import { hostname } from 'node:os';
import { k8sConfig } from './kubernetes.js';
import { resolve } from 'node:path';
const { NODE_ENV, PORT, FILM_SERVICE_HOST, FILM_SERVICE_PORT, LOG_DEFAULT } = env;
const computername = hostname();
let port = Number.NaN;
const portStr = PORT;
if (portStr !== undefined) {
    port = Number.parseInt(portStr, 10);
}
if (Number.isNaN(port)) {
    port = 3000;
}
const usePKI = cloud === undefined && (!k8sConfig.detected || k8sConfig.tls);
const srcDir = existsSync('src') ? 'src' : 'dist';
export const configDir = resolve(srcDir, 'config');
const tlsDir = resolve(configDir, 'tls');
const key = usePKI
    ? readFileSync(resolve(tlsDir, 'private-key.pem'))
    : undefined;
const cert = usePKI
    ? readFileSync(resolve(tlsDir, 'certificate.cer'))
    : undefined;
let httpsOptions;
if (cloud === undefined) {
    if (k8sConfig.detected && !k8sConfig.tls) {
        if (LOG_DEFAULT?.toLowerCase() !== 'true') {
            console.debug('HTTP: Lokaler Kubernetes-Cluster');
        }
    }
    else {
        if (LOG_DEFAULT?.toLowerCase() !== 'true') {
            console.debug('HTTPS: On-Premise oder Kubernetes-Cluster');
        }
        if (key === undefined || cert === undefined) {
            console.warn('Key und/oder Zertifikat fehlen');
        }
        else {
            httpsOptions = {
                key,
                cert,
            };
        }
    }
}
export const nodeConfig = {
    host: computername,
    port,
    configDir,
    httpsOptions,
    nodeEnv: NODE_ENV,
    serviceHost: FILM_SERVICE_HOST,
    servicePort: FILM_SERVICE_PORT,
};
//# sourceMappingURL=node.js.map