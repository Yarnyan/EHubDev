import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer'
import { Inputs } from '../Builder.tsx'

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 600 },
  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  heading: {
    margin: 'auto',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  textM: {
    fontSize: '10px',
    fontWeight: 'thin',
  },
  textL: {
    fontSize: '11px',
    fontWeight: 'thin',
  },
  subheading: {
    fontSize: '12px',
    fontWeight: 'thin',
    width: '100%',
    borderBottom: '1px solid black',
  },
  sectionHeading: {
    fontSize: '11px',
    fontWeight: 'bold',
  },
  contacts: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    margin: '2px auto',
  },
  section: {
    padding: '0 10px',
    marginBottom: '8px',
  },
  sectionTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: '4px',
  },
  dateBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  task: {
    margin: '4px 0 0 12px',
    textDecoration: 'underline',
    maxWidth: '100%',
    wordBreak: 'break-all',
  },
})

export const ResumeTemplate = (props: Inputs) => {

  return (
    <Document>
      <Page size='A4' style={{ ...styles.page, ...styles.textM }}>
        <View>
          <Text style={styles.heading}>{props.name}</Text>
          <View style={{ ...styles.contacts }}>
            <Text>{props.phone}</Text>
            <Text>{props.email}</Text>
            <Link src={props.github}>GitHub</Link>
            <Text>{props.location}</Text>
          </View>
          <Text style={styles.subheading}>Образование</Text>
          {props.education.map(item => {
            return <EducationBox university={item.university} universityLocation={item.universityLocation}
                                 universityStart={item.universityStart} universityEnd={item.universityEnd}
                                 specialization={item.specialization}
                                 key={item.specialization + item.universityStart} />
          })}
          <Text style={styles.subheading}>Опыт работы</Text>
          {props.experience.map(item => {
            return <ExperienceBox organization={item.organization} experienceStart={item.experienceStart}
                                  experienceEnd={item.experienceEnd} position={item.position} task1={item.task1}
                                  task2={item.task2}
                                  task3={item.task3} task4={item.task4} key={item.organization + item.task1} />
          })}
          <Text style={styles.subheading}>Мои проекты</Text>
          {props.projects.map(item => {
            return <ProjectsBox projectName={item.projectName} stack={item.stack} projectStart={item.projectStart}
                                projectEnd={item.projectEnd} task1={item.task1} task2={item.task2} task3={item.task3}
                                task4={item.task4} key={item.projectName + item.task1} />
          })}
          <Text style={styles.subheading}>Технические навыки</Text>
          <View style={styles.dateBox}>
            <Text style={styles.sectionHeading}>Языки: </Text>
            <Text style={styles.textL}>{props.languages}</Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.sectionHeading}>Фреймворки: </Text>
            <Text style={styles.textL}>{props.frameworks}</Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.sectionHeading}>Библиотеки: </Text>
            <Text style={styles.textL}>{props.libraries}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

interface EducationBoxProps {
  university: string
  universityLocation: string
  universityStart: string
  universityEnd: string
  specialization: string
}

const EducationBox = (
  {
    university,
    universityStart,
    universityLocation,
    universityEnd,
    specialization,
  }: EducationBoxProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTop}>
        <Text style={styles.sectionHeading}>{university}</Text>
        <Text style={styles.textL}>{universityLocation}</Text>
      </View>
      <View style={{ ...styles.sectionTop, marginBottom: '0' }}>
        <Text>{specialization}</Text>
        <View style={styles.dateBox}>
          <Text>{universityStart + ' -'}</Text>
          <Text>{' ' + universityEnd}</Text>
        </View>
      </View>
    </View>
  )
}

interface ExperienceBoxProps {
  position: string
  organization: string
  experienceStart: string
  experienceEnd: string
  task1: string
  task2?: string
  task3?: string
  task4?: string
}

const ExperienceBox = (
  {
    position,
    organization,
    experienceStart,
    experienceEnd,
    task1,
    task2,
    task3,
    task4,
  }: ExperienceBoxProps) => {
  const tasks = [task1, task2, task3, task4]

  return (
    <View>
      <View style={styles.sectionTop}>
        <Text style={styles.sectionHeading}>{position}</Text>
        <View style={styles.dateBox}>
          <Text style={styles.textL}>{experienceStart + ' -'}</Text>
          <Text style={styles.textL}>{' ' + experienceEnd}</Text>
        </View>
      </View>
      <Text>{organization}</Text>
      {tasks.map((task, index) => {
        return <Text key={index} style={styles.task}>{task}</Text>
      })}
    </View>
  )
}

interface ProjectsBoxProps {
  projectName: string
  stack: string
  projectStart: string
  projectEnd: string
  task1: string
  task2?: string
  task3?: string
  task4?: string
}

const ProjectsBox = (
  {
    projectName,
    stack,
    projectStart,
    projectEnd,
    task1,
    task2,
    task3,
    task4,
  }: ProjectsBoxProps) => {
  const tasks = [task1, task2, task3, task4]

  return (
    <View>
      <View style={styles.sectionTop}>
        <View style={styles.dateBox}>
          <Text style={styles.sectionHeading}>{projectName}</Text>
          <Text style={styles.textL}>{' ' + stack}</Text>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.textL}>{projectStart + ' -'}</Text>
          <Text style={styles.textL}>{' ' + projectEnd}</Text>
        </View>
      </View>
      {tasks.map((task, index) => <Text key={index} style={styles.task}>{task}</Text>)}
    </View>
  )
}