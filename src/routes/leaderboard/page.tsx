import { createResource, For, Show } from "solid-js";

import { fetchLeaderboard } from "./api";
import { Skeleton } from "./skeleton";

export const Leaderboard = () => {
	const [data] = createResource(fetchLeaderboard);

	return (
		<div class="space-y-6 animate-in fade-in duration-500">
			<div class="rounded-lg border border-border bg-background shadow-sm overflow-hidden">
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="bg-muted/50 border-b border-border">
								<th class="px-4 py-3 text-left font-medium w-[80px]">Rank</th>
								<th class="px-4 py-3 text-left font-medium">Username</th>
								<th class="px-4 py-3 text-left font-medium w-[100px]">Level</th>
								<th class="px-4 py-3 text-left font-medium w-[100px]">XP</th>
								<th class="px-4 py-3 text-right font-medium w-[100px]">Gold</th>
							</tr>
						</thead>
						<tbody>
							<Show when={data.loading}>
								<For each={Array.from({ length: 10 })}>
									{() => <Skeleton />}
								</For>
							</Show>
							<For each={data()}>
								{(player) => (
									<tr class="border-b border-border/50 hover:bg-muted/20 transition-colors">
										<td class="px-4 py-3 font-medium">
											<div class="flex items-center">
												{player.rank <= 3 ? (
													<span
														class={`mr-2 text-lg ${
															player.rank === 1
																? "text-yellow-500"
																: player.rank === 2
																	? "text-gray-400"
																	: "text-amber-700"
														}`}
													>
														{player.rank === 1
															? "🥇"
															: player.rank === 2
																? "🥈"
																: "🥉"}
													</span>
												) : null}
												{player.rank}
											</div>
										</td>
										<td class="px-4 py-3 font-semibold">{player.username}</td>
										<td class="px-4 py-3">{player.level}</td>
										<td class="px-4 py-3">{player.xp}</td>
										<td class="px-4 py-3 text-right font-medium">
											{player.gold.toLocaleString()}
										</td>
									</tr>
								)}
							</For>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
