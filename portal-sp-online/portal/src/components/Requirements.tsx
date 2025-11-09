import { FileCheck, CheckCircle } from "lucide-react";

const Requirements = () => {
  const documents = [
    "Documento de Identidade (RG ou CNH)",
    "CPF",
    "Comprovante de residência",
    "Certificado MEI (caso possua)",
    "Foto do ponto de venda",
  ];

  return (
    <section className="bg-background section-spacing">
      <div className="gov-container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <FileCheck className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Requisitos e Documentos
            </h2>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-foreground">
              Documentos necessários para solicitar:
            </h3>
            <ul className="space-y-4">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground/80 font-body">{doc}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground font-body">
                <strong>Atenção:</strong> Todos os documentos devem estar legíveis e dentro do prazo de validade. 
                Documentos digitalizados ou fotografados devem ter boa qualidade de imagem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirements;
