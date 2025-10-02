import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSubjects } from "@/data/mockData";
import { BookOpen, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 text-primary">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              PAU
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Plataforma de Ayudantías Unificadas</p>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Mis Asignaturas</h2>
          <p className="text-muted-foreground">
            Gestiona los postulantes y selecciona a los mejores ayudantes para tus cursos
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSubjects.map((subject) => (
            <Card
              key={subject.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardHeader>
                <CardTitle className="text-xl flex items-start justify-between gap-2">
                  <span className="flex-1">{subject.name}</span>
                  <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                </CardTitle>
                <CardDescription>
                  Revisa y selecciona ayudantes calificados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {subject.applicantsCount} postulantes
                  </Badge>
                </div>
                <Link to={`/subject/${subject.id}/applicants`}>
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Ver Postulantes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-12 p-6 bg-card rounded-lg border border-border/50">
          <div className="flex flex-wrap gap-8 justify-center items-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{mockSubjects.length}</p>
              <p className="text-sm text-muted-foreground">Asignaturas</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                {mockSubjects.reduce((acc, subject) => acc + subject.applicantsCount, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Postulantes Totales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
