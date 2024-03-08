import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {

    id: 'Overview',
    title: 'Overview',
    type: 'item',
    classes: 'nav-item',
    url: '/default',
    icon: 'ti ti-dashboard',
    breadcrumbs: false
  }
  ,
  {
    id: 'Customers',
    title: 'Customers',
    type: 'item',
    icon: 'fa fa-users',
    url: '/member',
    classes: 'nav-item',
    target: false,
    breadcrumbs: false
  },
  {
    id: 'Actvity',
    title: 'Actvity',
    type: 'item',
    icon: 'fa fa-clock-o',
    classes: 'nav-item',
    url: '/activity',
    target: false,
    breadcrumbs: false
  },
  {

    id: 'Campaign',
    title: 'Campaign',
    type: 'collapse',
    classes: 'nav-item',
    icon: 'fa fa-flag',
    children: [
      {
        id: 'Autopilot',
        title: 'Auto Campaigns',
        type: 'item',
        classes: 'nav-item',
        url: '/autopilotsettings',
        icon: 'fa fa-plane',

      },
      {
        id: 'Rewards',
        title: 'Rewards',
        type: 'item',
        classes: 'nav-item',
        url: '/rewardsettings',
        icon: 'fa fa-certificate',
      },
      {
        id: 'Promotion',
        title: 'Promotion',
        type: 'item',
        classes: 'nav-item',
        url: '/promotion',
        icon: 'fa fa-tasks',

      },
      {
        id: 'Announcement',
        title: 'Announcement',
        type: 'item',
        classes: 'nav-item',
        url: '/announcement',
        icon: 'fa fa-volume-up',
      }
    ]
  },
  {

    id: 'Analytics',
    title: 'Analytics',
    type: 'collapse',
    classes: 'nav-item',
    icon: 'fa fa-flag',
    children: [
      {
        id: 'Auto Campaigns',
        title: 'Auto Campaigns',
        type: 'item',
        url: '/autopilot',
        classes: 'nav-item',
        icon: 'fa fa-plane'
      },
      {
        id: 'CampaignAnalysis',
        title: 'Campaign Analysis',
        type: 'item',
        classes: 'nav-item',
        url: '/campaignreach',
        icon: 'fa fa-signal',

      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'collapse',
    classes: 'nav-item',
    icon: 'fa fa-cogs',
    children: [
      {
        id: 'Profile',
        title: 'Profile',
        type: 'item',
        url: '/profile',
        classes: 'nav-item',
        icon: 'fa fa-user'
      },
      {
        id: 'badgeDefinition',
        title: 'Badge Definition',
        type: 'item',
        classes: 'nav-item',
        url: '/badgeDefinition',
        icon: 'fa fa-id-badge',
      },
      {
        id: 'Tag Definition',
        title: 'Tag Definition',
        type: 'item',
        classes: 'nav-item',
        url: '/tagDefinition',
        icon: 'fa fa-tags',
      }
    ]
  }
  ,
  {

    id: 'Text-To-Join',
    title: 'Text-To-Join',
    type: 'item',
    url: '/sample-page',
    classes: 'nav-item',
    icon: 'fa fa-mobile'
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
