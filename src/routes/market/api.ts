interface MarketResponse {
	items: MarketItem[];
}

export interface MarketItem {
	id: string;
	name: string;
	type: string;
	description: string;
	cost: number;
}

const images: {
	[key: string]: string;
} = {
	fishing_rod: "🎣",
	poison_leveling: "⚗️",
	poison_delay: "🧪",
	poison_recovery: "🧫",
};

export const fetchMarket = async () => {
	const response: MarketResponse = await fetch(
		"https://api-game.bloque.app/game/market",
	).then((res) => res.json());
	const marketData = response.items.map((m) => ({
		...m,
		image: images[m.type] ?? "❗",
	}));
	return marketData;
};
