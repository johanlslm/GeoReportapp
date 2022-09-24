﻿using System;
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
        public Int32 LoginRecoverPassword(String correo)
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
    }
}
