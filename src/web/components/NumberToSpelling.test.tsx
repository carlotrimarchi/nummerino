import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberToSpelling from "./NumberToSpelling";

describe("NumberToSpelling", () => {
	it("typing a number shows it in the output", async () => {
		const user = userEvent.setup();
		render(<NumberToSpelling />);

		await user.type(screen.getByLabelText("Enter a number"), "42");

		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("shows the German spelling after typing a number", async () => {
		const user = userEvent.setup();
		render(<NumberToSpelling />);

		await user.type(screen.getByLabelText("Enter a number"), "42");

		expect(screen.getByText("zweiundvierzig")).toBeInTheDocument();
	});
});
