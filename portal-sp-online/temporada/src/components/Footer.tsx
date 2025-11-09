import { MapPin, Phone, Mail, Clock, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-5 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center md:text-left">
          {/* Informações */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">INFORMAÇÕES</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Portal do Governo de SP
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Portal da Transparência
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Poupatempo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Legislação Estadual
                </a>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">ATENDIMENTO</h3>
            <ul className="space-y-3 text-xs md:text-sm flex flex-col items-center">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Ouvidoria</p>
                  <p>0800 017 3352</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:ouvidoria@sp.gov.br" className="hover:text-accent transition-colors">
                  ouvidoria@sp.gov.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Segunda a Sexta: 8h às 18h</p>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors font-semibold">
                  Acessar Ouvidoria Online
                </a>
              </li>
            </ul>
          </div>

          {/* Localização */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">LOCALIZAÇÃO</h3>
            <div className="flex items-start gap-2 text-xs md:text-sm justify-center md:justify-start">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Palácio dos Bandeirantes</p>
                <p>Av. Morumbi, 4.500 – Morumbi</p>
                <p>São Paulo/SP</p>
                <p>CEP: 05698-900</p>
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">SEGURANÇA</h3>
            <div className="flex items-start gap-2 text-xs md:text-sm justify-center md:justify-start">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Sistema Seguro</p>
                <p>Certificado SSL/TLS</p>
                <p>Conformidade LGPD</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs md:text-sm">
          <p className="mb-3">
            Este portal foi desenvolvido em parceria com o Governo do Estado de São Paulo para facilitar a solicitação de licenças comerciais.
          </p>
          <p className="text-[10px] md:text-xs text-primary-foreground/70">
            © {new Date().getFullYear()} Governo do Estado de São Paulo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
