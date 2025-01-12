import FireIcon from '../(assets)/icons/FireIcon.jsx'
import CreateIcon from '../(assets)/icons/CreateIcon.jsx'
import DashboardIcon from '../(assets)/icons/DashBoardIcon.jsx'
import DeleteIcon from '../(assets)/icons/DeleteIcon.jsx'
import FindIcon from '../(assets)/icons/FindIcons.jsx'
import ProjectIcon from '../(assets)/icons/ProjectIcon.jsx'
import ShutdownIcon from '../(assets)/icons/ShutdownIcon.jsx'
import UserIcon from '../(assets)/icons/UserIcon.jsx'
import BackIcon from '../(assets)/icons/BackIcon.jsx'
import TaskIcon from '../(assets)/icons/TaskIcon.jsx'
const category = [
  { id: 1, name: 'UI/UX' },
  { id: 2, name: 'Bug/Defect' },
  { id: 3, name: 'Feature Request' },
  { id: 4, name: 'Enhancement' },
  { id: 5, name: 'Support' },
  { id: 6, name: 'Security' },
  { id: 7, name: 'Documentation' },
  { id: 8, name: 'Performance' },
  { id: 9, name: 'Database' },
  { id: 10, name: 'Technical Debt' },
  { id: 11, name: 'Other' },
]

const navlinks = [
  { id: 1, name: 'Dashboard', url: '/', icon: 'DashboardIcon' },
  { id: 3, name: 'Ticket', url: '/ticket', icon: 'TaskIcon' },
  { id: 2, name: 'Projects', url: '/project', icon: 'ProjectIcon' },
  { id: 4, name: 'Users', url: '/users', icon: 'UserIcon' },
]

const icons = {
  FireIcon,
  CreateIcon,
  DashboardIcon,
  DeleteIcon,
  FindIcon,
  ProjectIcon,
  ShutdownIcon,
  UserIcon,
  BackIcon,
  TaskIcon,
}

export { category, icons, navlinks }
