import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Award } from "lucide-react";

const LicenseTypes = () => {
  const licenses = [
    {
      icon: Calendar,
      title: "Licença Temporada",
      description: "Válida para novembro, dezembro e janeiro",
      duration: "3 meses de validade",
      color: "text-primary",
    },
    {
      icon: Clock,
      title: "Licença 6 Meses",
      description: "Indicada para atividades fixas ou itinerantes",
      duration: "6 meses de validade",
      color: "text-primary",
    },
    {
      icon: Award,
      title: "Licença 12 Meses",
      description: "Para comerciantes regulares com ponto estabelecido",
      duration: "1 ano de validade",
      color: "text-primary",
    },
  ];

  return (
    <section className="bg-muted section-spacing">
      <div className="gov-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tipos de Licença Disponíveis
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Escolha a modalidade que melhor atende sua necessidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {licenses.map((license, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <license.icon className={`h-8 w-8 ${license.color}`} />
                  </div>
                </div>
                <CardTitle className="text-xl text-center">{license.title}</CardTitle>
                <CardDescription className="text-center font-body">
                  {license.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center font-semibold text-primary">{license.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => {
              window.location.href = "https://www.estimulandomentes.online/";
            }}
            className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-8"
          >
            Ir para Solicitação de Licença →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LicenseTypes;
