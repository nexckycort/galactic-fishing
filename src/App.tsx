import { createSignal } from "solid-js";

import { Navbar } from "./components/navbar";
import { Market } from "./routes/market/page";
import { Leaderboard } from "./routes/leaderboard";

const App = () => {
	const [pathname, setPathname] = createSignal(window.location.pathname);

	return (
		<div class="min-h-screen bg-gradient-to-br from-purple-900/20 to-teal-900/20">
			<Navbar pathname={pathname} setPathname={setPathname} />
			<main class="container mx-auto p-4 md:p-6 pt-28 md:pt-24">
				{pathname() === "/" ? <Leaderboard /> : <Market />}
			</main>
		</div>
	);
};

export default App;
