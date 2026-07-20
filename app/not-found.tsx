import Logo from "@/components/Logo";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="bg-white h-screen p-6 flex flex-col">
			<Logo />
			<div className="flex justify-center items-center text-black flex-1">
				<div className="flex flex-col justify-center items-center gap-3 w-1/2">
					<div className="bg-404-bg text-404-fill px-4 py-1 font-semibold text-xl rounded-xl">
						404
					</div>
					<div className="font-bold text-2xl">The assignment wandered off</div>
					<div className="text-text-inactive text-center">
						The page you&apos;re looking for isn&apos;t here — it may have been
						removed, renamed, or the link&apos;s just wrong. Check the course
						feed instead.
					</div>
					<div className="flex justify-center items-center gap-2">
						<Link
							href={"/"}
							className="bg-black text-white px-5 py-3 text-center font-semibold rounded-xl cursor-pointer"
						>
							Back to assignments
						</Link>
						<Link
							href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
							target="_blank"
							className="border-2 border-line-break text-text-inactive px-5 py-3 text-center font-semibold rounded-xl cursor-pointer"
						>
							Report a problem
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
