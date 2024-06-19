import { User } from '../../../models/User.ts'

export type UserProfileData = Omit<User, 'login'>