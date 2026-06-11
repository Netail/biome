/* should not generate diagnostics */
import { useEffect, useRef } from 'react';

function Valid1() {
	useEffect(() => {
		const observer = new ReportingObserver(() => {});
		observer.observe();
		return () => {
			observer.disconnect();
		}
	}, []);

	return <div />;
}

function Valid2() {
	useEffect(() => {
		const observer = new ReportingObserver(() => {}) as ReportingObserver;
		observer.observe();
		return () => {
			observer.disconnect();
		}
	}, []);

	return <div />;
}

function Valid4() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new ReportingObserver(() => console.log('reporting'));
		observer.observe();
		return () => observer.disconnect();
	}, []);

	return <div ref={ref} />;
}

function Valid6() {
	useEffect(() => {
		const observer = new ReportingObserver(() => {});
		observer.observe();
		observer.observe();
		return () => {
			observer.disconnect();
		}
	}, []);

	return <div />;
}
