import { EventEmitter } from 'node:events';

import type { Inventory } from '../types/inventory.ts';
import type { Player } from '../types/player.ts';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Handler<T = any> = (payload: T) => void;

export type Events = {
  'connection:open': string;
  'connection:closed': string;
  'connection:error': string;
  'fishing:ready': string;
  'cooldown:started': number;
  '/fish': string;
  '/inventory': Inventory;
  '/leader-board': Player[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  '/market': any;
  'command:manual': string;
};

class PubSub extends EventEmitter {
  private static readonly _instance: PubSub = new PubSub();
  private readonly topics = new Map<string, Handler>();

  private constructor() {
    super();
  }

  static get instance(): PubSub {
    return PubSub._instance;
  }

  publish<K extends keyof Events>(topic: K, payload: Events[K]): void {
    this.emit(topic, payload);
  }

  subscribe<K extends keyof Events>(
    topic: K,
    handler: Handler<Events[K]>,
  ): void {
    if (this.topics.has(topic)) {
      this.unsubscribe(topic);
    }
    this.on(topic, handler);
    this.topics.set(topic, handler);
  }

  unsubscribe(topic: string): void {
    const handler = this.topics.get(topic);
    if (handler) {
      this.removeListener(topic, handler);
      this.topics.delete(topic);
    }
  }
}

export const pubSub = PubSub.instance;
