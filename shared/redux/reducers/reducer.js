import * as ActionTypes from '../constants/actionTypes';
import * as GAME from '../constants/gameConstants';
import sellBeer from './helpers/sellBeer';

const reducer = (state = {}, action) => {
  const { facility } = state;

  switch (action.type) {

    case ActionTypes.INCREMENT_TICK:
      let update = { tick: state.tick + 1 };

      if (update.tick % GAME.SALE_INTERVAL === 0) {
        update = Object.assign(update, sellBeer(state));
      }

      return Object.assign({}, state, update);

    case ActionTypes.STORE_BEER:
      if (facility.storage.length >= GAME.STORAGE_LIMIT) {
        return state;
      }
      return Object.assign({}, state, {
        facility: {
          storage: [...facility.storage, action.beer],
        },
      });

    case ActionTypes.SELL_BEER:
      return Object.assign({}, state, sellBeer(state));

    default:
      return state;
  }
};

export default reducer;
