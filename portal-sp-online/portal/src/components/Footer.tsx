const Footer = () => {
  return (
    <footer className="bg-gov-dark text-white">
      <div className="gov-container section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Informações */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gov-yellow">INFORMAÇÕES</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.saopaulo.sp.gov.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gov-yellow transition-colors">
                  Portal do Governo de SP
                </a>
              </li>
              <li>
                <a href="https://www.transparencia.sp.gov.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gov-yellow transition-colors">
                  Portal da Transparência
                </a>
              </li>
              <li>
                <a href="https://www.poupatempo.sp.gov.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gov-yellow transition-colors">
                  Poupatempo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gov-yellow transition-colors">
                  Legislação Estadual
                </a>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gov-yellow">ATENDIMENTO</h3>
            <ul className="space-y-2">
              <li>Ouvidoria: 0800 017 3352</li>
              <li>
                <a href="mailto:ouvidoria@sp.gov.br" className="hover:text-gov-yellow transition-colors">
                  ouvidoria@sp.gov.br
                </a>
              </li>
              <li>Segunda a Sexta: 8h às 18h</li>
            </ul>
          </div>

          {/* Localização */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gov-yellow">LOCALIZAÇÃO</h3>
            <address className="not-italic space-y-1">
              <p>Palácio dos Bandeirantes</p>
              <p>Av. Morumbi, 4.500 – Morumbi</p>
              <p>São Paulo/SP</p>
              <p>CEP: 05698-900</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-sm">
          <p>© 2025 Governo do Estado de São Paulo — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
