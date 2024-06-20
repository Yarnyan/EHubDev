import styles from './card.module.scss'
import { Experience } from '../../../../models/Experience.ts'
import { experienceConverter } from '../../../../utils/helpers/experience-converter.ts'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteVacancyMutation } from '../../../../api/vacancy-api.ts';
import { useDeletePortfolioByIdMutation } from '../../api/portfolio-api.ts';
import { useGetCurrentUserDataQuery } from '../../../../api/user-api.ts';
interface CardProps {
  id: number
  name: string
  description: string
  stack?: string
  repositoryLink?: string
  Pay?: string
  experience?: Experience
  enableEdit: boolean
  userType: string
}

export const Card = ({ name, Pay, description, experience, repositoryLink, stack, enableEdit, id, userType }: CardProps) => {
  const token = localStorage.getItem('token');
  const [deleteVacancy, { }] = useDeleteVacancyMutation(); 
  const [deletePortfolio, { }] = useDeletePortfolioByIdMutation();
  const { data, isLoading, isError } = useGetCurrentUserDataQuery(token);
  console.log(data)
  const handleDelete = async (token, id) => {
    try {
      await deleteVacancy({ token, params: { vacancyId: id } });
    } catch (error) {
      console.error(`Error deleting vacancy`);
    }
  };

  const handleDeletePortfolio = async (token, id) => {
    console.log(token)
    try {
      await deletePortfolio({ token, params: { portfolioId: id } });
    } catch (error) {
      console.error(`Error deleting portfolio`);
    }
  };
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p className={styles.description}>{description}</p>
      {stack && <div className={styles.item}>Стек: <p>{stack}</p></div>}
      {repositoryLink && <div className={styles.item}>Ссылка на репозиторий:
        <a href={repositoryLink}>{repositoryLink}</a>
      </div>}
      {experience && <div className={styles.item}>Требуемый опыт:
        <p>{experienceConverter(Experience[experience])}</p>
      </div>
      }
      {Pay && <div className={styles.item}>Зарплата:
        <p>{Pay}р.</p>
      </div>
      }
      <div className={styles.trashContainer}>
        {enableEdit && <button className={styles.delete} onClick={userType === 'Company' ? () => handleDelete(token, id) : () => handleDeletePortfolio(token, id)}>
          <DeleteIcon />
        </button>}
      </div>
    </div>
  )
}