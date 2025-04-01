"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ContactButtonProps {
  email: string
}

export default function ContactButton({ email }: ContactButtonProps) {
  const { toast } = useToast()
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    window.location.href = `mailto:${email}`

    if (!clicked) {
      setClicked(true)
      toast({
        title: "Thanks for reaching out!",
        description: "I'll get back to you as soon as possible.",
        className: "bg-white border border-slate-200 shadow-md",
      })
    }
  }

  return (
    <button onClick={handleClick} className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
      <Mail className="mr-1 h-4 w-4" />
      <span>Email</span>
    </button>
  )
}

