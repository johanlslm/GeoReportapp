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
        public Int32 RegistroLoginEvent(String nombres, String apellidos, String correo, String pass1, String pass2)
        {
            try
            {
                return new LoginDAO().RegistroLoginEvent(nombres, apellidos, correo, pass1, pass2);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Int32 LoginRecoverPassword(String correo)
        {
            try
            {
                var RespuestaSP = new LoginDAO().LoginRecoverPassword(correo);

                return RespuestaSP.Respuesta;
            }
            catch (Exception ex) {
                throw ex;
            }
        }

        public Int32 ChangePasswordEvent(String Pass1, String Pass2, Int64 idUser) {
            try
            {
                return new LoginDAO().ChangePasswordEvent(Pass1, Pass2, idUser);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int32 GenerarReporteEvent(String LatVal, String LngVal, String DirVal, Int32 TipVal, String URLVal, String DescVal, Int64 UserVal)
        {

            try
            {
                return new LoginDAO().GenerarReporteEvent(LatVal, LngVal, DirVal, TipVal, URLVal, DescVal, UserVal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
