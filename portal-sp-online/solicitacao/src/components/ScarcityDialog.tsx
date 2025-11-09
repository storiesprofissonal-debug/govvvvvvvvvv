import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScarcityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cityName?: string;
  availableCount?: number;
}

export const ScarcityDialog = ({ isOpen, onClose, cityName, availableCount }: ScarcityDialogProps) => {
  if (!isOpen) return null;

  // Usar a contagem informada para a cidade selecionada; fallback para 5
  const displayCount = typeof availableCount === "number" && availableCount > 0 ? availableCount : 5;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 md:p-8 animate-scale-in z-[101]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-warning" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Atenção: Disponibilidade Limitada!
          </h2>

          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-gray-900">
              🚨 ATENÇÃO: Restam apenas <span className="text-warning text-2xl">{displayCount}</span> licenças disponíveis!
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Devido à alta demanda, recomendamos que você complete sua solicitação o mais rápido possível para garantir sua licença.
          </p>

          <Button 
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
            size="lg"
          >
            Continuar com a Solicitação
          </Button>
        </div>
      </div>
    </div>
  );
};
