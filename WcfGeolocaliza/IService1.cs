using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using Modelos;

namespace WcfGeolocaliza
{
    [ServiceContract]
    public interface IService1
    {
        [OperationContract]
        ContenedorLoginDTO IngresarLoginEvent(String correo, String Pass);

        [OperationContract]
        Int32 RegistroLoginEvent(String nombres, String apellidos, String correo, String pass1, String pass2);
        [OperationContract]
        ResetPassDTO LoginRecoverPassword(String correo);
        [OperationContract]
        Int32 ChangePasswordEvent(String Pass1, String Pass2, Int64 idUser);

        [OperationContract]
        Int32 GenerarReporteEvent(String LatVal, String LngVal, String DirVal, Int32 TipVal, String URLVal, String DescVal, Int64 UserVal);
        [OperationContract]
        List<ReporteHuecoDTO> ConsultaReportesUsuario(Int64 id_Usuario);

        [OperationContract]
        Int32 ActualizacionEstadoRegistro(Int64 id_Registro, int tipoA);

        [OperationContract]
        List<ReporteGeneralDTO> ConsultaReporteGeneral();

        [OperationContract]
        ReporteConsulta ConsultaReporteGeneralDatos();

        [OperationContract]
        Int32 RegistroInteraccion(Int64 IdRegistro, Int64 UserVal, int TipoLike);
    }
}
