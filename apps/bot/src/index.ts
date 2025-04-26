import { createConnection, type Socket } from 'node:net';

import {
  extractCooldownSeconds,
  handleInventory,
  parseTopPlayers,
  send,
} from './utils.ts';
import { logger } from './logger.ts';

const HOST = 'game.bloque.app';
const PORT = 2812;
const CODE = process.env.CODE ?? '';
const MAX_FISH_PER_CYCLE = 3;
const PROMPT_REGEX = /@shadow-net:~\$\s*$/;

let canFish = false;
let fishing = false;
let expectingInventory = false;

function startFishingLoop(client: Socket) {
  if (!canFish || fishing) return;

  fishing = true;
  let fishes = 0;

  const loop = setInterval(() => {
    if (!canFish) {
      clearInterval(loop);
      fishing = false;
      return;
    }

    if (fishes < MAX_FISH_PER_CYCLE) {
      logger.success(`🎣 Pescando (${fishes + 1}/${MAX_FISH_PER_CYCLE})...`);
      send(client, '/fish');
      fishes++;
    } else {
      clearInterval(loop);
      fishing = false;
      logger.success('🛑 Límite alcanzado, esperando cooldown...');
    }
  }, 1500);
}

function connectToGame() {
  const client = createConnection({ host: HOST, port: PORT });

  client.on('data', (data) => {
    const message = data.toString();
    console.log(message);

    if (message.includes('Enter your Operative ID (invite code):')) {
      logger.success('🌌 Conectado al servidor');
      send(client, CODE);
      canFish = true;
      return;
    }

    if (expectingInventory && message.includes('Inventory for ')) {
      expectingInventory = false;
      handleInventory(client, message);
      return;
    }

    const cooldownSeconds = extractCooldownSeconds(message);
    if (cooldownSeconds !== null) {
      canFish = false;
      logger.success(`⏳ Cooldown de ${cooldownSeconds} segundos...`);

      // aprovechamos el Cooldown para revisar el inventario y vender o comer para ganar xp o oro
      expectingInventory = true;
      send(client, '/inventory');

      setTimeout(() => {
        canFish = true;
        logger.success('✅ Cooldown terminado. Reanudando pesca...');
        startFishingLoop(client);
      }, cooldownSeconds * 1000);

      return;
    }

    if (PROMPT_REGEX.test(message) && canFish && !fishing) {
      startFishingLoop(client);
    }

    if (message.includes('TOP 10 PLAYERS')) {
      const players = parseTopPlayers(message);

      const firstWorthyTarget = players.find((player) => player.level > 1);
      if (!firstWorthyTarget) return;

      const target = firstWorthyTarget.name;
      setTimeout(() => {
        logger.success(`💀 Usando Poison of Leveling contra: ${target}`);
        send(client, `/poison 1 ${target}`);
      }, 1000);
    }

    if (message.includes('MARKET ITEMS')) {
      setTimeout(() => {
        logger.success('🛒 Comprando Poison of Leveling en el mercado...');
        send(client, '/buy 2');
      }, 1000);
    }
  });

  client.on('end', () => {
    logger.success('📴 Conexión cerrada por el servidor');
  });

  client.on('error', (err) => {
    console.error('❌ Error en la conexión:', err.message);
  });
}

connectToGame();
