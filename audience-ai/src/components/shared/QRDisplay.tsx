"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

export default function QRDisplay({ code }: { code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const url = `${window.location.origin}/join/${code}`
    QRCode.toCanvas(canvasRef.current, url, { width: 200 })
  }, [code])

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} />
      <p className="text-xs text-gray-400 mt-2">Scan to join</p>
    </div>
  )
}
