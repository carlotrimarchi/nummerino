import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";

type SpellingFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function SpellingForm({
  value,
  onChange,
  onSubmit,
}: SpellingFormProps) {
  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="number-input" className="text-sm text-zinc-400">
          Enter a number
        </label>
        <Input
          id="number-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="e.g. 21, 37, 42, 1000, 999999..."
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="text-lg bg-yellow-300 hover:bg-yellow-200 text-black self-start"
      >
        Spell it out
      </Button>
    </form>
  );
}
