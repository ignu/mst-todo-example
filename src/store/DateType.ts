import { types } from 'mobx-state-tree';
import { parseISO } from 'date-fns';

// const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DateTime = types.custom({
  name: 'DateTime',
  fromSnapshot: parseISO,
  toSnapshot: (date: Date) => date.toISOString(),
  isTargetType: (maybeDate) => typeof maybeDate !== 'string',
  getValidationMessage: (snapshot) => {
    try {
      parseISO(snapshot);
    } catch {
      return `"${snapshot}" is not in valid date format`;
    }
    return '';
  },
});
