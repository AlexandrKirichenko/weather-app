import { reducer, actions } from './slice';
import * as selectors from './selectors';
import * as thunks from './thunks';

export const mainTownSlice = { reducer, actions, selectors, thunks };
