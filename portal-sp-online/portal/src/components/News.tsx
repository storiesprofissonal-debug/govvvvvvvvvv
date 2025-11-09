import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Calendar } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      title: "SP lança novo sistema digital de licenciamento comercial",
      date: "15 de Janeiro de 2025",
      description: "Portal moderniza o processo de solicitação de licenças para comerciantes e ambulantes do estado.",
    },
    {
      title: "Feiras regionais terão cadastro simplificado para ambulantes",
      date: "10 de Janeiro de 2025",
      description: "Governo estadual facilita regularização de comerciantes em eventos e feiras em todo o território paulista.",
    },
    {
      title: "Novos prazos para renovação de licenças comerciais",
      date: "05 de Janeiro de 2025",
      description: "Confira as datas e procedimentos para manter sua licença comercial regularizada durante o ano de 2025.",
    },
  ];

  return (
    <section className="bg-muted section-spacing">
      <div className="gov-container">
        <div className="flex items-center justify-center mb-12">
          <Newspaper className="h-8 w-8 text-primary mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Notícias e Atualizações
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm font-body">{news.date}</span>
                </div>
                <CardTitle className="text-xl leading-tight">{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body">{news.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
