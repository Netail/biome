/* should generate diagnostics */
import { useEffect, useRef } from 'react';

function Invalid1() {
	useEffect(() => {
		const observer = new PerformanceObserver(() => { });
		observer.observe({ entryTypes: ["measure", "mark"] });
	}, []);

	return <div />;
}

function Invalid2() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new PerformanceObserver(() => console.log('performance'));
		observer.observe({ entryTypes: ["measure", "mark"] });
	}, []);

	return <div ref={ref} />;
}

function Invalid3() {
	useEffect(() => {
		new PerformanceObserver(() => { });
	}, []);

	return <div />;
}

function Invalid4() {
	useEffect(() => {
		const observer = new PerformanceObserver(() => { }) as PerformanceObserver;
		observer.observe({ entryTypes: ["measure", "mark"] });
	}, []);

	return <div />;
}

function Invalid5() {
	useEffect(() => {
		const observer = new PerformanceObserver(() => { });
		(observer.observe as any)({ entryTypes: ["measure", "mark"] });
	}, []);

	return <div />;
}
