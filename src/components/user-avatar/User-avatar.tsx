import Avatar from '@mui/material/Avatar'
import { useNavigate } from 'react-router-dom'

const UserAvatar = () => {
  const navigate = useNavigate()

  return (
    <Avatar
      onClick={() => navigate('/profile')}
      sx={{ cursor: 'pointer' }}
      alt='Remy Sharp'
      src='/static/images/avatar/1.jpg' />
  )
}

export default UserAvatar