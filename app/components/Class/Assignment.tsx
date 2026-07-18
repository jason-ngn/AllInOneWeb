import Checkbox from "@/components/Class/Checkbox";
import CanvasTag from "@/components/Class/CanvasTag";
import GradescopeTag from "@/components/Class/GradescopeTag";
import SubmittedTag from "@/components/Class/SubmittedTag";
import TodoTag from "@/components/Class/TodoTag";
import MissingTag from "@/components/Class/MissingTag";
import GradedTag from "@/components/Class/GradedTag";
import Timer from "@/components/Class/Timer";
import ExternalLink from "@/components/Class/ExternalLink";

export default function Assignment({ name }: { name: string }) {
	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-1 justify-center items-center">
				<div className="p-2">
					<Checkbox />
				</div>
				<div className="flex flex-col justify-center items-start gap-1">
					<div className="font-semibold">Quiz 1</div>
					<div className="flex justify-center items-center gap-2">
						<CanvasTag />
						<div className="text-text-inactive">20 pts</div>
						<div>
							<SubmittedTag />
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-2 justify-center items-center">
				<div>
					<Timer dueDate={new Date(2026, 6, 19, 23, 59, 59)} />
				</div>
				<div>
					<ExternalLink link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
				</div>
			</div>
		</div>
	);
}
