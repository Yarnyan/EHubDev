import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom'
import { PROFILE_ROUTE } from '../../consts/routes.ts'

const UserAvatar = () => {
  const navigate = useNavigate()

  return (
    <Avatar
      onClick={() => navigate(PROFILE_ROUTE)}
      sx={{cursor: 'pointer'}}
      alt="Remy Sharp"
      src="/static/images/avatar/1.jpg" />
  )
}

export default UserAvatar