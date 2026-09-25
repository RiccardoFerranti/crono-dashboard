import type { PerformanceKpiType } from '@/api/performance/types';
import activitiesIcon from '@/assets/icons/kpis/activities.svg';
import companiesEngagedIcon from '@/assets/icons/kpis/companies-engaged.svg';
import contactsEngagedIcon from '@/assets/icons/kpis/contacts-engaged.svg';
import dealsIcon from '@/assets/icons/kpis/deals.svg';
import meetingsIcon from '@/assets/icons/kpis/meetings.svg';

export type KpiPresentation = {
  accentBackgroundClassName: string;
  accentTextClassName: string;
  trackClassName: string;
  icon?: string;
};

export const kpiPresentation: Record<PerformanceKpiType, KpiPresentation> = {
  'contacts-engaged': {
    accentBackgroundClassName: 'bg-info',
    accentTextClassName: 'text-info',
    trackClassName: 'bg-info-track',
    icon: contactsEngagedIcon,
  },
  'companies-engaged': {
    accentBackgroundClassName: 'bg-primary-accent',
    accentTextClassName: 'text-primary-accent',
    trackClassName: 'bg-info-track',
    icon: companiesEngagedIcon,
  },
  activities: {
    accentBackgroundClassName: 'bg-purple-accent',
    accentTextClassName: 'text-purple-accent',
    trackClassName: 'bg-purple-soft',
    icon: activitiesIcon,
  },
  meetings: {
    accentBackgroundClassName: 'bg-gold-accent',
    accentTextClassName: 'text-gold-accent',
    trackClassName: 'bg-warning-soft',
    icon: meetingsIcon,
  },
  deals: {
    accentBackgroundClassName: 'bg-pink-accent',
    accentTextClassName: 'text-pink-accent',
    trackClassName: 'bg-pink-soft',
    icon: dealsIcon,
  },
  pipeline: {
    accentBackgroundClassName: 'bg-success',
    accentTextClassName: 'text-success',
    trackClassName: 'bg-brand-soft',
  },
};
