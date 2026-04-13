import Logo from "./Logo";

function PageHeader() {
	return (
		<header>
			<div className="flex flex-col gap-4 mb-8">
				<Logo />
				<h1 className="text-2xl">Your German numbers multi-purpose tool</h1>
			</div>
			<div className="flex flex-col gap-2 mb-12">
				<p className="text-lg">
					Struggling with German numbers? Have no fear, nummerino is
					here. Your personal assistant, coach, trainer, companion,
					friend even, for all your number needs and nightmares*.
				</p>
				<p className="text-sm text-zinc-400">* exclusively in German</p>
			</div>
		</header>
	);
}

export default PageHeader;
