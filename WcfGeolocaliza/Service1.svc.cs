using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using Modelos;
using ReglasNegocios;

namespace WcfGeolocaliza
{

    public class Service1 : IService1
    {
        public ContenedorLoginDTO IngresarLoginEvent(String correo, String Pass)
        {
            try
            {
                return new LoginUsuario().IngresarLoginEvent(correo, Pass);

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
                return new LoginUsuario().RegistroLoginEvent(nombres, apellidos, correo, pass1, pass2);
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
                return new LoginUsuario().LoginRecoverPassword(correo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int32 ChangePasswordEvent(String Pass1, String Pass2, Int64 idUser)
        {
            try
            {
                return new LoginUsuario().ChangePasswordEvent(Pass1, Pass2, idUser);
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
                return new LoginUsuario().GenerarReporteEvent(LatVal, LngVal, DirVal, TipVal, URLVal, DescVal, UserVal);
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
                return new LoginUsuario().ConsultaReportesUsuario(id_Usuario);
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
                return new LoginUsuario().ActualizacionEstadoRegistro(id_Registro, tipoA);
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
                return new LoginUsuario().ConsultaReporteGeneral();
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
                return new LoginUsuario().ConsultaReporteGeneralDatos();
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
                return new LoginUsuario().RegistroInteraccion(IdRegistro, UserVal, TipoLike);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
