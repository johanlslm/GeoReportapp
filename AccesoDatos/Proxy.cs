using System;

namespace AccesoDatos
{
    public class Proxy
    {
        public static srvGeoLocalizacion.IService1 obtenerServicioDistribuidoGeneral()
        {
            try
            {
                srvGeoLocalizacion.IService1 srv = new srvGeoLocalizacion.Service1Client();
                return srv;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
