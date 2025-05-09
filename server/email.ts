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

    // Verifica si el transportador está disponible
    if (!transporter) {
      console.log('Guardando feedback localmente (sin envío de email):', {
        from: email,
        message: message,
        date: new Date().toISOString()
      });
      
      // Responde con éxito aunque no se haya enviado el email
      return res.status(200).json({ 
        success: true, 
        message: 'Feedback recibido correctamente (modo simulación)',
        note: 'El email no ha sido enviado debido a problemas de configuración, pero el feedback ha sido registrado'
      });
    }
    
    // Intenta enviar el email si el transportador está disponible
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