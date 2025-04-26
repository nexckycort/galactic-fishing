import { API_URL } from '../config/environment';
import { doc } from '../utils/utils';

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

interface MarketResponse {
  items: MarketItem[];
}

interface MarketItem {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
}

const images: {
  [key: string]: string;
} = {
  fishing_rod: '🎣',
  poison_leveling: '⚗️',
  poison_delay: '🧪',
  poison_recovery: '🧫',
};

const fetchMarket = async () => {
  const response: MarketResponse = await fetch(`${API_URL}/market`).then(
    (res) => res.json(),
  );
  const marketData = response.items.map((m) => ({
    ...m,
    image: images[m.type] ?? '❗',
  }));
  return marketData;
};

export const fetchAndRenderMarket = async () => {
  const data = await fetchMarket();

  const marketCards = data.reduce((acc, current) => {
    const temp = `<div class="terminal-card border border-terminal-dim/30 p-4 hover:bg-terminal-dim/5">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-terminal-cyan font-bold">
                  ${current.image} ${current.name}
                </h3>
                <span
                    class="text-xs px-2 py-1 rounded ${itemStyles[current.type as ItemType]}"
                >
                  ${current.type}
                </span>
              </div>

              <p class="text-terminal-dim mb-4 text-sm">${current.description}</p>

              <div class="flex justify-between items-center">
                <p class="text-terminal-green">
                  ${current.cost.toLocaleString()}${' '}
                  <span class="text-terminal-dim">gold</span>
                </p>
                <button
                  type="button"
                  class="px-3 py-1 border border-terminal-green text-terminal-green hover:bg-terminal-green/20 focus:outline-none focus:ring-1 focus:ring-terminal-green"
                >
                  [ BUY ]
                </button>
              </div>
            </div>`;
    return acc + temp;
  }, '');

  const market = doc.createElement('div');
  market.innerHTML = `<div class="terminal-section">
      <div class="mb-4">
        <h2 class="text-xl text-terminal-cyan mb-2">// BLACK MARKET</h2>
        <p class="text-terminal-dim text-sm mb-4">
          Available items for purchase. Use at your own risk.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${marketCards}</div>
      
    </div>`;

  return market;
};
