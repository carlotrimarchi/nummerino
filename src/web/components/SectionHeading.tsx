type SectionHeadingProps = {
  children: React.ReactNode;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}
