"use client";

import { useEffect, useState } from "react";

export default function Timer({ dueDate }: { dueDate: Date }) {
	const [timeLeft, setTimeLeft] = useState(
		() => dueDate.getTime() - Date.now(),
	);

	useEffect(() => {
		const id = setInterval(() => {
			setTimeLeft(dueDate.getTime() - Date.now());
		}, 1000);

		return () => clearInterval(id);
	}, [dueDate]);

	const abs = Math.abs(timeLeft);
	const days = Math.floor(abs / 86_400_000);
	const hours = Math.floor((abs % 86_400_000) / 3_600_000);
	const mins = Math.floor((abs % 3_600_000) / 60_000);
	const secs = Math.floor((abs % 60_000) / 1_000);

	if (timeLeft <= 0)
		return (
			<div className="text-timer-red">
				Overdue by {days > 0 && `${days}d `}
				{(days > 0 || hours > 0) && `${hours}h `}
				{mins}m {secs}s
			</div>
		);
	if (days === 0 && hours < 12) {
		return (
			<div>
				<div className="text-timer-red">
					{days > 0 && `${days}d `}
					{(days > 0 || hours > 0) && `${hours}h `}
					{mins}m {secs}s
				</div>
			</div>
		);
	} else if (days === 0 && hours >= 12) {
		return (
			<div>
				<div className="text-timer-orange">
					{days > 0 && `${days}d `}
					{(days > 0 || hours > 0) && `${hours}h `}
					{mins}m {secs}s
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className="text-text-inactive">
					{days > 0 && `${days}d `}
					{(days > 0 || hours > 0) && `${hours}h `}
					{mins}m {secs}s
				</div>
			</div>
		);
	}
}
