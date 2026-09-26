import type { PerformanceKpiType } from '@/api/performance/types';
import activitiesIcon from '@/assets/icons/kpis/activities.svg';
import companiesEngagedIcon from '@/assets/icons/kpis/companies-engaged.svg';
import contactsEngagedIcon from '@/assets/icons/kpis/contacts-engaged.svg';
import dealsIcon from '@/assets/icons/kpis/deals.svg';
import meetingsIcon from '@/assets/icons/kpis/meetings.svg';

export type KpiPresentation = {
  accentBackgroundClassName: string;
  accentTextClassName: string;
  skeletonAccentClassName: string;
  trackClassName: string;
  icon?: string;
};

export const performanceKpiTypes = [
  'contacts-engaged',
  'companies-engaged',
  'activities',
  'meetings',
  'deals',
  'pipeline',
] as const satisfies readonly PerformanceKpiType[];

export const kpiPresentation: Record<PerformanceKpiType, KpiPresentation> = {
  'contacts-engaged': {
    accentBackgroundClassName: 'bg-info',
    accentTextClassName: 'text-info',
    skeletonAccentClassName: 'bg-info/20',
    trackClassName: 'bg-info-track',
    icon: contactsEngagedIcon,
  },
  'companies-engaged': {
    accentBackgroundClassName: 'bg-primary-accent',
    accentTextClassName: 'text-primary-accent',
    skeletonAccentClassName: 'bg-primary-accent/20',
    trackClassName: 'bg-info-track',
    icon: companiesEngagedIcon,
  },
  activities: {
    accentBackgroundClassName: 'bg-purple-accent',
    accentTextClassName: 'text-purple-accent',
    skeletonAccentClassName: 'bg-purple-accent/20',
    trackClassName: 'bg-purple-soft',
    icon: activitiesIcon,
  },
  meetings: {
    accentBackgroundClassName: 'bg-gold-accent',
    accentTextClassName: 'text-gold-accent',
    skeletonAccentClassName: 'bg-gold-accent/20',
    trackClassName: 'bg-warning-soft',
    icon: meetingsIcon,
  },
  deals: {
    accentBackgroundClassName: 'bg-pink-accent',
    accentTextClassName: 'text-pink-accent',
    skeletonAccentClassName: 'bg-pink-accent/20',
    trackClassName: 'bg-pink-soft',
    icon: dealsIcon,
  },
  pipeline: {
    accentBackgroundClassName: 'bg-success',
    accentTextClassName: 'text-success',
    skeletonAccentClassName: 'bg-success/20',
    trackClassName: 'bg-brand-soft',
  },
};
