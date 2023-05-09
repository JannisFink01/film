import RE2 from 're2';
import { env } from './env.js';
import { hostname } from 'node:os';
const computername = hostname();
export let cloud;
const openshiftRegexp = new RE2('beispiel-\\d+-w{5}', 'u');
if (openshiftRegexp.test(computername)) {
    cloud = 'openshift';
}
if (env.LOG_DEFAULT?.toLowerCase() !== 'true') {
    console.debug('cloud: %s', cloud);
}
//# sourceMappingURL=cloud.js.map