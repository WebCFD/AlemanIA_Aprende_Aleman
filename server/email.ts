import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

// Interfaz para el cuerpo de la solicitud de feedback
interface FeedbackRequest {
  email: string;
  message: string;
}

// Configuración del servicio de correo
// Para entornos de producción, se recomienda usar variables de entorno
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'tu-email@gmail.com', // Esto debe ser configurado con un email real
    pass: process.env.EMAIL_PASS || 'tu-contraseña-de-aplicación', // Esto debe ser una contraseña de aplicación
  },
});

// Destino para los emails de feedback
const FEEDBACK_EMAIL = 'pulpormrm@gmail.com';

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

    // Configuración del email
    const mailOptions = {
      from: `"Alemanía App" <${process.env.EMAIL_USER || 'alemania-app@noreply.com'}>`,
      to: FEEDBACK_EMAIL,
      subject: `Nuevo feedback de ${email}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4A6FA5;">Nuevo Feedback - Alemanía</h2>
          <p><strong>De:</strong> ${email}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4A6FA5; margin: 20px 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #888; font-size: 12px;">Este mensaje fue enviado desde la aplicación Alemanía.</p>
        </div>
      `,
    };

    // Intenta enviar el email
    await transporter.sendMail(mailOptions);

    // Responde con éxito
    return res.status(200).json({ 
      success: true, 
      message: 'Feedback enviado correctamente' 
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