import { Input } from "@/web/components/ui/input";
import { Button } from "@/web/components/ui/button";

type AnswerFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.SubmitEvent) => void;
};

export function AnswerForm({ value, onChange, onSubmit }: AnswerFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="answer" className="text-sm text-muted-foreground">
          Your answer
        </label>
        <Input
          id="answer"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="text-lg bg-yellow-300 hover:bg-yellow-200 text-black self-start"
      >
        Check
      </Button>
    </form>
  );
}
