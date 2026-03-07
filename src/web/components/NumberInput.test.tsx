import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberInput from "./NumberInput.js";

describe("NumberInput", () => {
	it("displays the German word representation when a number is typed", async () => {
		render(<NumberInput />);

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "123");
		await userEvent.click(screen.getByRole("button", { name: /convert/i }));

		expect(
			screen.getByText("ein hundert drei und zwanzig"),
		).toBeInTheDocument();
	});
});
