"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

export default function QRDisplay({ code }: { code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    if (!code || code === "...") {
      console.warn("QRDisplay: No code provided yet.")
      return
    }
    
    // Sanitize code: remove null characters or weird binary artifacts
    const cleanCode = String(code).replace(/\0/g, "").trim()
    
    if (cleanCode === "undefined" || cleanCode === "null") {
      console.error("QRDisplay: Invalid code received:", code)
      return
    }

    const url = `${window.location.origin}/join/${cleanCode}`
    
    console.log("Generating QR for:", url)
    QRCode.toCanvas(canvasRef.current, url, { 
      width: 250,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff"
      }
    }, (err) => {
      if (err) console.error("QRCode Error:", err)
    })
  }, [code])

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/50 mb-3">
        <canvas ref={canvasRef} />
      </div>
      <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 max-w-[200px] overflow-hidden">
        <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 truncate text-center">
          {code && code !== "..." ? `${window.location.origin}/join/${code.trim().toUpperCase()}` : "Generating link..."}
        </p>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-3">Scan to join</p>
    </div>
  )
}
