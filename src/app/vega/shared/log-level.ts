import { vega } from './vega';
import { environment } from './../../shared';

const developmentLogLevel = vega.Warn;
export const defaultLogLevel = environment.production ? vega.None : developmentLogLevel;
