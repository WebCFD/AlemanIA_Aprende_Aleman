import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

// Interfaz para el cuerpo de la solicitud de feedback
interface FeedbackRequest {
  email: string;
  message: string;
}

// Destino para los emails de feedback
const FEEDBACK_EMAIL = 'pulpormrm@gmail.com';

// Configuración más robusta para Gmail
const transporterConfig = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Configuración adicional para mejorar compatibilidad con Gmail
  tls: {
    rejectUnauthorized: false // Ignora errores de certificado
  }
};

// Configura el transporter para enviar emails
const transporter = nodemailer.createTransport(transporterConfig);

// Verificar la configuración del transporter al inicio
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error al configurar el transporter de email:', error);
  } else {
    console.log('Servidor de email listo para enviar mensajes');
  }
});

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

    // Registramos el feedback en los logs como respaldo
    console.log('========= NUEVO FEEDBACK RECIBIDO =========');
    console.log(`De: ${email}`);
    console.log(`Fecha: ${new Date().toLocaleString()}`);
    console.log(`Mensaje: ${message}`);
    console.log('==========================================');
    
    // Configuración del email a enviar
    const mailOptions = {
      from: `"Alemanía App" <${process.env.EMAIL_USER}>`,
      to: FEEDBACK_EMAIL,
      subject: `Nuevo feedback de ${email}`,
      text: `De: ${email}\n\nMensaje: ${message}`,
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
    
    try {
      // Intenta enviar el email
      await transporter.sendMail(mailOptions);
      
      // Si el envío fue exitoso, responde con éxito
      return res.status(200).json({ 
        success: true, 
        message: 'Feedback enviado correctamente',
        note: 'Tu mensaje ha sido enviado y será revisado pronto. ¡Gracias por tu feedback!'
      });
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      
      // Si falla el envío de email, respondemos con simulación
      return res.status(200).json({ 
        success: true, 
        message: 'Feedback recibido correctamente (modo respaldo)',
        note: 'Tu mensaje ha sido registrado en nuestro sistema. Gracias por tu feedback!'
      });
    }
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