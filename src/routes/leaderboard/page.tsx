import { For, createEffect, createResource } from 'solid-js';

import { fetchLeaderboard } from './api';

export const Leaderboard = () => {
  const [data] = createResource(fetchLeaderboard);

  let endRef: HTMLDivElement | undefined;
  createEffect(() => {
    data();
    if (endRef) {
      endRef.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div class="terminal-section">
      <div class="mb-4">
        {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
        <h2 class="text-xl text-terminal-cyan mb-2">// SYSTEM LEADERBOARD</h2>
        <p class="text-terminal-dim text-sm mb-4">
          Displaying top hackers by rank. Updated:{' '}
          {new Date().toLocaleTimeString()}
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-xs sm:text-sm md:text-base text-terminal-green">
          <thead>
            <tr class="border-b border-terminal-dim">
              <th class="py-1 px-2 text-left">RANK</th>
              <th class="py-1 px-2 text-left">USERNAME</th>
              <th class="py-1 px-2 text-right">LEVEL</th>
              <th class="py-1 px-2 text-right">XP</th>
              <th class="py-1 px-2 text-right">GOLD</th>
            </tr>
          </thead>
          <tbody>
            <For each={data()}>
              {(user) => (
                <tr class="hover:bg-terminal-dim/10">
                  <td class="py-1 px-2">{user.rank}</td>
                  <td class="py-1 px-2">{user.username}</td>
                  <td class="py-1 px-2 text-right">{user.level}</td>
                  <td class="py-1 px-2 text-right">{user.xp}</td>
                  <td class="py-1 px-2 text-right">{user.gold}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>

      <div class="mt-6 text-terminal-dim">
        <p class="text-sm">
          <span class="text-terminal-cyan">&gt;</span> Type{' '}
          <span class="text-terminal-green">clear</span> to return to terminal
        </p>
      </div>

      <div ref={endRef} />
    </div>
  );
};
