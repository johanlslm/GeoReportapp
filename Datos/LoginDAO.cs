using arciait.Conexion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Modelos;
using arciait.Adaptador;
using System.Data.SqlClient;

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
                ContenedorLogin.LoginUsuarioDto = BaseAdapter.ConvertirLista<LoginUsuarioDTO>(Result.Tables[1]).Count > 0 ? BaseAdapter.ConvertirLista<LoginUsuarioDTO>(Result.Tables[1])[0] : new LoginUsuarioDTO();



                return ContenedorLogin;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Int32 RegistroLoginEvent(String nombres, String apellidos, String correo, String pass1 ,String pass2)
        {
            try
            {
                var con = new Conexion();
                con.parametros.AddWithValue("@NombreUsuario", nombres);
                con.parametros.AddWithValue("@ApellidoUsuario", apellidos);
                con.parametros.AddWithValue("@CorreoUsuario", correo);
                con.parametros.AddWithValue("@ContraseñaUsuario", pass1);
                con.parametros.AddWithValue("@Contraseña2Usuario", pass2);

                var Result = con.ejecutarSP("spRegistroLoginEvent");

               int Respuesta = (Int32)Result.Tables[0].Rows[0][0];

               return Respuesta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ResetPassDTO LoginRecoverPassword(String correo)
        {
            try
            {
                var con = new Conexion();
                con.parametros.AddWithValue("@CorreoUsuario", correo);
                var resp = con.ejecutarSP<ResetPassDTO>("spLoginRecoverPassword");
                return resp.Count > 0 ? resp[0] : new ResetPassDTO();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


    }

}
