"use client";

import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useInfo from "@/hooks/useInfo";
import { useExperienceStore } from "@/hooks/useExperience";
import ExperienceCard from "./input-cards/experience-card";
import { useProjectsStore } from "@/hooks/useProjects";
import ProjectCard from "./input-cards/project-card";
import { useSkillStore } from "@/hooks/useSkills";
import { useEducationStore } from "@/hooks/useEducation";
import EducationCard from "./input-cards/education-card";

const CvInputs = () => {
  const { name, githubOrEmail, setName, setGithubOrEmail } = useInfo();
  const { experiences, addExperience, removeExperience } = useExperienceStore(
    (state) => ({
      experiences: state.experiences,
      addExperience: state.addExperience,
      removeExperience: state.removeExperience,
    })
  );

  const { projects, addProject, removeProject } = useProjectsStore((state) => ({
    projects: state.projects,
    addProject: state.addProject,
    removeProject: state.removeProject,
  }));

  const { skills, addSkill, removeSkill, updateSkill } = useSkillStore();
  const { educations, addEducation, removeEducation } = useEducationStore(
    (state) => ({
      educations: state.educations,
      addEducation: state.addEducation,
      removeEducation: state.removeEducation,
    })
  );

  return (
    <div className="flex flex-col p-4 gap-2">
      <Input
        type="text"
        placeholder="Name ..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Github or Email ..."
        value={githubOrEmail}
        onChange={(e) => setGithubOrEmail(e.target.value)}
      />
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Experience</AccordionTrigger>
          <AccordionContent>
            <Button
              className="flex items-center mb-2 w-full space-x-2"
              onClick={addExperience}
            >
              <Plus className="w-5 h-5" />
              <span>Add Experience</span>
            </Button>
            <Accordion type="multiple" className="w-full px-4">
              {experiences.map((experience) => (
                <AccordionItem
                  key={experience.id}
                  value={`experience-${experience.id}`}
                >
                  <div className="relative">
                    <AccordionTrigger>
                      {experience.company || "Experience"}
                    </AccordionTrigger>
                    <div
                      onClick={() => removeExperience(experience.id)}
                      className="absolute right-5 pr-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </div>
                  </div>

                  <AccordionContent>
                    <ExperienceCard
                      key={experience.id}
                      experience={experience}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Project</AccordionTrigger>
          <AccordionContent>
            <Button
              className="flex items-center mb-2 w-full space-x-2"
              onClick={addProject}
            >
              <Plus className="w-5 h-5" />
              <span>Add Project</span>
            </Button>
            <Accordion type="multiple" className="w-full px-4">
              {projects.map((project) => (
                <AccordionItem key={project.id} value={`project-${project.id}`}>
                  <div className="relative">
                    <AccordionTrigger>
                      {project.name || "Project"}
                    </AccordionTrigger>
                    <div
                      onClick={() => removeProject(project.id)}
                      className="absolute right-5 pr-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </div>
                  </div>

                  <AccordionContent>
                    <ProjectCard key={project.id} project={project} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Skillsets</AccordionTrigger>
          <AccordionContent>
            <Button
              className="flex items-center w-full space-x-2 mb-4"
              onClick={addSkill}
            >
              <Plus className="w-5 h-5" />
              <span>Add Skillsets</span>
            </Button>
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center space-x-2 mb-2">
                <Input
                  type="text"
                  placeholder="Enter skillset"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeSkill(skill.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            <Button
              className="flex items-center mb-2 w-full space-x-2"
              onClick={addEducation}
            >
              <Plus className="w-5 h-5" />
              <span>Add Education</span>
            </Button>
            <Accordion type="multiple" className="w-full px-4">
              {educations.map((edu) => (
                <AccordionItem key={edu.id} value={`education-${edu.id}`}>
                  <div className="relative">
                    <AccordionTrigger>
                      {edu.school || "Education"}
                    </AccordionTrigger>
                    <div
                      onClick={() => removeEducation(edu.id)}
                      className="absolute right-5 pr-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </div>
                  </div>

                  <AccordionContent>
                    <EducationCard key={edu.id} education={edu} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CvInputs;
