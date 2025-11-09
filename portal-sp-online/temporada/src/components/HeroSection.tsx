const HeroSection = () => {
  return (
    <section className="bg-background py-12 px-5 animate-fade-in">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-xl md:text-3xl font-semibold text-primary mb-4">
          Escolha o tipo de licença que deseja solicitar
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mb-6">
          Selecione a opção que melhor se aplica à sua atividade.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;
