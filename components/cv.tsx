"use client";

import useInfo from "@/hooks/useInfo";
import { useExperienceStore } from "@/hooks/useExperience";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import ExperienceItem from "./draggable-items/ExperienceItem";
import { useProjectsStore } from "@/hooks/useProjects";
import ProjectItem from "./draggable-items/ProjectItem";
import { useSkillStore } from "@/hooks/useSkills";
import generatePdfDocument from "./generatePdfDocument";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { useEducationStore } from "@/hooks/useEducation";
import EducationItem from "./draggable-items/EducationItem";
import { useCVStore } from "@/hooks/useCVStore";
import { SortableItem } from "./sortable-item";

const Cv = () => {
  const { name, githubOrEmail } = useInfo();
  const { experiences, updateExperienceOrder } = useExperienceStore();
  const { projects, updateProjectOrder } = useProjectsStore();
  const { educations, updateEducationOrder } = useEducationStore();
  const { skills } = useSkillStore();

  const { sectionOrder, reorderSection } = useCVStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndSections = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const fromIndex = sectionOrder.indexOf(active.id);
      const toIndex = sectionOrder.indexOf(over.id);
      reorderSection(fromIndex, toIndex);
    }
  };

  const handleDragEndExperiences = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      updateExperienceOrder(Number(active.id), Number(over.id));
    }
  };

  const handleDragEndProjects = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      updateProjectOrder(Number(active.id), Number(over.id));
    }
  };

  const handleDragEndEducation = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      updateEducationOrder(Number(active.id), Number(over.id));
    }
  };

  const handleDownload = () => {
    generatePdfDocument(
      name,
      githubOrEmail,
      experiences,
      projects,
      skills,
      educations,
      sectionOrder,
      "cv.pdf"
    );
  };

  return (
    <ScrollArea className="h-[90vh]">
      <div className="p-4 px-6 border shadow bg-white times min-h-[1123px]">
        <div className="absolute top-2 right-3">
          <Button
            onClick={handleDownload}
            className="flex items-center space-x-2"
          >
            <ArrowDownToLine className="w-5 h-5" />
          </Button>
        </div>
        <p className="times-bold text-2xl text-center">{name || ""}</p>
        <p className="times leading-[0.6] text-center">{githubOrEmail || ""}</p>

        {/* Section Reordering */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEndSections}
        >
          <SortableContext
            items={sectionOrder}
            strategy={verticalListSortingStrategy}
          >
            {sectionOrder.map((sectionId) => (
              <SortableItem key={sectionId} id={sectionId}>
                {sectionId === "experience" && experiences.length > 0 && (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEndExperiences}
                  >
                    <div className="mt-6">
                      <h2 className="text-xl font-bold mb-2 text-center border-b-2 border-black">
                        Experience
                      </h2>
                      <SortableContext
                        items={experiences.map((exp) => exp.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {experiences.map((exp) => (
                          <ExperienceItem key={exp.id} experience={exp} />
                        ))}
                      </SortableContext>
                    </div>
                  </DndContext>
                )}

                {sectionId === "projects" && projects.length > 0 && (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEndProjects}
                  >
                    <div className="mt-6">
                      <h2 className="text-xl font-bold mb-2 text-center border-b-2 border-black">
                        Projects
                      </h2>
                      <SortableContext
                        items={projects.map((proj) => proj.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {projects.map((project) => (
                          <ProjectItem key={project.id} project={project} />
                        ))}
                      </SortableContext>
                    </div>
                  </DndContext>
                )}

                {sectionId === "skills" && skills.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2 text-center border-b-2 border-black">
                      Skills
                    </h2>
                    <div className="flex gap-2 justify-center">
                      {skills.map((skill, index) => (
                        <p className="font-semibold" key={skill.id}>
                          {skill.name}
                          {index < skills.length - 1 && ","}{" "}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {sectionId === "education" && educations.length > 0 && (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEndEducation}
                  >
                    <div className="mt-6">
                      <h2 className="text-xl font-bold mb-2 text-center border-b-2 border-black">
                        Education
                      </h2>
                      <SortableContext
                        items={educations.map((edu) => edu.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {educations.map((edu) => (
                          <EducationItem key={edu.id} education={edu} />
                        ))}
                      </SortableContext>
                    </div>
                  </DndContext>
                )}
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </ScrollArea>
  );
};

export default Cv;
