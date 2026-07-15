import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RangeSelector } from "@/web/components/numberSpellingQuiz/RangeSelector";

describe("RangeSelector", () => {
  it("defaults to a range of 0 to 100", () => {
    const onChange = vi.fn();
    render(<RangeSelector onChange={onChange} />);

    expect(screen.getByRole("button", { name: "0" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("button", { name: "100" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("button", { name: "Max" })).toHaveAttribute(
      "aria-current",
      "false",
    );
  });

  it("moves the nearer thumb and reports the new range when a tick is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RangeSelector onChange={onChange} />);

    // starting at [0, 100], "1.000" (index 3) is nearer to the to-thumb (index 2)
    // than the from-thumb (index 0), so to moves and from stays at 0
    await user.click(screen.getByRole("button", { name: "1.000" }));

    expect(onChange).toHaveBeenLastCalledWith({
      from: 0,
      to: 1_000,
    });
  });

  it("moves the from-thumb instead when the clicked tick is closer to it", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RangeSelector onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "1.000" }));
    onChange.mockClear();

    await user.click(screen.getByRole("button", { name: "20" }));

    expect(onChange).toHaveBeenLastCalledWith({
      from: 20,
      to: 1_000,
    });
  });
});
