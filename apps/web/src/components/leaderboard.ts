import { API_URL } from '../config/environment';
import { doc } from '../utils/utils';

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

const fetchLeaderboard = async () => {
  const response: LeaderboardResponse = await fetch(
    `${API_URL}/leaderboard`,
  ).then((res) => res.json());
  return response.players;
};

export const fetchAndLeaderboard = async () => {
  const data = await fetchLeaderboard();

  const leaderboardRows = data.reduce((acc, current) => {
    const temp = `<tr class="hover:bg-terminal-dim/10">
                    <td class="py-1 px-2">${current.rank}</td>
                    <td class="py-1 px-2">${current.username}</td>
                    <td class="py-1 px-2 text-right">${current.level}</td>
                    <td class="py-1 px-2 text-right">${current.xp}</td>
                    <td class="py-1 px-2 text-right">${current.gold}</td>
                </tr>`;
    return acc + temp;
  }, '');

  const leaderboard = doc.createElement('div');
  leaderboard.innerHTML = `<div class="terminal-section">
      <div class="mb-4">
        <h2 class="text-xl text-terminal-cyan mb-2">// SYSTEM LEADERBOARD</h2>
        <p class="text-terminal-dim text-sm mb-4">
          Displaying top hackers by rank. Updated: ${new Date().toLocaleTimeString()}
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
          <tbody>${leaderboardRows}</tbody>
        </table>
      </div>
    </div>`;

  return leaderboard;
};
