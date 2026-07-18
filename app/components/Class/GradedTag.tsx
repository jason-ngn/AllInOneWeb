export default function GradedTag({
	score,
	maxScore,
}: {
	score: number;
	maxScore: number;
}) {
	return (
		<div className="text-xs font-semibold text-submitted-tag-fill bg-submitted-tag-bg rounded-lg py-0.5 px-2.5">
			Graded {score}/{maxScore}
		</div>
	);
}
