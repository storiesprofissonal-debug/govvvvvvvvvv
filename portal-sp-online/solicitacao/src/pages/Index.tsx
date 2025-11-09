/**
 * PORTAL DE LICENÇAS COMERCIAIS - ESTADO DE SÃO PAULO
 * 
 * PROTÓTIPO FRONT-END - sem backend integrado
 * 
 * Para produção, é necessário:
 * - Implementar armazenamento seguro de dados
 * - Validação no servidor
 * - Gateway de pagamento homologado
 * - Homologação legal para uso de identidade visual oficial
 * - Autorização do Governo do Estado de São Paulo
 */

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgressBar } from "@/components/ProgressBar";
import { ScarcityDialog } from "@/components/ScarcityDialog";
import { CaptchaDialog } from "@/components/CaptchaDialog";
import { CITIES_SP, generateInitialAvailability } from "@/data/cities";
import { toast } from "sonner";
import { AlertCircle, Upload, Check, Loader2, CreditCard, Building2, FileText, User, MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Tipos para o formulário
interface FormData {
  fullName: string;
  cpf: string;
  cnpj: string;
  birthDate: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  fixedLocation: string;
  intendedAddress: string;
  workScheduleType: string;
  customSchedule: {
    shift1Start: string;
    shift1End: string;
    shift2Start: string;
    shift2End: string;
  };
  documents: {
    name: string;
    size: number;
    type: string;
  }[];
  meiCertificate?: {
    name: string;
    size: number;
    type: string;
  };
}
const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cityAvailability, setCityAvailability] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showProtocol, setShowProtocol] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showScarcityDialog, setShowScarcityDialog] = useState(false);
  const [showCheckoutScarcityDialog, setShowCheckoutScarcityDialog] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    cpf: "",
    cnpj: "",
    birthDate: "",
    phone: "",
    email: "",
    state: "São Paulo",
    city: "",
    fixedLocation: "",
    intendedAddress: "",
    workScheduleType: "",
    customSchedule: {
      shift1Start: "",
      shift1End: "",
      shift2Start: "",
      shift2End: ""
    },
    documents: [],
    meiCertificate: undefined
  });

  // Inicializar disponibilidade de licenças
  useEffect(() => {
    setCityAvailability(generateInitialAvailability());
  }, []);

  // Mostrar popup de escassez no checkout (step 5)
  useEffect(() => {
    if (currentStep === 5) {
      const timer = setTimeout(() => {
        setShowCheckoutScarcityDialog(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Filtrar cidades conforme digitação
  useEffect(() => {
    if (citySearch.length > 0) {
      const filtered = CITIES_SP.filter(city => city.toLowerCase().includes(citySearch.toLowerCase()));
      const unique = Array.from(new Set(filtered)).slice(0, 10); // Garantir sem duplicados
      setFilteredCities(unique);
    } else {
      setFilteredCities([]);
    }
  }, [citySearch]);

  // Evitar que soltar arquivos na página redirecione ou abra o arquivo
  useEffect(() => {
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const events: Array<keyof DocumentEventMap> = ["dragenter", "dragover", "dragleave", "drop"];

    // Bloqueia em nível de window e document (captura) para garantir
    events.forEach(evt => {
      window.addEventListener(evt, preventDefaults, {
        capture: true
      });
      document.addEventListener(evt, preventDefaults, {
        capture: true
      });
    });
    return () => {
      events.forEach(evt => {
        window.removeEventListener(evt, preventDefaults, {
          capture: true
        } as any);
        document.removeEventListener(evt, preventDefaults, {
          capture: true
        } as any);
      });
    };
  }, []);

  // Validação de CPF
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, "");
    return cleanCPF.length === 11;
  };

  // Formatação de CPF
  const formatCPF = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  // Avançar para próxima etapa
  const handleNext = () => {
    // Validações por etapa
    if (currentStep === 1) {
      if (!formData.fullName || !formData.cpf || !formData.phone || !formData.email) {
        toast.error("Por favor, preencha todos os campos obrigatórios");
        return;
      }
      if (!validateCPF(formData.cpf)) {
        toast.error("CPF inválido");
        return;
      }
      // Verificar se o captcha foi resolvido
      if (!captchaVerified) {
        setShowCaptcha(true);
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.city) {
        toast.error("Por favor, selecione uma cidade");
        return;
      }
      if (!formData.fixedLocation) {
        toast.error("Por favor, informe se deseja lugar fixo");
        return;
      }
      if (!formData.intendedAddress) {
        toast.error("Por favor, informe onde pretende se localizar");
        return;
      }

      // Validar horário de trabalho
      if (formData.fixedLocation === "sim" && formData.workScheduleType === "personalizado") {
        const totalHours = calculateTotalHours();
        if (totalHours === 0) {
          toast.error("Por favor, defina seu horário de trabalho");
          return;
        }
        if (totalHours > 12) {
          toast.error("O total de horas diárias não pode ultrapassar 12h");
          return;
        }
      }
      if (formData.fixedLocation === "nao") {
        const totalHours = calculateTotalHours();
        if (totalHours === 0) {
          toast.error("Por favor, defina seu horário de atuação");
          return;
        }
        if (totalHours > 12) {
          toast.error("O total de horas diárias não pode ultrapassar 12h");
          return;
        }
      }

      // Simular verificação de disponibilidade
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
        toast.success("Licença disponível! Prossiga com o envio de documentos");
      }, 1500);
      return;
    }
    if (currentStep === 3) {
      // Exigem-se apenas 3 documentos obrigatórios (RG frente, RG verso, comprovante de residência)
      if (formData.documents.length < 3) {
        toast.error("Por favor, envie todos os documentos obrigatórios");
        return;
      }
      if (formData.cnpj && !formData.meiCertificate) {
        toast.error("Por favor, envie o Certificado MEI (obrigatório quando há CNPJ)");
        return;
      }

      // Simular validação de anexos
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }, 1500);
      return;
    }
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  // Voltar etapa
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  // Selecionar cidade
  const handleCitySelect = (city: string) => {
    // Só mostrar o dialog se for uma cidade diferente da atual
    const isDifferentCity = formData.city !== city;
    setFormData({
      ...formData,
      city
    });
    setCitySearch(city);
    setFilteredCities([]);
    setShowCityDropdown(false);
    if (isDifferentCity) {
      setShowScarcityDialog(true);
    }
  };

  // Calcular total de horas trabalhadas
  const calculateTotalHours = (): number => {
    let total = 0;
    if (formData.customSchedule.shift1Start && formData.customSchedule.shift1End) {
      const start1 = parseTime(formData.customSchedule.shift1Start);
      const end1 = parseTime(formData.customSchedule.shift1End);
      total += end1 - start1;
    }
    if (formData.customSchedule.shift2Start && formData.customSchedule.shift2End) {
      const start2 = parseTime(formData.customSchedule.shift2Start);
      const end2 = parseTime(formData.customSchedule.shift2End);
      total += end2 - start2;
    }
    return total;
  };

  // Converter hora para número decimal
  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };

  // Simular upload de arquivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isMei: boolean = false) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Simular upload
      setIsLoading(true);
      setTimeout(() => {
        const newDoc = {
          name: file.name,
          size: file.size,
          type: file.type
        };
        if (isMei) {
          setFormData({
            ...formData,
            meiCertificate: newDoc
          });
        } else {
          setFormData({
            ...formData,
            documents: [...formData.documents, newDoc]
          });
        }
        setIsLoading(false);
        toast.success(`✅ ${file.name} enviado com sucesso!`);
      }, 1000);
    }
  };

  // Simular pagamento
  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Gerar protocolo
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 9999) + 1000;
      const newProtocol = `SP-${randomNum}-${year}`;
      setProtocol(newProtocol);

      // Decrementar licenças (simulação front-end)
      if (formData.city && cityAvailability[formData.city]) {
        setCityAvailability({
          ...cityAvailability,
          [formData.city]: cityAvailability[formData.city] - 1
        });
      }
      setIsLoading(false);
      setShowProtocol(true);
      toast.success("Pagamento confirmado! Sua solicitação foi registrada.");
    }, 2000);
  };

  // Reiniciar formulário
  const handleReset = () => {
    setFormData({
      fullName: "",
      cpf: "",
      cnpj: "",
      birthDate: "",
      phone: "",
      email: "",
      state: "São Paulo",
      city: "",
      fixedLocation: "",
      intendedAddress: "",
      workScheduleType: "",
      customSchedule: {
        shift1Start: "",
        shift1End: "",
        shift2Start: "",
        shift2End: ""
      },
      documents: [],
      meiCertificate: undefined
    });
    setCurrentStep(1);
    setShowProtocol(false);
    setProtocol("");
    setCitySearch("");
    setCaptchaVerified(false);
    window.scrollTo(0, 0);
  };

  // Sucesso na verificação do captcha
  const handleCaptchaSuccess = () => {
    setCaptchaVerified(true);
    setShowCaptcha(false);
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  // Renderização condicional: Tela de sucesso
  if (showProtocol) {
    return <>
        <Header />
        <main className="gov-container py-12 min-h-[60vh]">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Solicitação Registrada com Sucesso!</h2>
            
            <div className="bg-muted p-6 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-2">Protocolo de Solicitação:</p>
              <p className="text-2xl font-mono font-bold text-primary">{protocol}</p>
            </div>

            <div className="space-y-3 text-left mb-8">
              <p className="text-muted-foreground">
                ✅ Comprovante enviado para: <strong>{formData.email}</strong>
              </p>
              <p className="text-muted-foreground">
                📋 Prazo de análise: <strong>até 7 dias úteis</strong>
              </p>
              <p className="text-muted-foreground">
                📧 O certificado digital será enviado por e-mail
              </p>
              <p className="text-muted-foreground">
                📦 A versão física será enviada para o endereço cadastrado
              </p>
            </div>

            <Button onClick={handleReset} size="lg" className="w-full">
              Fazer Nova Solicitação
            </Button>
          </Card>
        </main>
        <Footer />
      </>;
  }
  return <>
      <Header />
      
      {/* Popup ao selecionar cidade - mostra valor real */}
      <ScarcityDialog 
        isOpen={showScarcityDialog} 
        onClose={() => setShowScarcityDialog(false)} 
        cityName={formData.city}
        availableCount={(cityAvailability[formData.city] || 50) + 20}
      />
      
      {/* Popup antes do checkout - sempre mostra 5 */}
      <ScarcityDialog 
        isOpen={showCheckoutScarcityDialog} 
        onClose={() => setShowCheckoutScarcityDialog(false)} 
        cityName={formData.city}
      />

      <CaptchaDialog isOpen={showCaptcha} onClose={() => setShowCaptcha(false)} onSuccess={handleCaptchaSuccess} />
      
      <main className="gov-container py-4 md:py-8 px-4 min-h-[70vh]" onDrop={e => {
      e.preventDefault();
      e.stopPropagation();
    }} onDragOver={e => {
      e.preventDefault();
      e.stopPropagation();
    }}>
        {/* Barra de Progresso */}
        <ProgressBar currentStep={currentStep} totalSteps={5} />

        {/* ETAPA 1: Dados da Solicitação */}
        {currentStep === 1 && <Card className="max-w-3xl mx-auto p-4 md:p-8 animate-fade-in">
            {/* Texto principal */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{
            color: '#002776'
          }}>
                Solicitação de Licença para Trabalho Ambulante – São Paulo
              </h1>
              <p className="text-base md:text-lg" style={{
            color: '#555555'
          }}>
                Regularize sua atividade e obtenha sua licença para atuar legalmente nas vias públicas.
              </p>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Dados da Solicitação</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nome Completo *</Label>
                <Input id="fullName" value={formData.fullName} onChange={e => setFormData({
              ...formData,
              fullName: e.target.value
            })} placeholder="Digite seu nome completo" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" value={formData.cpf} onChange={e => setFormData({
                ...formData,
                cpf: formatCPF(e.target.value)
              })} placeholder="000.000.000-00" maxLength={14} required />
                </div>

                <div>
                  <Label htmlFor="cnpj">CNPJ (Opcional)</Label>
                  <Input id="cnpj" value={formData.cnpj} onChange={e => setFormData({
                ...formData,
                cnpj: e.target.value
              })} placeholder="00.000.000/0000-00" />
                </div>
              </div>

              <div>
                <Label htmlFor="birthDate">Data de Nascimento *</Label>
                <Input id="birthDate" type="date" value={formData.birthDate} onChange={e => setFormData({
              ...formData,
              birthDate: e.target.value
            })} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input id="phone" value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} placeholder="(11) 98765-4321" required />
                </div>

                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} placeholder="seuemail@exemplo.com" required />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={handleNext} size="lg" className="w-full md:w-auto">
                Avançar
              </Button>
            </div>
          </Card>}

        {/* ETAPA 2: Informações da Licença */}
        {currentStep === 2 && <Card className="max-w-3xl mx-auto p-4 md:p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Informações da Licença</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="state">Estado</Label>
                <Input id="state" value={formData.state} disabled className="bg-muted" />
              </div>

              <div>
                <Label htmlFor="city">Cidade *</Label>
                <div className="relative">
                  <Input id="city" value={citySearch} onChange={e => {
                setCitySearch(e.target.value);
                setShowCityDropdown(true);
              }} onFocus={() => setShowCityDropdown(true)} placeholder="Digite o nome da cidade..." autoComplete="off" />
                  
                  {/* Dropdown de autocomplete */}
                  {showCityDropdown && filteredCities.length > 0 && <div className="absolute z-50 w-full bg-popover border border-border rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
                      {filteredCities.map(city => <button type="button" key={city} onClick={() => handleCitySelect(city)} className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors text-sm md:text-base">
                          {city}
                        </button>)}
                    </div>}
                </div>
              </div>

              {/* Alerta de escassez após seleção */}
              {formData.city && <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-warning-foreground flex-shrink-0" />
                    <p className="font-semibold text-warning-foreground text-sm md:text-base">
                      Licenças disponíveis em {formData.city}: {(cityAvailability[formData.city] || 50) + 20}
                    </p>
                  </div>
                </div>}

              <div>
                <Label>Tipo de Licença *</Label>
                <RadioGroup value={formData.fixedLocation} onValueChange={value => setFormData({
              ...formData,
              fixedLocation: value,
              workScheduleType: ""
            })} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="fixed-yes" />
                    <Label htmlFor="fixed-yes" className="cursor-pointer font-normal">Local fixo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="fixed-no" />
                    <Label htmlFor="fixed-no" className="cursor-pointer font-normal">Sem local fixo (ambulante itinerante)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Horário de Trabalho */}
              {formData.fixedLocation && <div className="border border-border rounded-lg p-4 bg-muted/30">
                  <Label className="text-base font-semibold mb-3 block">Horário de Trabalho *</Label>
                  
                  {formData.fixedLocation === "sim" && <div className="space-y-4">
                      <RadioGroup value={formData.workScheduleType} onValueChange={value => setFormData({
                ...formData,
                workScheduleType: value
              })} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="comercial" id="schedule-comercial" />
                          <Label htmlFor="schedule-comercial" className="cursor-pointer font-normal">
                            Comercial — 08:00 às 18:00
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="personalizado" id="schedule-custom" />
                          <Label htmlFor="schedule-custom" className="cursor-pointer font-normal">
                            Personalizado — até 12h diárias
                          </Label>
                        </div>
                      </RadioGroup>

                      {formData.workScheduleType === "personalizado" && <div className="mt-4 space-y-4 pl-6 border-l-2 border-primary/30">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="shift1-start" className="text-sm">Turno 1 - Das</Label>
                              <Input id="shift1-start" type="time" value={formData.customSchedule.shift1Start} onChange={e => setFormData({
                      ...formData,
                      customSchedule: {
                        ...formData.customSchedule,
                        shift1Start: e.target.value
                      }
                    })} />
                            </div>
                            <div>
                              <Label htmlFor="shift1-end" className="text-sm">Até</Label>
                              <Input id="shift1-end" type="time" value={formData.customSchedule.shift1End} onChange={e => setFormData({
                      ...formData,
                      customSchedule: {
                        ...formData.customSchedule,
                        shift1End: e.target.value
                      }
                    })} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="shift2-start" className="text-sm">Turno 2 (opcional) - Das</Label>
                              <Input id="shift2-start" type="time" value={formData.customSchedule.shift2Start} onChange={e => setFormData({
                      ...formData,
                      customSchedule: {
                        ...formData.customSchedule,
                        shift2Start: e.target.value
                      }
                    })} />
                            </div>
                            <div>
                              <Label htmlFor="shift2-end" className="text-sm">Até</Label>
                              <Input id="shift2-end" type="time" value={formData.customSchedule.shift2End} onChange={e => setFormData({
                      ...formData,
                      customSchedule: {
                        ...formData.customSchedule,
                        shift2End: e.target.value
                      }
                    })} />
                            </div>
                          </div>

                          {calculateTotalHours() > 0 && <div className={`text-sm font-medium p-2 rounded ${calculateTotalHours() > 12 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                              Total: {calculateTotalHours().toFixed(1)} horas
                              {calculateTotalHours() > 12 && ' ⚠️ Excede o limite de 12h'}
                            </div>}
                        </div>}
                    </div>}

                  {formData.fixedLocation === "nao" && <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Defina seu horário de atuação (até 12h por dia)
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="shift1-start-mobile" className="text-sm">Turno 1 - Das</Label>
                          <Input id="shift1-start-mobile" type="time" value={formData.customSchedule.shift1Start} onChange={e => setFormData({
                    ...formData,
                    customSchedule: {
                      ...formData.customSchedule,
                      shift1Start: e.target.value
                    }
                  })} />
                        </div>
                        <div>
                          <Label htmlFor="shift1-end-mobile" className="text-sm">Até</Label>
                          <Input id="shift1-end-mobile" type="time" value={formData.customSchedule.shift1End} onChange={e => setFormData({
                    ...formData,
                    customSchedule: {
                      ...formData.customSchedule,
                      shift1End: e.target.value
                    }
                  })} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="shift2-start-mobile" className="text-sm">Turno 2 (opcional) - Das</Label>
                          <Input id="shift2-start-mobile" type="time" value={formData.customSchedule.shift2Start} onChange={e => setFormData({
                    ...formData,
                    customSchedule: {
                      ...formData.customSchedule,
                      shift2Start: e.target.value
                    }
                  })} />
                        </div>
                        <div>
                          <Label htmlFor="shift2-end-mobile" className="text-sm">Até</Label>
                          <Input id="shift2-end-mobile" type="time" value={formData.customSchedule.shift2End} onChange={e => setFormData({
                    ...formData,
                    customSchedule: {
                      ...formData.customSchedule,
                      shift2End: e.target.value
                    }
                  })} />
                        </div>
                      </div>

                      {calculateTotalHours() > 0 && <div className={`text-sm font-medium p-2 rounded ${calculateTotalHours() > 12 ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                          Total: {calculateTotalHours().toFixed(1)} horas
                          {calculateTotalHours() > 12 && ' ⚠️ Excede o limite de 12h'}
                        </div>}
                    </div>}

                  <p className="text-xs text-muted-foreground mt-3 italic">
                    ℹ️ A jornada máxima permitida é de 12 horas diárias, podendo ser dividida em até dois períodos.
                  </p>
                </div>}

              <div>
                <Label htmlFor="intendedAddress">Onde pretende se localizar? *</Label>
                <Input id="intendedAddress" value={formData.intendedAddress} onChange={e => setFormData({
              ...formData,
              intendedAddress: e.target.value
            })} placeholder="Ex: Rua Augusta, Centro, próximo à estação do metrô..." required />
                <p className="text-xs text-muted-foreground mt-1">
                  Informe o endereço ou região onde pretende exercer a atividade
                </p>
              </div>
            </div>

            {isLoading && <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>🔄 Verificando disponibilidade de licenças...</span>
              </div>}

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
              <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto">
                Voltar
              </Button>
              <Button onClick={handleNext} disabled={!formData.city || !formData.fixedLocation || !formData.intendedAddress || isLoading} className="w-full sm:w-auto">
                Avançar para Envio de Documentos
              </Button>
            </div>
          </Card>}

        {/* ETAPA 3: Envio de Documentos */}
        {currentStep === 3 && <Card className="max-w-3xl mx-auto p-4 md:p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Envio de Documentos Obrigatórios</h2>
            </div>

            {/* Contador ajustado para faixa da Etapa 3 */}
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 md:p-4 mb-6">
              <p className="text-center font-semibold text-warning-foreground text-sm md:text-base">
                ⚠️ Restam {Math.floor((cityAvailability[formData.city] || 50) * 0.75)} licenças disponíveis para {formData.city}
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <Label className="flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  Documento de Identidade (RG ou CNH) - Frente *
                </Label>
                <Input type="file" onChange={e => handleFileUpload(e, false)} />
              </div>

              <div className="border border-border rounded-lg p-4">
                <Label className="flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  Documento de Identidade (RG ou CNH) - Verso *
                </Label>
                <Input type="file" onChange={e => handleFileUpload(e, false)} />
              </div>

              <div className="border border-border rounded-lg p-4">
                <Label className="flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  Comprovante de Residência (últimos 90 dias) *
                </Label>
                <Input type="file" onChange={e => handleFileUpload(e, false)} />
              </div>

              <div className="border border-border rounded-lg p-4 bg-muted/30">
                <Label className="flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  Foto do Ponto de Venda / Carrinho (opcional)
                </Label>
                <Input type="file" onChange={e => handleFileUpload(e, false)} />
                <p className="text-xs text-muted-foreground mt-2">
                  ℹ️ Caso a sua licença seja aprovada, será solicitado o envio desta foto
                </p>
              </div>

              {formData.cnpj && <div className={`border rounded-lg p-4 ${formData.meiCertificate ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'}`}>
                  <Label className="flex items-center gap-2 mb-2">
                    <Upload className="w-4 h-4" />
                    Certificado MEI *
                  </Label>
                  <Input type="file" onChange={e => handleFileUpload(e, true)} required />
                  <p className="text-xs text-muted-foreground mt-2">
                    ⚠️ Obrigatório quando há CNPJ informado
                  </p>
                  {formData.meiCertificate && <div className="flex items-center gap-2 text-sm bg-success/10 p-2 rounded mt-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>{formData.meiCertificate.name}</span>
                    </div>}
                </div>}

              {/* Documentos enviados */}
              {formData.documents.length > 0 && <div className="mt-4 space-y-2">
                  <p className="font-semibold">Documentos enviados:</p>
                  {formData.documents.map((doc, index) => <div key={index} className="flex items-center gap-2 text-sm bg-success/10 p-2 rounded">
                      <Check className="w-4 h-4 text-success" />
                      <span>{doc.name}</span>
                      <span className="text-muted-foreground">({(doc.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>)}
                </div>}
            </div>

            {isLoading && <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>🔄 Validando anexos e preparando dados...</span>
              </div>}

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
              <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto">
                Voltar
              </Button>
              <Button onClick={handleNext} disabled={formData.documents.length < 3 || isLoading} className="w-full sm:w-auto">
                Avançar para Revisão
              </Button>
            </div>
          </Card>}

        {/* ETAPA 4: Revisão */}
        {currentStep === 4 && <Card className="max-w-3xl mx-auto p-4 md:p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Revisão dos Dados</h2>
            </div>

            {/* Alerta de escassez fixo */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 md:p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-destructive flex-shrink-0" />
                <p className="font-semibold text-destructive text-sm md:text-base">
                  🚨 Restam apenas 13 licenças disponíveis para {formData.city}!
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Dados Pessoais */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Nome:</span>
                    <p className="font-medium">{formData.fullName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CPF:</span>
                    <p className="font-medium">{formData.cpf}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Telefone:</span>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                </div>
              </div>

              {/* Localização */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">Localização</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Estado:</span>
                    <p className="font-medium">{formData.state}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cidade:</span>
                    <p className="font-medium">{formData.city}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tipo de licença:</span>
                    <p className="font-medium">{formData.fixedLocation === "sim" ? "Local fixo" : "Sem local fixo (ambulante)"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium">
                      {formData.fixedLocation === "sim" && formData.workScheduleType === "comercial" && "Comercial (08:00-18:00)"}
                      {formData.fixedLocation === "sim" && formData.workScheduleType === "personalizado" && `Personalizado (${calculateTotalHours().toFixed(1)}h diárias)`}
                      {formData.fixedLocation === "nao" && `${calculateTotalHours().toFixed(1)}h diárias`}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-muted-foreground">Localização pretendida:</span>
                    <p className="font-medium">{formData.intendedAddress}</p>
                  </div>
                </div>
              </div>

              {/* Documentos */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">Documentos Enviados</h3>
                <div className="space-y-2">
                  {formData.documents.map((doc, index) => <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-success" />
                      <span>{doc.name}</span>
                    </div>)}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
              <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto">
                Voltar e Editar
              </Button>
              <Button onClick={handleNext} className="w-full sm:w-auto">
                Confirmar e Prosseguir
              </Button>
            </div>
          </Card>}

        {/* ETAPA 5: Pagamento */}
        {currentStep === 5 && <Card className="max-w-3xl mx-auto p-4 md:p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Pagamento</h2>
            </div>

            {/* Contagem crítica */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 md:p-4 mb-6">
              <p className="text-center font-bold text-destructive text-base md:text-lg">
                🚨 ATENÇÃO: Restam apenas 5 licenças disponíveis!
              </p>
            </div>

            {/* Explicação */}
            <div className="bg-muted p-6 rounded-lg mb-6 space-y-3">
              <p className="text-sm">
                Para concluir sua solicitação, realize o pagamento da taxa de emissão da licença.
              </p>
              <p className="text-sm">
                📋 Após confirmação do pagamento, a solicitação será analisada em <strong>até 7 dias úteis</strong>.
              </p>
              <p className="text-sm">
                📧 O certificado digital será enviado por e-mail e a versão física será enviada para o endereço cadastrado.
              </p>
            </div>

            {/* Valor */}
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-2">Taxa única de emissão</p>
              <p className="text-4xl md:text-5xl font-bold text-primary">R$ 79,00</p>
            </div>

            {/* Selo de segurança */}
            <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <Lock className="w-6 h-6 text-success" />
              <div>
                <p className="font-semibold text-success">🔒 Sistema Seguro</p>
                <p className="text-sm text-muted-foreground">Verificado por PortalSP</p>
              </div>
            </div>

            {/* Opções de pagamento (simulação) */}
            

            {isLoading && <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processando pagamento...</span>
              </div>}

            {/* Botão principal */}
            <Button onClick={handlePayment} size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processando...
                </> : <>Confirmar e Prosseguir</>}
            </Button>

            <div className="mt-6 flex justify-start">
              <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto">
                Voltar
              </Button>
            </div>
          </Card>}
      </main>

      <Footer />
    </>;
};
export default Index;
