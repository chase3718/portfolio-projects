import React, { DependencyList, useCallback } from 'react';
import { dequal } from 'dequal';

export const useDeepCallback = <T extends (...args: any[]) => any>(callback: T, dependencies: DependencyList) => {
	const prevDependencies = React.useRef<DependencyList>(dependencies);
	const areDeepsEqual = dequal(prevDependencies.current, dependencies);
	if (!areDeepsEqual) {
		prevDependencies.current = dependencies;
	}

	return useCallback(callback, prevDependencies.current);
};
