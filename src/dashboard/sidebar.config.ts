import dashboardIcon from '@/assets/icons/sidebar/dashboard.svg';
import findNewIcon from '@/assets/icons/sidebar/find-new.svg';
import listsIcon from '@/assets/icons/sidebar/lists.svg';
import templatesIcon from '@/assets/icons/sidebar/templates.svg';
import sequencesIcon from '@/assets/icons/sidebar/sequences.svg';
import tasksIcon from '@/assets/icons/sidebar/tasks.svg';
import inboxIcon from '@/assets/icons/sidebar/inbox.svg';
import dealsIcon from '@/assets/icons/sidebar/deals.svg';
import analyticsIcon from '@/assets/icons/sidebar/analytics.svg';

export type SidebarMenuItem = {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  expandable?: boolean;
};

export const sidebarItems: SidebarMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
  { id: 'find-new', label: 'Find New', icon: findNewIcon },
  { id: 'lists', label: 'Lists', icon: listsIcon },
  { id: 'templates', label: 'Templates', icon: templatesIcon },
  { id: 'sequences', label: 'Sequences', icon: sequencesIcon },
  { id: 'tasks', label: 'Tasks', icon: tasksIcon },
  { id: 'inbox', label: 'Inbox', icon: inboxIcon, badge: 24 },
  { id: 'deals', label: 'Deals', icon: dealsIcon },
  { id: 'analytics', label: 'Analytics', icon: analyticsIcon, expandable: true },
];

export const activeSidebarItemId = 'dashboard';
