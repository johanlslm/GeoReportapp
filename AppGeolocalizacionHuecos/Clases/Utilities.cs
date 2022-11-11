using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;


namespace AppGeolocalizacionHuecos.Clases
{
    public class Utilities
    {
        public static CultureInfo culinf = new CultureInfo("es-CO");
        public static bool enviaCorreo(string usuario, string mensaje, bool copia = false, string correocopia = "", string Asunto = "Cooinpaz")
        {

            var resp = false;
            //Creamos un nuevo Objeto de mensaje
            System.Net.Mail.MailMessage mmsg = new System.Net.Mail.MailMessage();

            //Direccion de correo electronico a la que queremos enviar el mensaje
            // mmsg.To.Add("destinatario@servidordominio.com");
            // mmsg.To.Add("alexcandelo1@gmail.com");
            mmsg.To.Add(usuario.ToString());

            //mmsg.To.Add("cramirez.emmblema@emmblema.com");
            //mmsg.To.Add("dmedina@emmblema.com");
            //Nota: La propiedad To es una colección que permite enviar el mensaje a más de un destinatario

            //Asunto
            mmsg.Subject = Asunto;
            mmsg.SubjectEncoding = System.Text.Encoding.UTF8;

            //Direccion de correo electronico que queremos que reciba una copia del mensaje
            if (copia)
            {
                mmsg.Bcc.Add(correocopia); //Opcional
            }


            //Cuerpo del Mensaje
            mmsg.Body = mensaje;
            mmsg.BodyEncoding = System.Text.Encoding.UTF8;
            mmsg.IsBodyHtml = true; //Si no queremos que se envíe como HTML

            //Correo electronico desde la que enviamos el mensaje
            //mmsg.From = new System.Net.Mail.MailAddress("micuenta@servidordominio.com");
            mmsg.From = new System.Net.Mail.MailAddress("servicioalcliente@ofertshop.com");

            /*-------------------------CLIENTE DE CORREO----------------------*/

            //Creamos un objeto de cliente de correo
            System.Net.Mail.SmtpClient cliente = new System.Net.Mail.SmtpClient();

            //Hay que crear las credenciales del correo emisor
            cliente.Credentials =
            //new System.Net.NetworkCredential("micuenta@servidordominio.com", "micontraseña");
              new System.Net.NetworkCredential("servicioalcliente@ofertshop.com", "Koj78375");
            //new System.Net.NetworkCredential("servicioalcliente@cooinpaz.com", "Descuentos1500*");

            //Lo siguiente es obligatorio si enviamos el mensaje desde Gmail
            /*
            cliente.Port = 587;
            cliente.EnableSsl = true;

             * Correo - SSL Outgoing Server Name: smtp.zoho.com Nombre del servidor saliente: smtp.zoho.com
             * Port: 465 Puerto: 465 Security
             * Type: SSL Tipo de seguridad: SSL Require Authentication: Yes. Requerir autenticación: Sí. -
            */
            cliente.Port = 587;
            cliente.EnableSsl = true;
            //cliente.
            cliente.Host = "smtp.office365.com"; //Para Gmail "smtp.gmail.com";
            cliente.Timeout = 10000;
            /*-------------------------ENVIO DE CORREO----------------------*/


            try
            {
                cliente.Send(mmsg);
                resp = true;
            }
#pragma warning disable CS0168 // La variable 'ex' se ha declarado pero nunca se usa
            catch (System.Net.Mail.SmtpException ex)
#pragma warning restore CS0168 // La variable 'ex' se ha declarado pero nunca se usa
            {
                resp = false;
            }

            return resp;
        }


    }
}