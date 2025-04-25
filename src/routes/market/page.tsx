import { For, createResource, createSignal } from 'solid-js';

import { type MarketItem, fetchMarket } from './api';

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
  const [notification, setNotification] = createSignal<string | null>(null);

  const handleBuy = (item: MarketItem) => {
    setNotification(`Attempting to purchase: ${item.name}...`);

    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        setNotification(
          `Transaction complete. ${item.name} added to inventory.`,
        );
      } else {
        setNotification(
          `Transaction failed. Insufficient funds for ${item.name}.`,
        );
      }

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  return (
    <div class="terminal-section">
      <div class="mb-4">
        {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
        <h2 class="text-xl text-terminal-cyan mb-2">// BLACK MARKET</h2>
        <p class="text-terminal-dim text-sm mb-4">
          Available items for purchase. Use at your own risk.
        </p>
      </div>

      {notification() && (
        <div class="mb-4 p-2 bg-terminal-dim/10 border-l-2 border-terminal-cyan">
          <p class="text-terminal-cyan">
            <span class="text-terminal-green" /> {notification()}
          </p>
        </div>
      )}

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
                  onClick={() => handleBuy(item)}
                  class="px-3 py-1 border border-terminal-green text-terminal-green hover:bg-terminal-green/20 focus:outline-none focus:ring-1 focus:ring-terminal-green"
                >
                  [ BUY ]
                </button>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
