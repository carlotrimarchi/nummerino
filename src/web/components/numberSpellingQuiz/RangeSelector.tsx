import { useState } from "react";
import { Slider } from "@/web/components/ui/slider";
import { Input } from "@/web/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/web/components/ui/tabs";

const TIER_VALUES = [0, 20, 100, 1_000, 1_000_000, 999_999_999_999_999];
const TIER_LABELS = ["0", "20", "100", "1.000", "1.000.000", "Max"];
const DEFAULT_TIER_INDEXES: [number, number] = [0, 2];

export type NumberRange = { from: number; to: number };

type RangeSelectorProps = {
  onChange: (range: NumberRange) => void;
};

export function RangeSelector({ onChange }: RangeSelectorProps) {
  const [tierIndexes, setTierIndexes] =
    useState<[number, number]>(DEFAULT_TIER_INDEXES);
  const [customRange, setCustomRange] = useState<NumberRange>({
    from: TIER_VALUES[DEFAULT_TIER_INDEXES[0]],
    to: TIER_VALUES[DEFAULT_TIER_INDEXES[1]],
  });

  function handleValueChange(value: number[]) {
    const [fromIndex, toIndex] = value as [number, number];
    setTierIndexes([fromIndex, toIndex]);
    onChange({ from: TIER_VALUES[fromIndex], to: TIER_VALUES[toIndex] });
  }

  function handleTickClick(clickedIndex: number) {
    const [fromIndex, toIndex] = tierIndexes;
    const distanceToFrom = Math.abs(clickedIndex - fromIndex);
    const distanceToTo = Math.abs(clickedIndex - toIndex);
    const nextIndexes: [number, number] =
      distanceToFrom <= distanceToTo
        ? [clickedIndex, toIndex]
        : [fromIndex, clickedIndex];
    nextIndexes.sort((a, b) => a - b);
    handleValueChange(nextIndexes);
  }

  function handleCustomChange(patch: Partial<NumberRange>) {
    const nextRange = { ...customRange, ...patch };
    setCustomRange(nextRange);
    onChange(nextRange);
  }

  return (
    <Tabs
      defaultValue="range"
      onValueChange={(value) =>
        onChange(
          value === "custom"
            ? customRange
            : {
                from: TIER_VALUES[tierIndexes[0]],
                to: TIER_VALUES[tierIndexes[1]],
              },
        )
      }
      className="rounded-xl border border-border bg-muted/30 p-4 gap-4"
    >
      <h2 className="text-muted-foreground">Number range</h2>
      <TabsList className="w-full">
        <TabsTrigger value="range">Presets</TabsTrigger>
        <TabsTrigger value="custom">Custom</TabsTrigger>
      </TabsList>

      <TabsContent value="range">
        <Slider
          min={0}
          max={TIER_VALUES.length - 1}
          step={1}
          minStepsBetweenThumbs={1}
          value={tierIndexes}
          onValueChange={handleValueChange}
          getAriaValueText={(tierIndex) => TIER_LABELS[tierIndex]}
        />
        <ul className="relative mt-1 h-5 text-sm">
          {TIER_LABELS.map((label, index) => {
            const isSelected =
              index === tierIndexes[0] || index === tierIndexes[1];
            const isFirst = index === 0;
            const isLast = index === TIER_LABELS.length - 1;
            const translate = isFirst
              ? "translate-x-0"
              : isLast
                ? "-translate-x-full"
                : "-translate-x-1/2";
            return (
              <li
                key={label}
                className={`absolute ${translate} whitespace-nowrap`}
                style={{ left: `${(index / (TIER_LABELS.length - 1)) * 100}%` }}
              >
                <button
                  type="button"
                  onClick={() => handleTickClick(index)}
                  aria-current={isSelected}
                  className={
                    "cursor-pointer hover:underline " +
                    (isSelected
                      ? "text-yellow-300 font-semibold"
                      : "text-muted-foreground")
                  }
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </TabsContent>

      <TabsContent value="custom">
        <div className="flex items-center gap-3">
          <label className="flex flex-col gap-1 text-sm text-muted-foreground grow">
            From
            <Input
              type="number"
              min={0}
              value={customRange.from}
              onChange={(e) =>
                handleCustomChange({ from: Number(e.target.value) })
              }
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-muted-foreground grow">
            To
            <Input
              type="number"
              min={0}
              value={customRange.to}
              onChange={(e) =>
                handleCustomChange({ to: Number(e.target.value) })
              }
            />
          </label>
        </div>
      </TabsContent>
    </Tabs>
  );
}
