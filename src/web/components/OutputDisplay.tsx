import { Switch } from "@/web/components/ui/switch";
import { useState } from "react";

type SpellingFormat = "joined" | "splitted";

type OutputDisplayProps = {
	conversionResult: {
		number: number | null;
		spelled: { joined: string; splitted: string } | null;
	};
};

export default function OutputDisplay({
	conversionResult,
}: OutputDisplayProps) {
	const [spellingFormat, setSpellingFormat] =
		useState<SpellingFormat>("joined");
	const toggleFormat = () =>
		setSpellingFormat((format) =>
			format === "joined" ? "splitted" : "joined",
		);
	const displaySpelling = conversionResult.spelled?.[spellingFormat] ?? "-";

	return (
		<div className="rounded-xl border border-border bg-muted/30 min-h-[120px]">
			<div className="flex flex-col gap-1 p-4 border-b border-border">
				<label htmlFor="input-number" className="text-muted-foreground">
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
			<div className="flex flex-col gap-1 pt-4 px-4 pb-4">
				<div className="flex gap-3 justify-between">
					<label
						htmlFor="spelled-out-number"
						className="text-muted-foreground"
					>
						German spelling
					</label>

					<div className="flex items-center gap-2 text-sm">
						<label htmlFor="spelling-format" className="sr-only">
							Spelling format
						</label>
						<span className={conversionResult.spelled && spellingFormat === "joined" ? "text-yellow-300 font-semibold" : "text-muted-foreground"}>joined</span>
						<Switch
							id="spelling-format"
							disabled={!conversionResult.spelled}
							onCheckedChange={toggleFormat}
							/>
						<span className={conversionResult.spelled && spellingFormat === "splitted" ? "text-yellow-300 font-semibold" : "text-muted-foreground"}>splitted</span>
					</div>
				</div>
				<div className="overflow-x-auto pb-4">
					<output
						id="spelled-out-number"
						className={`text-2xl ${!conversionResult.spelled ? "text-muted-foreground" : ""}`}
						lang="de"
					>
						{displaySpelling}
					</output>
				</div>
			</div>
		</div>
	);
}
