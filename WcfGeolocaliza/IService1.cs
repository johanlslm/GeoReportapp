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

    }
}
