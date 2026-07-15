import { Switch } from "@/web/components/ui/switch";
import { useState } from "react";
import type { SpelledOutNumber } from "@/core/numberToText/numberToText";
type SpellingFormat = "joined" | "splitted";

type SpellingOutputProps = {
  spelledOutNumber: SpelledOutNumber | null;
};

export function SpellingOutput({ spelledOutNumber }: SpellingOutputProps) {
  const [spellingFormat, setSpellingFormat] =
    useState<SpellingFormat>("joined");
  const toggleFormat = () =>
    setSpellingFormat((format) =>
      format === "joined" ? "splitted" : "joined",
    );
  const displaySpelling = spelledOutNumber?.[spellingFormat] ?? "-";

  return (
    <>
      <div className="flex gap-3 justify-between">
        <label htmlFor="spelled-out-number" className="text-muted-foreground">
          German spelling
        </label>

        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="spelling-format" className="sr-only">
            Spelling format
          </label>
          <span
            className={
              spelledOutNumber && spellingFormat === "joined"
                ? "text-yellow-300 font-semibold"
                : "text-muted-foreground"
            }
          >
            joined
          </span>
          <Switch
            id="spelling-format"
            disabled={!spelledOutNumber}
            onCheckedChange={toggleFormat}
          />
          <span
            className={
              spelledOutNumber && spellingFormat === "splitted"
                ? "text-yellow-300 font-semibold"
                : "text-muted-foreground"
            }
          >
            splitted
          </span>
        </div>
      </div>
      <div className="overflow-x-auto pb-4">
        <output
          id="spelled-out-number"
          className={`text-2xl ${!spelledOutNumber ? "text-muted-foreground" : ""}`}
          lang="de"
        >
          {displaySpelling}
        </output>
      </div>
    </>
  );
}
