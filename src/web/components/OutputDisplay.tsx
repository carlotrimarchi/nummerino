type OutputDisplayProps = {
	conversionResult: {
		number: number | null;
		spelled: string | null;
	};
};

export default function OutputDisplay({
	conversionResult,
}: OutputDisplayProps) {
	return (
		<div className="rounded-xl border border-border bg-muted/30 min-h-[120px]">
			<div className="flex flex-col gap-1 p-4 border-b border-border">
				<label
					htmlFor="input-number"
					className="text-muted-foreground"
				>
					Your input
				</label>
				<output
					id="input-number"
					className={`text-2xl ${conversionResult.number === null ? "text-muted-foreground" : ""}`}
				>
					{conversionResult.number ?? (
						<span aria-hidden="true">-</span>
					)}
				</output>
			</div>
			<div className="flex flex-col gap-1 p-4">
				<label
					htmlFor="spelled-out-number"
					className="text-muted-foreground"
				>
					German spelling
				</label>
				<output
					id="spelled-out-number"
					className={`text-2xl ${!conversionResult.spelled ? "text-muted-foreground" : ""}`}
					lang="de"
				>
					{conversionResult.spelled ?? "-"}
				</output>
			</div>
		</div>
	);
}
