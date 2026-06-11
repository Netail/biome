/* should generate diagnostics */
import { useEffect, useRef } from 'react';

function Invalid1() {
	useEffect(() => {
		const observer = new ReportingObserver(() => { });
		observer.observe();
	}, []);

	return <div />;
}

function Invalid2() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new ReportingObserver(() => console.log('reporting'));
		observer.observe();
	}, []);

	return <div ref={ref} />;
}

function Invalid3() {
	useEffect(() => {
		new ReportingObserver(() => {});
	}, []);

	return <div />;
}

function Invalid5() {
	useEffect(() => {
		const observer = new ReportingObserver(() => {}) as ReportingObserver;
		observer.observe();
	}, []);

	return <div />;
}

function Invalid8() {
	useEffect(() => {
		const observer = new ReportingObserver(() => {});
		(observer.observe as any)();
	}, []);

	return <div />;
}
