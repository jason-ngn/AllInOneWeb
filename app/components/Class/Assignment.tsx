"use client";

import Checkbox from "@/components/Class/Checkbox";
import CanvasTag from "@/components/Class/CanvasTag";
import GradescopeTag from "@/components/Class/GradescopeTag";
import SubmittedTag from "@/components/Class/SubmittedTag";
import TodoTag from "@/components/Class/TodoTag";
import MissingTag from "@/components/Class/MissingTag";
import GradedTag from "@/components/Class/GradedTag";
import Timer from "@/components/Class/Timer";
import ExternalLink from "@/components/Class/ExternalLink";
import { Source } from "@/app/lib/types";
import { useState } from "react";

export default function Assignment({
	id,
	name,
	maxScore,
	dueDate,
	link,
	source = Source.CANVAS,
	submitted = false,
	graded = false,
	manuallyCompleted,
	onToggleComplete,
}: {
	id: string;
	name: string;
	maxScore: number;
	dueDate: Date;
	link: string;
	source?: `${Source}`;
	submitted?: boolean;
	graded?: boolean;
	manuallyCompleted: Set<string>;
	onToggleComplete: (id: string) => void;
}) {
	return (
		<div className="relative flex justify-between items-center">
			{(submitted || graded || manuallyCompleted.has(id)) && (
				<div className="absolute -inset-x-4 top-1/2 h-px bg-current opacity-40 pointer-events-none z-10" />
			)}
			<div
				className={`flex justify-between items-center w-full ${submitted || graded || manuallyCompleted.has(id) ? "opacity-50" : ""}`}
			>
				<div className="flex gap-1 justify-center items-center">
					<div className="p-2">
						<Checkbox
							completed={submitted || graded || manuallyCompleted.has(id)}
							onCheckboxClick={() => onToggleComplete(id)}
							checkboxStatus={manuallyCompleted.has(id)}
						/>
					</div>
					<div className="flex flex-col justify-center items-start gap-1">
						<div className="font-semibold">{name}</div>
						<div className="flex justify-center items-center gap-2">
							{source === Source.CANVAS ? <CanvasTag /> : <GradescopeTag />}
							<div className="text-text-inactive">{maxScore} pts</div>
							<div>
								{graded ? (
									<GradedTag />
								) : submitted ? (
									<SubmittedTag />
								) : new Date() > dueDate ? (
									<MissingTag />
								) : (
									<TodoTag />
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-2 justify-center items-center">
					{!(submitted || graded || manuallyCompleted.has(id)) && (
						<Timer dueDate={dueDate} />
					)}
					<div>
						<ExternalLink link={link} />
					</div>
				</div>
			</div>
		</div>
	);
}
