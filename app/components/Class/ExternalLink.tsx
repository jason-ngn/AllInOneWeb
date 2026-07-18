import Link from "next/link";

export default function ExternalLink({ link }: { link: string }) {
	return (
		<div className="text-text-inactive">
			<Link href={link} target="_blank">
				↗
			</Link>
		</div>
	);
}
