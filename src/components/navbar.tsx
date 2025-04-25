import { ShoppingBag, Trophy, GamepadIcon } from "lucide-solid";
import type { Accessor, Setter } from "solid-js";

type NavbarProps = {
	pathname: Accessor<string>;
	setPathname: Setter<string>;
};

export const Navbar = ({ pathname, setPathname }: NavbarProps) => {
	return (
		<nav class="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
			<div class="container mx-auto px-4">
				<div class="flex items-center justify-between h-16">
					<div class="flex-shrink-0">
						<h1 class="text-2xl font-bold text-purple-500">GF</h1>
					</div>

					<div class="flex space-x-1">
						<button
							type="button"
							onClick={() => setPathname("/")}
							class={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
								pathname() === "/"
									? "bg-purple-500/20 text-purple-400 font-medium"
									: "hover:bg-muted/50"
							}`}
						>
							<Trophy
								class={`h-5 w-5 ${pathname() === "/" ? "text-yellow-500" : ""}`}
							/>
							<span>Leaderboard</span>
						</button>

						<button
							type="button"
							onClick={() => setPathname("/market")}
							class={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
								pathname() === "/market"
									? "bg-teal-500/20 text-teal-400 font-medium"
									: "hover:bg-muted/50"
							}`}
						>
							<ShoppingBag
								class={`h-5 w-5 ${pathname() === "/market" ? "text-teal-500" : ""}`}
							/>
							<span>Market</span>
						</button>
					</div>

					<div class="hidden md:block">
						<button
							type="button"
							class="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
						>
							<GamepadIcon class="h-4 w-4" />
							<span>Play Now</span>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
