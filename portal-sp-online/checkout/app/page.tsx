"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const [state, setState] = useState("initial")
  const [qrCode, setQrCode] = useState("")
  const [pixCode, setPixCode] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [timeLeft, setTimeLeft] = useState(600)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (state !== "qr_code") return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateQRCode()
          return 600
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [state])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const generateQRCode = async () => {
    setState("loading")
    try {
      const response = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 79.0 }),
      })

      if (!response.ok) throw new Error("Falha ao gerar QR Code")

      const data = await response.json()
      setPixCode(data.qr_code)
      setTransactionId(data.id)
      setState("qr_code")
      setTimeLeft(600)
    } catch (error) {
      console.error("[v0] Error:", error)
      setState("error")
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[v0] Copy error:", error)
    }
  }

  const goToSuccess = () => {
    router.push("/sucesso")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 shadow-sm">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">Finalizar pagamento via PIX</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          {/* Initial State */}
          {state === "initial" && (
            <div className="space-y-6">
              <p className="text-gray-700 text-center">
                Clique no botão abaixo para gerar o código PIX e realizar o pagamento.
              </p>
              <button
                onClick={generateQRCode}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                Gerar QR Code PIX
              </button>
              <p className="text-sm text-gray-500 text-center">
                Valor: <span className="font-semibold">R$ 79,00</span>
              </p>
            </div>
          )}

          {/* Loading State */}
          {state === "loading" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-700">Gerando QR Code...</p>
            </div>
          )}

          {/* QR Code State */}
          {state === "qr_code" && (
            <div className="space-y-6">
              {/* Timer */}
              <div
                className={`text-center p-4 rounded-lg font-semibold text-lg ${timeLeft > 60 ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"}`}
              >
                Expira em: {formatTime(timeLeft)}
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCode)}`}
                  alt="QR Code PIX"
                  className="w-64 h-64 border-2 border-gray-200 rounded-lg"
                />
              </div>

              {/* Código PIX */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600 text-center">Código PIX:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixCode}
                    readOnly
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg font-mono text-sm bg-gray-50"
                  />
                  <button
                    onClick={copyCode}
                    className={`px-4 py-3 rounded-lg font-semibold transition ${copied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                  >
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>

              {/* Status */}
              <p className="text-sm text-gray-600 text-center">Aguardando confirmação do pagamento…</p>

              <button
                onClick={goToSuccess}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                Já realizei o pagamento
              </button>

              {/* Value */}
              <p className="text-sm text-gray-500 text-center">
                Valor: <span className="font-semibold">R$ 79,00</span>
              </p>
            </div>
          )}

          {/* Error State */}
          {state === "error" && (
            <div className="space-y-4">
              <p className="text-red-600 text-center font-semibold">Erro ao gerar QR Code</p>
              <button
                onClick={generateQRCode}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 py-3 px-4 text-center text-xxs text-gray-600">
        <p className="leading-tight">
          © 2025 Governo do Estado de São Paulo – Prefeitura Municipal. Todos os direitos reservados. Portal oficial
          para emissão e regularização de licenças municipais. Ambiente seguro e criptografado – GOV.SP
        </p>
      </div>
    </div>
  )
}
