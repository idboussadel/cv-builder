import { pdf } from "@react-pdf/renderer";
import * as FileSaver from "file-saver";
import { Experience } from "@/hooks/useExperience";
import CVDocument from "./CVDocument";
import { Project } from "@/hooks/useProjects";
import { Skill } from "@/hooks/useSkills";
import { Education } from "@/hooks/useEducation";
import { SectionId } from "@/hooks/useCVStore";

const generatePdfDocument = async (
  name: string,
  githubOrEmail: string,
  experiences: Experience[],
  projects: Project[],
  skills: Skill[],
  educations: Education[],
  sectionOrder: SectionId[],
  fileName: string
) => {
  const blob = await pdf(
    <CVDocument
      name={name}
      githubOrEmail={githubOrEmail}
      experiences={experiences}
      projects={projects}
      skills={skills}
      educations={educations}
      sectionOrder={sectionOrder}
    />
  ).toBlob();
  FileSaver.saveAs(blob, fileName);
};

export default generatePdfDocument;
