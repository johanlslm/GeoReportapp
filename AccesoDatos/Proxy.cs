using System;

namespace AccesoDatos
{
    public class Proxy
    {
        public static ServiceReference1.IService1 obtenerConexionSRV()
        {
            try
            {
                ServiceReference1.IService1 srv = new ServiceReference1.Service1Client();
                return srv;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
