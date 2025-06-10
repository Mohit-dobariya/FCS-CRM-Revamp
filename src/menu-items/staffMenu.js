// assets
import { DashboardOutlined, QuestionCircleOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  QuestionCircleOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const staffMenu = {
  id: 'group-pages-staff',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/staff/dashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'faq',
      title: 'Faq',
      type: 'item',
      url: '/staff/faq',
      icon: icons.QuestionCircleOutlined
    }
  ]
};

export default staffMenu;
