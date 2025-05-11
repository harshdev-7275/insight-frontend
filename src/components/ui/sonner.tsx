import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group bg-[#1A1B25] text-white border border-[#2A2A35]"
      {...props}
    />
  )
}

export { Toaster }
