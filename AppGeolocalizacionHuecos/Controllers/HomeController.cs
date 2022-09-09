using AccesoDatos;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
