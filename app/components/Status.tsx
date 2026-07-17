import Green from "@/components/StatusIcons/Green";
import Red from "@/components/StatusIcons/Red";

export default function Status() {
	return (
		<div className="flex flex-col gap-1">
			<div className="text-subtext">CONNECTED</div>
			<div className="flex flex-row gap-2">
				<div className="flex justify-center items-center">
					<Green />
				</div>
				<div>Canvas</div>
				<div className="text-subtext">synced 2m ago</div>
			</div>
			<div className="flex flex-row gap-2">
				<div className="flex justify-center items-center">
					<Red />
				</div>
				<div>Gradescope</div>
				<div className="text-subtext">synced 2m ago</div>
			</div>
		</div>
	);
}
