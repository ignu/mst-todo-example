import { types } from 'mobx-state-tree';
import { parseISO } from 'date-fns';

// const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DateTime = types.custom({
  name: 'DateTime',
  fromSnapshot: (date: string | null) => {
    if (!date) return null;
    return parseISO(date);
  },
  toSnapshot: (date: Date | null) => {
    if (!date) return null;
    return date.toISOString();
  },
  isTargetType: (maybeDate) => typeof maybeDate !== 'string',
  getValidationMessage: (snapshot) => {
    if (!snapshot) return '';
    try {
      parseISO(snapshot);
    } catch {
      return `"${snapshot}" is not in valid date format`;
    }
    return '';
  },
});
