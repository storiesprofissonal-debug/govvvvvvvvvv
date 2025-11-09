import { ExternalLink, Shield, MessageCircle, FileText, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-16">
      <div className="gov-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Links Institucionais */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Informações
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.saopaulo.sp.gov.br/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  Portal do Governo de SP
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.transparencia.sp.gov.br/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  Portal da Transparência
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.poupatempo.sp.gov.br/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  Poupatempo
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.al.sp.gov.br/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  Legislação Estadual
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contato e Atendimento */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Atendimento
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Ouvidoria: 0800 017 3352</span>
              </li>
              <li>📧 ouvidoria@sp.gov.br</li>
              <li>🕐 Segunda a Sexta: 8h às 18h</li>
              <li>
                <a 
                  href="https://www.ouvidoria.sp.gov.br/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground flex items-center gap-1 mt-2"
                >
                  Acessar Ouvidoria Online
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Endereço */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Localização
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Palácio dos Bandeirantes</p>
              <p>Av. Morumbi, 4.500</p>
              <p>Morumbi - São Paulo/SP</p>
              <p>CEP: 05698-900</p>
            </div>
          </div>

          {/* Segurança e Certificações */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-8 h-8 text-success" />
                <div>
                  <p className="font-medium text-foreground">Sistema Seguro</p>
                  <p>Certificado SSL/TLS</p>
                </div>
              </div>
              <div className="text-muted-foreground">
                <p className="font-medium text-foreground">Conformidade LGPD</p>
                <p className="text-xs mt-1">Lei nº 13.709/2018</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Governo do Estado de São Paulo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
