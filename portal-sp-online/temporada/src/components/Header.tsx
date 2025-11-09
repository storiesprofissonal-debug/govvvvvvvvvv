const Header = () => {
  return (
    <header className="bg-primary shadow-md">
      <div className="gov-container py-2 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <img 
              src="/logo-sp-oficial.png" 
              alt="Governo do Estado de São Paulo" 
              className="h-8 sm:h-10 md:h-12 w-auto flex-shrink-0 object-contain"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-primary-foreground leading-tight">
                Portal de Licenças Comerciais
              </h1>
              <p className="text-primary-foreground/80 text-[9px] sm:text-[10px] md:text-xs lg:text-sm leading-tight mt-0.5 hidden sm:block">
                Estado de São Paulo — Sistema de Solicitação Online
              </p>
            </div>
          </div>
          <img 
            src="/govbr.webp" 
            alt="Gov.br" 
            className="h-6 sm:h-7 md:h-9 w-auto flex-shrink-0 object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
