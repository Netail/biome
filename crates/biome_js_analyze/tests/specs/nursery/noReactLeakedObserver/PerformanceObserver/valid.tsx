/* should not generate diagnostics */
import { useEffect, useRef } from 'react';

function Valid1() {
	useEffect(() => {
		const observer = new PerformanceObserver(() => {});
		observer.observe({ entryTypes: ["measure", "mark"] });
		return () => {
			observer.disconnect();
		}
	}, []);

	return <div />;
}

function Valid2() {
	useEffect(() => {
		const observer = new PerformanceObserver(() => {}) as PerformanceObserver;
		observer.observe({ entryTypes: ["measure", "mark"] });
		return () => {
			observer.disconnect();
		}
	}, []);

	return <div />;
}

function Valid3() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new PerformanceObserver(() => console.log('performance'));
		observer.observe({ entryTypes: ["measure", "mark"] });
		return () => observer.disconnect();
	}, []);

	return <div ref={ref} />;
}

function Valid4() {
	useEffect(() => {
		const observer = new PerformanceObserver(() => {});
		observer.observe({ entryTypes: ["measure", "mark"] });
		observer.observe({ entryTypes: ["navigation"] });
		return () => {
			observer.disconnect();
		}
	}, []);

	return <div />;
}

function Valid5() {
	useEffect(() => {
		const observer = new PerformanceObserver(() => {});
		for (const type of ["measure", "mark"]) {
			observer.observe({ entryTypes: [type] });
		}
		return () => {
			observer.disconnect();
		}
	}, []);

	return <div />;
}

function Valid6() {
	useEffect(() => {
		const observer = new PerformanceObserver(() => {});
		["measure", "mark"].forEach(type => {
			observer.observe({ entryTypes: [type] });
		});
		return () => {
			observer.disconnect();
		}
	}, []);

	return <div />;
}
