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
      <canvas ref={canvasRef} />
      <p className="text-xs text-gray-400 mt-2">Scan to join</p>
    </div>
  )
}
