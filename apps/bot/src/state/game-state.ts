type GameState = {
  isFishing: boolean;
};

const state: GameState = {
  isFishing: false,
};

export const gameState = {
  get isFishing() {
    return state.isFishing;
  },
  set isFishing(value: boolean) {
    state.isFishing = value;
  },
};
