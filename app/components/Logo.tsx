import Image from "next/image";
import logo from "@/app/logo.svg";

export default function Logo({
	textColorClass = "text-black",
}: {
	textColorClass?: string;
}) {
	return (
		<div className="flex flex-row gap-2">
			<Image src={logo} alt="All In One Logo" className="w-10" />
			<div
				className={`flex justify-center items-center font-bold text-lg ${textColorClass}`}
			>
				All In One
			</div>
		</div>
	);
}
