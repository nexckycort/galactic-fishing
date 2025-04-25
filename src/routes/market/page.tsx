import { For, createEffect, createResource } from 'solid-js';

import { fetchMarket } from './api';

type ItemType =
  | 'fishing_rod'
  | 'poison_leveling'
  | 'poison_delay'
  | 'poison_recovery';

const itemStyles: Record<ItemType, string> = {
  fishing_rod: 'bg-[#ffbf00]/20 text-[#ffbf00]',
  poison_leveling: 'bg-[#ff4d4d]/20 text-[#ff4d4d]',
  poison_delay: 'bg-[#4d79ff]/20 text-[#4d79ff]',
  poison_recovery: 'bg-terminal-green/20 text-terminal-green',
};

export const Market = () => {
  const [data] = createResource(fetchMarket);

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
        <h2 class="text-xl text-terminal-cyan mb-2">// BLACK MARKET</h2>
        <p class="text-terminal-dim text-sm mb-4">
          Available items for purchase. Use at your own risk.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <For each={data()}>
          {(item) => (
            <div class="terminal-card border border-terminal-dim/30 p-4 hover:bg-terminal-dim/5">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-terminal-cyan font-bold">
                  {item.image} {item.name}
                </h3>
                <span
                  class={`text-xs px-2 py-1 rounded ${itemStyles[item.type as ItemType]}`}
                >
                  {item.type}
                </span>
              </div>

              <p class="text-terminal-dim mb-4 text-sm">{item.description}</p>

              <div class="flex justify-between items-center">
                <p class="text-terminal-green">
                  {item.cost.toLocaleString()}{' '}
                  <span class="text-terminal-dim">gold</span>
                </p>
                <button
                  type="button"
                  class="px-3 py-1 border border-terminal-green text-terminal-green hover:bg-terminal-green/20 focus:outline-none focus:ring-1 focus:ring-terminal-green"
                >
                  [ BUY ]
                </button>
              </div>
            </div>
          )}
        </For>
      </div>

      <div ref={endRef} />
    </div>
  );
};
