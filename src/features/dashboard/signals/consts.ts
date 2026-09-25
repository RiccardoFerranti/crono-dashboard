import type { SignalCategory } from '@/api/signals/types';

type SignalCategoryPresentation = {
  label: string;
  textClassName: string;
};

export const signalCategoryPresentation: Record<SignalCategory, SignalCategoryPresentation> = {
  'role-change': {
    label: 'Role change',
    textClassName: 'text-purple-accent',
  },
  'company-change': {
    label: 'Company change',
    textClassName: 'text-info',
  },
  'website-view': {
    label: 'Website view',
    textClassName: 'text-pink-accent',
  },
};
