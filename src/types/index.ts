export interface Subject {
  id: string;
  name: string;
  applicantsCount: number;
}

export interface Applicant {
  id: string;
  name: string;
  gpa: number;
  experience: string;
  subjectId: string;
  email: string;
  phone: string;
  previousTA: string[];
  relevantCourses: string[];
  distinctions: string[];
  motivationLetter: string;
  cvUrl: string;
  status: "pending" | "preselected" | "selected";
}
