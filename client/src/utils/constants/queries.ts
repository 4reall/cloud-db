import { BreakpointsEnum } from 'utils/constants/breakpoints';

export const queries = {
	down: {
		xs: `(max-width: ${BreakpointsEnum.xs})`,
		sm: `(max-width: ${BreakpointsEnum.sm})`,
		md: `(max-width: ${BreakpointsEnum.md})`,
		lg: `(max-width: ${BreakpointsEnum.lg})`,
		xl: `(max-width: ${BreakpointsEnum.xl})`,
		xxl: `(max-width: ${BreakpointsEnum.xxl})`,
	},
	up: {
		xs: `(min-width: ${BreakpointsEnum.xs})`,
		sm: `(min-width: ${BreakpointsEnum.sm})`,
		md: `(min-width: ${BreakpointsEnum.md})`,
		lg: `(min-width: ${BreakpointsEnum.lg})`,
		xl: `(min-width: ${BreakpointsEnum.xl})`,
		xxl: `(min-width: ${BreakpointsEnum.xxl})`,
	},
};

export type Query = typeof queries[keyof typeof queries];
