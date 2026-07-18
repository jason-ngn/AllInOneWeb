import Green from "@/components/StatusIcons/Green";
import Red from "@/components/StatusIcons/Red";

export default function Status({
	canvasOk = true,
	gradescopeOk = true,
}: {
	canvasOk: boolean;
	gradescopeOk: boolean;
}) {
	return (
		<div className="flex flex-col gap-1">
			<div className="flex flex-row gap-2">
				<div className="flex justify-center items-center">
					{canvasOk ? <Green /> : <Red />}
				</div>
				<div>Canvas</div>
				<div className="text-subtext">
					{canvasOk ? "connected" : "unavailable"}
				</div>
			</div>
			<div className="flex flex-row gap-2">
				<div className="flex justify-center items-center">
					{gradescopeOk ? <Green /> : <Red />}
				</div>
				<div>Gradescope</div>
				<div className="text-subtext">
					{gradescopeOk ? "connected" : "unavailable"}
				</div>
			</div>
		</div>
	);
}
