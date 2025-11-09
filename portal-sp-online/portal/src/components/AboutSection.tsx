import { Info } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="bg-background section-spacing">
      <div className="gov-container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Info className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              O que é a Licença Comercial?
            </h2>
          </div>
          
          <div className="space-y-6 text-lg text-foreground/80 font-body leading-relaxed">
            <p>
              A <strong className="text-foreground">Licença Comercial</strong> é a autorização emitida pelo Governo do Estado de São Paulo que permite o exercício de atividades econômicas em espaços públicos ou privados, de forma regularizada e segura.
            </p>
            <p>
              O sistema foi criado para facilitar o cadastro, a análise e a emissão de autorizações para ambulantes, comerciantes de eventos, feiras e prestadores de serviço.
            </p>
            <p>
              Com o portal digital, você pode solicitar sua licença de forma rápida, acompanhar o andamento do processo e receber sua autorização sem sair de casa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
