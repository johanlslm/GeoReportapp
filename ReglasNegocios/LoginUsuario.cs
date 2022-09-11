using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Modelos;
using Datos;

namespace ReglasNegocios
{
    public class LoginUsuario
    {
        public ContenedorLoginDTO IngresarLoginEvent(String correo, String Pass)
        {
            try
            {
                return new LoginDAO().IngresarLoginEvent(correo, Pass);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
