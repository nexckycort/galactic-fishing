import { API_URL } from '../../config/environment';

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
    `${API_URL}/game/leaderboard`,
  ).then((res) => res.json());
  return response.players;
};
