interface LeaderboardResponse {
	players: Player[];
}

interface Player {
	rank: number;
	username: string;
	level: number;
	xp: number;
	gold: number;
}

export const fetchLeaderboard = async () => {
	const response: LeaderboardResponse = await fetch(
		"https://api-game.bloque.app/game/leaderboard",
	).then((res) => res.json());
	return response.players;
};
