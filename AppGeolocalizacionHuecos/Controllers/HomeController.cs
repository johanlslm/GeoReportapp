using AccesoDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace AppGeolocalizacionHuecos.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //var srv = Proxy.obtenerServicioDistribuidoGeneral();
            return RedirectToAction("Login", "Home");
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult HomeApp()
        {
            return View();
        }
        public ActionResult SearchGPS()
        {
            return View();
        }


        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async  Task<JsonResult> IngresarLoginEvent (String CorreoVali, String PassWordVali)
        {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";

            try
            {
                var datosmodal = await srv.IngresarLoginEventAsync(CorreoVali, PassWordVali);

                if (datosmodal.Respuesta != 6)
                {
                    switch (datosmodal.Respuesta)
                    {
                        case 1:
                            txtTextInfo = "Correo no registrado en el sistema";
                            TipoRespuesta = 1;
                            break;
                        case 2:
                            txtTextInfo = "Correo inactivo en el sistema";
                            TipoRespuesta = 1;
                            break;
                        case 3:
                            txtTextInfo = "Contraseña bloqueada, genere una nueva en recordar contraseña";
                            TipoRespuesta = 2;
                            break;
                        case 4:
                            txtTextInfo = "Contraseña en proceso de cambio, valide su correo";
                            TipoRespuesta = 2;
                            break;
                        case 5:
                            txtTextInfo = "Contraseña incorrecta";
                            TipoRespuesta = 2;
                            break;
                        default:
                            txtTextInfo = "Error no controlado, valide en un rato";
                            TipoRespuesta = 4;
                            Error = true;
                            break;
                    }
                }
                else
                {
                    txtTextInfo = "Bienvenido " + datosmodal.LoginUsuarioDto.Nombre_Usuario;
                    TipoRespuesta = 3;
                }
                return Json(new{datosmodal,txtTextInfo,TipoRespuesta});
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
        }
    }
}
