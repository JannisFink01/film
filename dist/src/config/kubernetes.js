import { env } from './env.js';
import { hostname } from 'node:os';
const kubernetesRegexp = /^\w+-[a-z\d]{8,10}-[a-z\d]{5}$/u;
const isK8s = kubernetesRegexp.exec(hostname()) !== null;
const { K8S_TLS, LOG_DEFAULT } = env;
export const k8sConfig = {
    detected: isK8s,
    tls: K8S_TLS === undefined || K8S_TLS.toLowerCase() === 'true',
};
if (LOG_DEFAULT?.toLowerCase() !== 'true') {
    console.debug('k8sConfig: %o', k8sConfig);
}
//# sourceMappingURL=kubernetes.js.map