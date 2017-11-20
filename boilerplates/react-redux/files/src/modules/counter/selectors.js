import { createSelector } from 'reselect';

const selectRoot = (state) => state.counter;
export const selectValue = createSelector(selectRoot, (value) => value);
