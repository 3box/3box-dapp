import { svg } from 'assets'

export default eid => {
  return [
    {
      title: 'Profile',
      to: `/dashboard/people/${eid}`,
    },
    {
      title: 'Settings',
      to: `/dashboard/people/${eid}/settings`,
    },
    {
      title: 'Tokens',
      to: `/dashboard/people/${eid}/tokens`,
    },
]}