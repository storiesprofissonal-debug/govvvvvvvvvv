import { Lock } from "lucide-react";

const SecurityBanner = () => {
  return (
    <section className="bg-muted py-8 px-6">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Lock className="w-5 h-5" />
          <p className="text-sm md:text-base font-medium">
            Sistema seguro — Portal de Licenças Comerciais do Estado de São Paulo
          </p>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground/70 mt-2">
          Certificado SSL/TLS — Conformidade com LGPD
        </p>
      </div>
    </section>
  );
};

export default SecurityBanner;
