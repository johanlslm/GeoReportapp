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

        public ResetPassDTO LoginRecoverPassword(String correo)
        {
            try
            {
                return new LoginDAO().LoginRecoverPassword(correo);
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
        public List<ReporteHuecoDTO> ConsultaReportesUsuario(Int64 id_Usuario)
        {

            try
            {
                return new LoginDAO().ConsultaReportesUsuario(id_Usuario);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ReporteHuecoDTO> ConsultaReportesGeneralAdm()
        {

            try
            {
                return new LoginDAO().ConsultaReportesGeneralAdm();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int32 ActualizacionEstadoRegistro(Int64 id_Registro, int tipoA)
        {
            try
            {
                return new LoginDAO().ActualizacionEstadoRegistro(id_Registro, tipoA);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<ReporteGeneralDTO> ConsultaReporteGeneral()
        {
            try
            {
                return new LoginDAO().ConsultaReporteGeneral();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public ReporteConsulta ConsultaReporteGeneralDatos()
        {
            try
            {
                return new LoginDAO().ConsultaReporteGeneralDatos();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public Int32 RegistroInteraccion(Int64 IdRegistro, Int64 UserVal, int TipoLike)
        {
            try
            {
                return new LoginDAO().RegistroInteraccion(IdRegistro, UserVal, TipoLike);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
