import Avatar from '@mui/material/Avatar'
import { useNavigate } from 'react-router-dom'

interface avatar {
  avatar?: string
}
const UserAvatar: React.FC<avatar> = ({avatar}) => {
  const navigate = useNavigate()

  return (
    <Avatar
      onClick={() => navigate('/profile')}
      sx={{ cursor: 'pointer' }}
      alt='Remy Sharp'
      src={avatar ? avatar : '/static/images/avatar/1.jpg'} />
  )
}

export default UserAvatar