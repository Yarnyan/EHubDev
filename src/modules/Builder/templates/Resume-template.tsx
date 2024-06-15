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
})

export const ResumeTemplate = (props: Inputs) => {

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View>
          <Text>{props.name}</Text>
          <Link src={props.phone}>{props.phone}</Link>
          <Text>{props.email}</Text>
          <Link src={props.github}>GitHub</Link>
          {props.education.map(item => {
            return <EducationBox university={item.university} universityLocation={item.universityLocation}
                                 universityStart={item.universityStart} universityEnd={item.universityEnd}
                                 specialization={item.specialization} />
          })}
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
    <View>
      <Text>Образование</Text>
      <Text>{university}</Text>
      <Text>{universityLocation}</Text>
      <Text>{universityStart}</Text>
      <Text>{universityEnd}</Text>
      <Text>{specialization}</Text>
    </View>
  )
}

