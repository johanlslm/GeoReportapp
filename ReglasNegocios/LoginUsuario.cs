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
        public int LoginUsuarioR(LoginUsuarioDTO loginUsuario) {
            return new LoginDAO().LoginUsuario(loginUsuario);
        }
    }
}
