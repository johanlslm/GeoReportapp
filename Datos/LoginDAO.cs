using arciait.Conexion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Modelos; 

namespace Datos
{
    public class LoginDAO
    {
        public int LoginUsuario(LoginUsuarioDTO loginUsuario)
        {
            var con = new Conexion();
            con.parametros.AddWithValue("@CorreoUsuario", loginUsuario.Correo);
            con.parametros.AddWithValue("@UsuarioRegistro", loginUsuario.Contrasena);
            //var retorno = new SqlParameter();
            //retorno = con.parametros.AddWithValue("@Result", 0);
            //var resp = con.ejecutarSPconParRetorno("spSorteo_Guardar", resultado);
            var resp = con.ejecutarSP("spLoginUsuario");
            return Convert.ToInt32(resp);
        }
    }
}
