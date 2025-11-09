import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface LicenseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const LicenseCard = ({ icon: Icon, title, description, buttonText, onClick }: LicenseCardProps) => {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:scale-[1.02] animate-scale-in shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-full shadow-sm border border-border">
            <Icon className="w-12 h-12 text-[hsl(220,93%,47%)]" />
          </div>
        </div>
        <CardTitle className="text-lg md:text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-5 px-5">
        <CardDescription className="text-sm md:text-base text-muted-foreground leading-relaxed min-h-[60px]">
          {description}
        </CardDescription>
        <Button 
          onClick={onClick}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 md:py-6 transition-all text-sm md:text-base rounded-lg"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LicenseCard;
