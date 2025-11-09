import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`bg-primary sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg py-2 md:py-3" : "shadow-md py-3 md:py-5"
      }`}
    >
      <div className="gov-container">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo e Título */}
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src="https://preview--sp-licensa-hub.lovable.app/logo-sp-oficial.png" 
                alt="Governo do Estado de São Paulo" 
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto flex-shrink-0 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <div className="min-w-0 flex-1 animate-[slideDown_0.5s_ease-out]">
              <h1 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary-foreground leading-tight tracking-tight">
                Portal de Licenças Comerciais
              </h1>
              <p className="text-primary-foreground/90 text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight mt-1 hidden sm:block font-medium">
                Estado de São Paulo — Sistema de Solicitação Online
              </p>
            </div>
          </div>

          {/* Logo Gov.br */}
          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 rounded blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src="/govbr.webp" 
              alt="Gov.br" 
              className="h-7 sm:h-8 md:h-10 lg:h-12 w-auto flex-shrink-0 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
      
      {/* Barra inferior decorativa */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60" />
    </header>
  );
};

export default Header;
