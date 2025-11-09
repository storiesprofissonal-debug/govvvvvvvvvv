import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-primary text-primary-foreground section-spacing">
      <div className="gov-container">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Bem-vindo ao Portal de Licenças Comerciais
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-primary-foreground/90 font-body leading-relaxed">
            Sistema oficial do Governo do Estado de São Paulo para solicitação e gestão de licenças de ambulantes e comerciantes eventuais.
          </p>

          <Button 
            size="lg"
            onClick={() => {
              window.location.href = "https://www.estimulandomentes.online/";
            }}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 px-8 text-lg w-full sm:w-auto shadow-lg transition-all duration-200"
          >
            <FileText className="mr-2 h-5 w-5" />
            Solicitar Licença Comercial
          </Button>

        </div>
      </div>
    </section>
  );
};

export default Hero;
