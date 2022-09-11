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
        public async Task<JsonResult> IngresarLoginEvent(String CorreoVali, String PassWordVali)
        {
            var srv = Proxy.obtenerServicioDistribuidoGeneral();
            try
            {
                var datosModal = await srv.IngresarLoginEventAsync(CorreoVali, PassWordVali);
                return Json(new
                {
                    datosModal
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
