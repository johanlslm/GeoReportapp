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
    }
}
