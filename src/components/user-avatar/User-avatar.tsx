import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom'

interface Avatar {
  avatar: string | undefined;
}
const UserAvatar: React.FC<Avatar> = ({avatar}) => {

  return (
    <Avatar
      sx={{cursor: 'pointer'}}
      alt="Remy Sharp"
      src={avatar} />
  )
}

export default UserAvatar