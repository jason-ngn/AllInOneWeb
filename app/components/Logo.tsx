export default function Logo({
	textColorClass = "text-black",
}: {
	textColorClass?: string;
}) {
	return (
		<div className="flex flex-row gap-2">
			<div className="bg-black text-white py-2 px-3 rounded-xl font-bold justify-center items-center">
				A
			</div>
			<div
				className={`flex justify-center items-center font-bold text-lg ${textColorClass}`}
			>
				All In One
			</div>
		</div>
	);
}
