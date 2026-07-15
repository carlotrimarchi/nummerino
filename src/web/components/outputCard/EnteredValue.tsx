type EnteredValueProps = {
  id: string;
  label: string;
  value: string | number | null;
};

export function EnteredValue({ id, label, value }: EnteredValueProps) {
  const isEmpty = value === null || value === "";

  return (
    <>
      <label htmlFor={id} className="text-muted-foreground">
        {label}
      </label>
      <output id={id} className={`text-2xl ${isEmpty ? "text-muted-foreground" : ""}`}>
        {isEmpty ? <span aria-hidden="true">-</span> : value}
      </output>
    </>
  );
}
