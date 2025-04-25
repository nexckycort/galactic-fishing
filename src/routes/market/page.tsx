import { Info } from "lucide-solid";
import { createResource, For, Match, Show, Switch } from "solid-js";

import { fetchMarket } from "./api";
import { Skeleton } from "./skeleton";

export const Market = () => {
	const [data] = createResource(fetchMarket);

	return (
		<div class="space-y-6 animate-in fade-in duration-500">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<Show when={data.loading}>
					<For each={Array.from({ length: 4 })}>{() => <Skeleton />}</For>
				</Show>
				<Switch>
					<Match when={data.error}>
						<span>Error: {data.error}</span>
					</Match>
					<Match when={data()}>
						<For each={data()}>
							{(item) => (
								<div class="overflow-hidden transition-all hover:shadow-md rounded-lg border border-border bg-background flex flex-col">
									{/* Card Header */}
									<div class="bg-gradient-to-r from-purple-500/10 to-teal-500/10 p-4 pb-2">
										<div class="flex justify-between items-start">
											<h3 class="text-lg font-bold">{item.name}</h3>
											<button
												type="button"
												class="h-6 w-6 rounded-md inline-flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground"
												title={item.description}
											>
												<Info class="h-4 w-4" />
												<span class="sr-only">Item Info</span>
											</button>
										</div>
										<p class="text-sm text-muted-foreground">
											{item.description}
										</p>
									</div>

									<div class="p-4 pt-4 flex-grow">
										<div class="flex justify-center mb-4">
											<span class="text-4xl">{item.image}</span>
										</div>
									</div>

									<div class="flex justify-between p-4 bg-muted/30 border-t border-border">
										<div class="font-semibold text-amber-600">
											{item.cost.toLocaleString()} gold
										</div>
										<button
											type="button"
											class="px-3 py-1 h-8 text-sm font-medium rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors"
										>
											Buy
										</button>
									</div>
								</div>
							)}
						</For>
					</Match>
				</Switch>
			</div>
		</div>
	);
};
