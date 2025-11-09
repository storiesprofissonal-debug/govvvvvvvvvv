import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  "Dados da Solicitação",
  "Informações da Licença",
  "Envio de Documentos",
  "Revisão",
  "Pagamento"
];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    isCompleted
                      ? "bg-success text-success-foreground"
                      : isCurrent
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span
                  className={`text-xs mt-2 text-center hidden sm:block ${
                    isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 transition-all duration-300 ${
                    isCompleted ? "bg-success" : "bg-border"
                  }`}
                  style={{ transform: "translateX(0%)" }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-2">
        Etapa {currentStep} de {totalSteps}
      </p>
    </div>
  );
};
