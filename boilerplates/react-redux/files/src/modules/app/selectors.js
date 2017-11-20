import { createSelector } from 'reselect';

const selectRoot = (state) => state.app;
export const selectIsInitialized = createSelector(selectRoot, ({ isInitialized }) => isInitialized);
