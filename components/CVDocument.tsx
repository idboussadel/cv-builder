import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Experience } from "@/hooks/useExperience";
import { Font } from "@react-pdf/renderer";
import { formatEndDate, formatMonthYear } from "@/lib/utils";
import { Project } from "@/hooks/useProjects";
import { Skill } from "@/hooks/useSkills";
import { Education } from "@/hooks/useEducation";
import { SectionId } from "@/hooks/useCVStore";

// Registering custom fonts
Font.register({
  family: "Times New Roman",
  fonts: [
    {
      src: "/fonts/times-new-roman.ttf",
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: "/fonts/times-new-roman-bold.ttf",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    {
      src: "/fonts/times-new-roman-italic.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "/fonts/times-new-roman-bold-italic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Times New Roman",
    margin: 0,
  },
  section: {
    marginBottom: 12,
  },
  subSection: {
    marginBottom: 9,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
  },
  subheader: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 11,
  },
  textCenter: {
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexItalic: {
    flexDirection: "row",
    gap: 3,
  },
  list: {
    marginLeft: 20,
    marginTop: 5,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: 30,
  },
  bullet: {
    marginRight: 10,
    fontWeight: "bold",
  },
  role: {
    fontStyle: "italic",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 6,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  skill: {
    marginRight: 4,
  },
});

interface CVDocumentProps {
  name: string;
  githubOrEmail: string;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  educations: Education[];
  sectionOrder: SectionId[];
}

const CVDocument = ({
  name,
  githubOrEmail,
  experiences,
  projects,
  skills,
  educations,
  sectionOrder,
}: CVDocumentProps) => {
  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "experience":
        return (
          experiences.length > 0 && (
            <View style={[styles.subSection]} key="experience">
              <Text
                style={[
                  styles.subheader,
                  styles.textCenter,
                  styles.borderBottom,
                ]}
              >
                Experience
              </Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={styles.section}>
                  <View style={styles.flexRow}>
                    <Text style={[styles.text, { fontWeight: "bold" }]}>
                      {exp.company}
                    </Text>
                    <Text style={styles.text}>{exp.location}</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={[styles.text, styles.role]}>{exp.role}</Text>
                    <Text style={styles.text}>
                      {formatMonthYear(exp.from)} - {formatEndDate(exp.to)}
                    </Text>
                  </View>
                  <View style={styles.list}>
                    {exp.responsibilities.map((resp, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text>{resp}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )
        );
      case "projects":
        return (
          projects.length > 0 && (
            <View style={[styles.subSection]} key="projects">
              <Text
                style={[
                  styles.subheader,
                  styles.textCenter,
                  styles.borderBottom,
                ]}
              >
                Projects
              </Text>
              {projects.map((project) => (
                <View key={project.id} style={styles.subSection}>
                  <View style={styles.flexItalic}>
                    <Text style={{ fontWeight: "bold" }}>{project.name}</Text>
                    <Text style={{ fontStyle: "italic" }}>
                      {" "}
                      ( {project.mainTechnology} )
                    </Text>
                  </View>
                  <View style={styles.list}>
                    {project.responsibilities.map((resp, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text style={[styles.bullet, styles.text]}>•</Text>
                        <Text style={styles.text}>{resp}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )
        );
      case "skills":
        return (
          skills.length > 0 && (
            <View style={styles.subSection} key="skills">
              <Text
                style={[
                  styles.subheader,
                  styles.textCenter,
                  styles.borderBottom,
                ]}
              >
                Skills
              </Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                  <Text key={skill.id} style={styles.skill}>
                    {skill.name}
                    {index < skills.length - 1 ? ", " : ""}
                  </Text>
                ))}
              </View>
            </View>
          )
        );
      case "education":
        return (
          educations.length > 0 && (
            <View style={styles.subSection} key="education">
              <Text
                style={[
                  styles.subheader,
                  styles.textCenter,
                  styles.borderBottom,
                ]}
              >
                Education
              </Text>
              {educations.map((edu) => (
                <View key={edu.id} style={styles.section}>
                  <View style={styles.flexRow}>
                    <Text style={[styles.text, { fontWeight: "bold" }]}>
                      {edu.school}
                    </Text>
                    <Text style={styles.text}>{edu.location}</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={[styles.text, styles.role]}>
                      {edu.bachelor}
                    </Text>
                    <Text style={styles.text}>
                      {formatMonthYear(edu.from)} - {formatEndDate(edu.to)}
                    </Text>
                  </View>
                  <View style={styles.list}>
                    {edu.responsibilities.map((responsibility, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text>{responsibility}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )
        );
      default:
        return null;
    }
  };

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={[styles.header, styles.textCenter]}>{name}</Text>
          <Text style={[styles.text, styles.textCenter]}>{githubOrEmail}</Text>
        </View>
        {sectionOrder.map((sectionId) => renderSection(sectionId))}
      </Page>
    </Document>
  );
};

export default CVDocument;
