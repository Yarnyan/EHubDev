import Avatar from '@mui/material/Avatar'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
interface avatar {
  avatar?: string
}
const UserAvatar: React.FC<avatar> = ({avatar}) => {
  const userData = useAppSelector(state => state.userReducer.user as User)
  const navigate = useNavigate()
  return (
    <Avatar
      onClick={() => navigate(`/profile/:id`)}
      sx={{ cursor: 'pointer' }}
      alt='Remy Sharp'
      src={avatar || import.meta.env.VITE_API_URL + '/' + userData.avatar}
      style={{width: '40px', height: '40px'}}
      />
  )
}

export default UserAvatar

//40px 40px