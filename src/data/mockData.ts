import { Subject, Applicant } from "@/types";

export const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Diseño de Interfaces Usuarias",
    applicantsCount: 15,
  },
  {
    id: "2",
    name: "Programación Web",
    applicantsCount: 22,
  },
  {
    id: "3",
    name: "Base de Datos",
    applicantsCount: 18,
  },
  {
    id: "4",
    name: "Ingeniería de Software",
    applicantsCount: 12,
  },
];

export const mockApplicants: Applicant[] = [
  {
    id: "1",
    name: "María González Pérez",
    gpa: 6.5,
    experience: "Ex-ayudante",
    subjectId: "1",
    email: "maria.gonzalez@universidad.cl",
    phone: "+56 9 1234 5678",
    previousTA: ["Diseño de Interfaces Usuarias (2023)", "Programación Orientada a Objetos (2022)"],
    relevantCourses: ["Diseño de Interacción", "Usabilidad y UX", "Programación Frontend"],
    distinctions: ["Lista de Honor 2023", "Mejor Ayudante 2023"],
    motivationLetter: "Me gustaría ser ayudante de esta asignatura porque tengo gran pasión por el diseño de interfaces y la experiencia de usuario. Durante mi paso como estudiante, esta fue mi asignatura favorita y obtuve la nota máxima. Además, cuento con experiencia práctica desarrollando interfaces en mi trabajo part-time. Creo que puedo aportar tanto en la parte teórica como en ayudar a los estudiantes con sus proyectos prácticos.",
    cvUrl: "#",
    status: "pending",
  },
  {
    id: "2",
    name: "Carlos Rodríguez Silva",
    gpa: 6.3,
    experience: "Alto Rendimiento",
    subjectId: "1",
    email: "carlos.rodriguez@universidad.cl",
    phone: "+56 9 8765 4321",
    previousTA: ["Programación Web (2023)"],
    relevantCourses: ["Diseño de Interfaces", "Desarrollo Frontend", "Mobile Development"],
    distinctions: ["Top 10% promoción"],
    motivationLetter: "Mi interés por ser ayudante surge de mi pasión por enseñar y compartir conocimientos. He participado en varios proyectos de desarrollo web donde el diseño de interfaces ha sido crucial. Me caracterizo por ser paciente y tener buena comunicación, cualidades esenciales para apoyar el aprendizaje de otros estudiantes.",
    cvUrl: "#",
    status: "pending",
  },
  {
    id: "3",
    name: "Ana Martínez López",
    gpa: 6.7,
    experience: "Ex-ayudante",
    subjectId: "1",
    email: "ana.martinez@universidad.cl",
    phone: "+56 9 5555 6666",
    previousTA: ["Diseño Centrado en el Usuario (2023)", "Taller de Diseño (2022)", "Prototipado Rápido (2022)"],
    relevantCourses: ["UX Research", "Design Thinking", "Interfaces Avanzadas"],
    distinctions: ["Premio Mejor Proyecto Final 2023", "Lista de Honor 2022-2023"],
    motivationLetter: "Con tres semestres de experiencia como ayudante y un profundo conocimiento en diseño de interfaces, estoy segura de que puedo aportar significativamente al curso. He desarrollado metodologías propias para explicar conceptos complejos y tengo experiencia guiando proyectos estudiantiles desde la conceptualización hasta el prototipo final.",
    cvUrl: "#",
    status: "pending",
  },
  {
    id: "4",
    name: "Diego Fernández Torres",
    gpa: 5.8,
    experience: "Primera Ayudantía",
    subjectId: "1",
    email: "diego.fernandez@universidad.cl",
    phone: "+56 9 7777 8888",
    previousTA: [],
    relevantCourses: ["Diseño de Interfaces", "Programación Frontend", "Desarrollo Web"],
    distinctions: [],
    motivationLetter: "Aunque no tengo experiencia previa como ayudante, tengo gran entusiasmo por aprender y enseñar. Esta asignatura me apasionó cuando la cursé y obtuve un 6.2. Me considero muy colaborativo y siempre estoy dispuesto a ayudar a mis compañeros cuando tienen dudas.",
    cvUrl: "#",
    status: "pending",
  },
  {
    id: "5",
    name: "Sofía Ramírez Castro",
    gpa: 6.4,
    experience: "Alto Rendimiento",
    subjectId: "1",
    email: "sofia.ramirez@universidad.cl",
    phone: "+56 9 9999 0000",
    previousTA: ["Taller de Prototipado (2023)"],
    relevantCourses: ["HCI", "Diseño Visual", "Arquitectura de Información"],
    distinctions: ["Lista de Honor 2023"],
    motivationLetter: "Mi experiencia como ayudante del Taller de Prototipado me ha permitido desarrollar habilidades pedagógicas que me gustaría aplicar en este curso. Tengo especial interés en metodologías ágiles de diseño y en ayudar a los estudiantes a desarrollar su pensamiento crítico sobre usabilidad.",
    cvUrl: "#",
    status: "pending",
  },
];

export const getApplicantsBySubject = (subjectId: string): Applicant[] => {
  return mockApplicants.filter(applicant => applicant.subjectId === subjectId);
};

export const getApplicantById = (id: string): Applicant | undefined => {
  return mockApplicants.find(applicant => applicant.id === id);
};

export const getSubjectById = (id: string): Subject | undefined => {
  return mockSubjects.find(subject => subject.id === id);
};
