import Checkbox from "@/components/Class/Checkbox";
import CanvasTag from "@/components/Class/CanvasTag";
import GradescopeTag from "@/components/Class/GradescopeTag";

export default function Assignment({ name }: { name: string }) {
	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-1 justify-center items-center">
				<div className="p-2">
					<Checkbox />
				</div>
				<div className="flex flex-col justify-center items-start gap-1">
					<div className="font-semibold">Quiz 1</div>
					<div className="flex justify-center items-center gap-1">
						<CanvasTag />
						<div>20 pts</div>
						<div>Submitted</div>
					</div>
				</div>
			</div>
			<div className="flex gap-1 justify-center items-center">
				<div>Timer</div>
				<div>Link to external page</div>
			</div>
		</div>
	);
}
