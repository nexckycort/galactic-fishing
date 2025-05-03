const state = {
  isFishing: false,
  stop: false,
  cooldown: false,
};

export const gameState = {
  get isFishing() {
    return state.isFishing;
  },
  set isFishing(value: boolean) {
    state.isFishing = value;
  },
  get stop() {
    return state.stop;
  },
  set stop(value: boolean) {
    state.stop = value;
  },
  get cooldown() {
    return state.cooldown;
  },
  set cooldown(value: boolean) {
    state.cooldown = value;
  },
};
