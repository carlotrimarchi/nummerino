import "./App.css";
import PageHeader from "./components/PageHeader.js";
import NumberToSpelling from "./components/NumberToSpelling.js";
import PageFooter from "./components/PageFooter.js";

export default function App() {

	return (
		<>
			<div className="min-h-screen flex items-center justify-center p-8">
				<div className="w-full max-w-2xl flex flex-col">
					<PageHeader />

					<main>
						<NumberToSpelling />
					</main>
					<PageFooter />
				</div>
			</div>
		</>
	);
}
