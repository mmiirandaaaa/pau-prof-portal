import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getApplicantById, getSubjectById } from "@/data/mockData";
import { ArrowLeft, Mail, Phone, GraduationCap, Briefcase, Award, FileText, Download, CheckCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApplicantDetail = () => {
  const { subjectId, applicantId } = useParams<{ subjectId: string; applicantId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<"pending" | "preselected" | "selected">("pending");

  const applicant = applicantId ? getApplicantById(applicantId) : null;
  const subject = subjectId ? getSubjectById(subjectId) : null;

  if (!applicant || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Postulante no encontrado</p>
          <Button onClick={() => navigate("/")}>Volver al Dashboard</Button>
        </Card>
      </div>
    );
  }

  const handleSelect = () => {
    setStatus("selected");
    toast({
      title: "¡Ayudante Seleccionado!",
      description: `${applicant.name} ha sido seleccionado como ayudante para ${subject.name}.`,
    });
  };

  const handlePreselect = () => {
    setStatus("preselected");
    toast({
      title: "Postulante Preseleccionado",
      description: `${applicant.name} ha sido marcado como preseleccionado.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link to={`/subject/${subjectId}/applicants`}>
            <Button variant="ghost" className="mb-4 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Postulantes
            </Button>
          </Link>
        </div>

        {/* Main Info Card */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-3">{applicant.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="gap-1 text-base px-3 py-1">
                    <GraduationCap className="w-4 h-4" />
                    Promedio: {applicant.gpa}
                  </Badge>
                  <Badge variant="outline" className="gap-1 text-base px-3 py-1">
                    <Briefcase className="w-4 h-4" />
                    {applicant.experience}
                  </Badge>
                  {status === "selected" && (
                    <Badge variant="success" className="gap-1 text-base px-3 py-1">
                      <CheckCircle className="w-4 h-4" />
                      Seleccionado
                    </Badge>
                  )}
                  {status === "preselected" && (
                    <Badge variant="default" className="gap-1 text-base px-3 py-1">
                      <Star className="w-4 h-4" />
                      Preseleccionado
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base">
                  Postulante para {subject.name}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-base">
              <Mail className="w-5 h-5 text-primary" />
              <a href={`mailto:${applicant.email}`} className="hover:underline">
                {applicant.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-base">
              <Phone className="w-5 h-5 text-primary" />
              <a href={`tel:${applicant.phone}`} className="hover:underline">
                {applicant.phone}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <Button
            variant="success"
            size="lg"
            onClick={handleSelect}
            disabled={status === "selected"}
            className="flex-1 min-w-[200px]"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {status === "selected" ? "Ya Seleccionado" : "Seleccionar como Ayudante"}
          </Button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Academic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Información Académica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Promedio de Notas</h4>
                <p className="text-2xl font-bold text-primary">{applicant.gpa}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Semestres como Ayudante</h4>
                <p className="text-2xl font-bold text-primary">{applicant.semestersAsTA}</p>
              </div>
              
              {applicant.relevantCourses.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Cursos Relevantes</h4>
                  <ul className="space-y-1">
                    {applicant.relevantCourses.map((course, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {applicant.distinctions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Distinciones Académicas
                  </h4>
                  <ul className="space-y-1">
                    {applicant.distinctions.map((distinction, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        {distinction}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Experiencia Previa
              </CardTitle>
            </CardHeader>
            <CardContent>
              {applicant.previousTA.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Ayudantías Anteriores</h4>
                  <ul className="space-y-2">
                    {applicant.previousTA.map((ta, index) => (
                      <li key={index} className="flex items-start gap-2 p-3 bg-secondary/30 rounded-md">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{ta}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Sin experiencia previa como ayudante</p>
                  <p className="text-xs text-muted-foreground mt-1">Primera postulación</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Motivation Letter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Carta de Motivación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-line">{applicant.motivationLetter}</p>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <Button variant="outline" className="gap-2" asChild>
              <a href={applicant.cvUrl} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4" />
                Descargar CV
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4" />
                Ver Carta de Motivación
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicantDetail;
