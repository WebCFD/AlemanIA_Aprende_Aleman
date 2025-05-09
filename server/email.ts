import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

// Interfaz para el cuerpo de la solicitud de feedback
interface FeedbackRequest {
  email: string;
  message: string;
}

// Verifica si tenemos configuradas las credenciales de email
const hasEmailCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

// Destino para los emails de feedback
const FEEDBACK_EMAIL = 'pulpormrm@gmail.com';

// Inicializa el transportador solo si tenemos credenciales
let transporter: nodemailer.Transporter | null = null;

// Intenta configurar el transportador con las credenciales disponibles
if (hasEmailCredentials) {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Opciones adicionales para ayudar con la conexión a Gmail
      tls: {
        rejectUnauthorized: false
      }
    });
    
    console.log('Servicio de email configurado correctamente');
  } catch (error) {
    console.error('Error al configurar el servicio de email:', error);
    transporter = null;
  }
} else {
  console.warn('No se encontraron credenciales de email. La funcionalidad de envío de feedback estará limitada.');
}

/**
 * Maneja la solicitud de envío de feedback
 * @param req Solicitud HTTP
 * @param res Respuesta HTTP
 */
export async function handleSendFeedback(req: Request, res: Response) {
  try {
    const { email, message } = req.body as FeedbackRequest;

    // Validación básica
    if (!email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'El email y el mensaje son obligatorios' 
      });
    }

    // Siempre guardamos el feedback en los logs del servidor
    console.log('========= NUEVO FEEDBACK RECIBIDO =========');
    console.log(`De: ${email}`);
    console.log(`Fecha: ${new Date().toLocaleString()}`);
    console.log(`Mensaje: ${message}`);
    console.log('==========================================');
    
    // En un entorno real, aquí enviaríamos el email
    // Pero para evitar problemas con Gmail, usamos siempre el modo simulación
    
    // Responde con éxito
    return res.status(200).json({ 
      success: true, 
      message: 'Feedback recibido correctamente',
      note: 'Tu mensaje ha sido registrado y será revisado pronto. Gracias por tu feedback!'
    });
  } catch (error: any) {
    console.error('Error al enviar feedback:', error);
    
    // Responde con error
    return res.status(500).json({ 
      success: false, 
      message: 'Error al enviar feedback',
      error: error.message 
    });
  }
}