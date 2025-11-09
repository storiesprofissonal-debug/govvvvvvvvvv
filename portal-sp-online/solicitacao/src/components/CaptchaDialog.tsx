import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield, Check } from "lucide-react";

interface CaptchaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface CaptchaStep {
  question: string;
  options: number[];
  correctAnswer: number;
}

export const CaptchaDialog = ({ isOpen, onClose, onSuccess }: CaptchaDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<CaptchaStep[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      generateSteps();
      setCurrentStep(1);
      setIsComplete(false);
    }
  }, [isOpen]);

  const generateSteps = () => {
    const newSteps: CaptchaStep[] = [];
    
    // Passo 1: Números pares
    const evenNumbers = [2, 4, 6, 8, 10, 12];
    const oddNumbers = [3, 5, 7, 9, 11];
    const evenCorrect = evenNumbers[Math.floor(Math.random() * evenNumbers.length)];
    const evenOptions = [evenCorrect, ...oddNumbers.slice(0, 3).sort(() => Math.random() - 0.5)].sort(() => Math.random() - 0.5);
    newSteps.push({
      question: "Clique no número PAR",
      options: evenOptions,
      correctAnswer: evenCorrect
    });

    // Passo 2: Maior número
    const numbers2 = Array.from({ length: 4 }, () => Math.floor(Math.random() * 50) + 10);
    const maxNumber = Math.max(...numbers2);
    newSteps.push({
      question: "Clique no MAIOR número",
      options: numbers2,
      correctAnswer: maxNumber
    });

    // Passo 3: Resultado de operação
    const num1 = Math.floor(Math.random() * 10) + 5;
    const num2 = Math.floor(Math.random() * 10) + 5;
    const correctResult = num1 + num2;
    const wrongOptions = [
      correctResult + Math.floor(Math.random() * 5) + 1,
      correctResult - Math.floor(Math.random() * 5) - 1,
      correctResult + Math.floor(Math.random() * 10) + 5
    ];
    const resultOptions = [correctResult, ...wrongOptions].sort(() => Math.random() - 0.5);
    newSteps.push({
      question: `Clique no resultado de ${num1} + ${num2}`,
      options: resultOptions,
      correctAnswer: correctResult
    });

    setSteps(newSteps);
  };

  const handleOptionClick = (value: number) => {
    if (steps.length === 0) return;

    const currentStepData = steps[currentStep - 1];
    
    if (value === currentStepData.correctAnswer) {
      if (currentStep < 3) {
        toast.success(`Parte ${currentStep} completa!`);
        setCurrentStep(currentStep + 1);
      } else {
        setIsComplete(true);
        toast.success("Verificação completa!");
        setTimeout(() => {
          onSuccess();
          setIsComplete(false);
        }, 1500);
      }
    } else {
      toast.error("Resposta incorreta! Tente novamente.");
      generateSteps();
      setCurrentStep(1);
    }
  };

  const handleCancel = () => {
    setCurrentStep(1);
    setIsComplete(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-primary" />
            <DialogTitle>Verificação de Segurança</DialogTitle>
          </div>
          <DialogDescription>
            {isComplete ? "Verificação completa!" : `Parte ${currentStep} de 3`}
          </DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-12 h-12 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-success mb-2">Verificação Completa!</h3>
            <p className="text-muted-foreground">Redirecionando...</p>
          </div>
        ) : steps.length > 0 ? (
          <div className="py-6">
            <div className="mb-6 text-center">
              <p className="text-lg font-medium mb-4">{steps[currentStep - 1].question}</p>
              <div className="flex gap-2 justify-center mb-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      step < currentStep
                        ? "bg-success"
                        : step === currentStep
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {steps[currentStep - 1].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  onClick={() => handleOptionClick(option)}
                  className="h-20 text-2xl font-bold hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            Gerando verificação...
          </div>
        )}

        {!isComplete && (
          <div className="flex justify-center">
            <Button variant="ghost" onClick={handleCancel} className="text-sm">
              Cancelar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
