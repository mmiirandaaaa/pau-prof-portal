import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplicantsBySubject, getSubjectById } from "@/data/mockData";
import { ArrowLeft, ArrowUpDown, GraduationCap, Briefcase } from "lucide-react";

const ApplicantsList = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"gpa" | "name" | "semesters">("gpa");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const subject = subjectId ? getSubjectById(subjectId) : null;
  const applicants = subjectId ? getApplicantsBySubject(subjectId) : [];

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Asignatura no encontrada</p>
          <Button onClick={() => navigate("/")}>Volver al Dashboard</Button>
        </Card>
      </div>
    );
  }

  const sortedApplicants = [...applicants].sort((a, b) => {
    if (sortBy === "gpa") {
      return sortOrder === "desc" ? b.gpa - a.gpa : a.gpa - b.gpa;
    } else if (sortBy === "semesters") {
      return sortOrder === "desc" ? b.semestersAsTA - a.semestersAsTA : a.semestersAsTA - b.semestersAsTA;
    } else {
      return sortOrder === "desc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    }
  });

  const toggleSort = (field: "gpa" | "name" | "semesters") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Postulantes para {subject.name}</h1>
          <p className="text-muted-foreground text-lg">
            {applicants.length} candidato{applicants.length !== 1 ? "s" : ""} disponible
            {applicants.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="mb-6 flex gap-3 flex-wrap items-center">
          <Button
            variant="outline"
            onClick={() => toggleSort("gpa")}
            className="gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            Ordenar por Promedio
            {sortBy === "gpa" && (
              <span className="text-xs">({sortOrder === "desc" ? "↓" : "↑"})</span>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => toggleSort("semesters")}
            className="gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            Ordenar por Experiencia
            {sortBy === "semesters" && (
              <span className="text-xs">({sortOrder === "desc" ? "↓" : "↑"})</span>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => toggleSort("name")}
            className="gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            Ordenar por Nombre
            {sortBy === "name" && (
              <span className="text-xs">({sortOrder === "desc" ? "↓" : "↑"})</span>
            )}
          </Button>
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {sortedApplicants.map((applicant) => (
            <Card
              key={applicant.id}
              className="hover:shadow-lg transition-all duration-300 hover:border-primary/30"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{applicant.name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <GraduationCap className="w-3 h-3" />
                        Promedio: {applicant.gpa}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Briefcase className="w-3 h-3" />
                        {applicant.experience}
                      </Badge>
                    </div>
                  </div>
                  <Link to={`/subject/${subjectId}/applicant/${applicant.id}`}>
                    <Button>Ver Detalles</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    <span className="font-medium">{applicant.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Teléfono:</span>{" "}
                    <span className="font-medium">{applicant.phone}</span>
                  </div>
                </div>
                {applicant.previousTA.length > 0 && (
                  <div className="mt-3 text-sm">
                    <span className="text-muted-foreground">Experiencia previa:</span>{" "}
                    <span className="font-medium">{applicant.previousTA[0]}</span>
                    {applicant.previousTA.length > 1 && (
                      <span className="text-muted-foreground">
                        {" "}
                        (+{applicant.previousTA.length - 1} más)
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {applicants.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No hay postulantes para esta asignatura aún
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsList;
