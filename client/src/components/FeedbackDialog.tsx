import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Define el esquema de validación
const feedbackSchema = z.object({
  email: z.string().email("Por favor, introduce un email válido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  notRobot: z.boolean().refine(val => val === true, {
    message: "Por favor, confirma que no eres un robot",
  }),
});

// Tipo inferido del esquema
type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FeedbackDialog({ open, onOpenChange }: FeedbackDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Configurar el formulario
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: "",
      message: "",
      notRobot: false,
    },
  });
  
  // Función que se ejecuta cuando se envía el formulario
  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Enviamos el feedback al servidor
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          message: data.message,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar feedback');
      }
      
      toast({
        title: "¡Gracias por tu feedback!",
        description: "Hemos recibido tu mensaje correctamente.",
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error al enviar feedback:', error);
      
      toast({
        title: "Error al enviar",
        description: error.message || "No pudimos enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-[#4A6FA5]">Tu feedback nos interesa</DialogTitle>
          <DialogDescription className="text-center">
            Comparte tus sugerencias, reporta errores o simplemente cuéntanos qué te parece la aplicación
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu email de contacto</FormLabel>
                  <FormControl>
                    <Input placeholder="ejemplo@correo.com" {...field} />
                  </FormControl>
                  <p className="text-sm text-gray-500">Introduce tu email para que podamos responderte</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu mensaje</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Escribe aquí tu feedback, sugerencia o reporte..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notRobot"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 my-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Confirmo que no soy un robot y acepto el envío de este mensaje</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="submit" 
                className="w-full bg-[#4A6FA5] hover:bg-[#395888]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar feedback"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}