using arciait.Conexion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Modelos;
using arciait.Adaptador;

namespace Datos
{
    public class LoginDAO {
        public ContenedorLoginDTO IngresarLoginEvent(String correo, String Pass)
        {
            try
            {
                var ContenedorLogin = new ContenedorLoginDTO();
                var con = new Conexion();
                con.parametros.AddWithValue("@CorreoUserVal", correo);
                con.parametros.AddWithValue("@PassUserVal", Pass);
                var Result = con.ejecutarSP("spIngresarLoginEvent");
                ContenedorLogin.Respuesta = (Int32)Result.Tables[0].Rows[0][0];
                ContenedorLogin.LoginUsuarioDto = BaseAdapter.ConvertirLista<LoginUsuarioDTO>(Result.Tables[1]).Count > 0 ? BaseAdapter.ConvertirLista<LoginUsuarioDTO>(Result.Tables[0])[0] : new LoginUsuarioDTO();



                return ContenedorLogin;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}
