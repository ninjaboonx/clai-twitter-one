"use client"

// This is a compatibility wrapper to ensure all imports work correctly
import { useToast as useToastOriginal, toast } from "@/components/ui/use-toast"

export function useToast() {
  return useToastOriginal()
}

export { toast }
