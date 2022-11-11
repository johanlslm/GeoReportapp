using AccesoDatos;
using Modelos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using AppGeolocalizacionHuecos.Clases;


namespace AppGeolocalizacionHuecos.Controllers
{
    public class HomeController : Controller
    {
        private LoginUsuarioDTO usuario;
        public ActionResult Index()
        {
            return RedirectToAction("Login", "Home");
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult HomeApp()
        {
            usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));
            if (usuario != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult SearchGPS()
        {
            usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));

            if (usuario != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult ReporteGPS() {
            usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));

            if (usuario != null)
            {

                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult ReporteFormulario()
        {
            usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));

            if (usuario != null)
            {
                Int64 idUserVal = usuario.Id_usuario;
                var srv = Proxy.obtenerConexionSRV();
                List<ReporteHuecoDTO> datosReporte = srv.ConsultaReportesUsuario(idUserVal);
                ViewBag.Reporte = datosReporte;
                return View();
            }
            else
            {

                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult DReporte()
        {
            usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));

            if (usuario != null)
            {
                var srv = Proxy.obtenerConexionSRV();
                ReporteConsulta datosReporte = srv.ConsultaReporteGeneralDatos();
                ViewBag.Reporte = datosReporte;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult Administrativo()
        {
            usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));

            if (usuario != null && usuario.Tipo_Usuario == 2)
            {
                return View();
            }
            else
            {
                return RedirectToAction("HomeApp", "Home");
            }
        }

        public ActionResult CambioPass()
        {
            usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));

            if (usuario != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult SobreNosotros()
        {
            usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));

            if (usuario != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        public ActionResult logout()
        {
            if (Seguridad.Seguridad.cierraSession(Response, Request))
            {
                return RedirectToAction("Login", "Home");
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async  Task<JsonResult> IngresarLoginEvent (String CorreoVali, String PassWordVali)
        {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";
            var URLAction ="";
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

                    var serealizar = new JavaScriptSerializer();
                    string DatosUsuario = serealizar.Serialize(datosmodal.LoginUsuarioDto);
                    FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, ".UserDTOLogin", DateTime.Now, DateTime.Now.AddMinutes(120), true, DatosUsuario, FormsAuthentication.FormsCookiePath);
                    string ticketEncrip = FormsAuthentication.Encrypt(ticket);
                    var cookie = Request.Cookies.Get(".UserDTOLogin");

                    if (cookie != null)
                    {
                        cookie.Value = ticketEncrip;
                        Response.SetCookie(cookie);
                    }
                    else
                    {
                        cookie = new HttpCookie(".UserDTOLogin");
                        cookie.Value = ticketEncrip;
                        cookie.Expires = DateTime.Now.AddMinutes(120);
                        Response.SetCookie(cookie);
                    }
                    URLAction = "Home/HomeApp";

                }
                return Json(new{datosmodal,txtTextInfo,TipoRespuesta,Error, URLAction});
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
        }


        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<JsonResult> RegistroLoginEvent(String NombresVali, String ApellidosVali, String CorreoVali, String PassWordVali , String PassWord2Vali)
        {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";
            try
            {
                var datosmodal = await srv.RegistroLoginEventAsync(NombresVali, ApellidosVali, CorreoVali, PassWordVali, PassWord2Vali);

                    switch (datosmodal)
                    {
                        case 1:
                            txtTextInfo = "Correo ya registrado en el sistema";
                            TipoRespuesta = 1;
                            break;
                        case 2:
                            txtTextInfo = "Las contraseñas no coinciden";
                            TipoRespuesta = 2;
                            break;
                        case 3:
                            txtTextInfo = "Registro completado con exito";
                            TipoRespuesta = 3;
                            break;
                        case 4:
                            txtTextInfo = "Contraseña poco segura, debe contener minimo 6 caracteres!!!";
                            TipoRespuesta = 2;
                            break;
                    default:
                            txtTextInfo = "Error no controlado, valide en un rato";
                            TipoRespuesta = 4;
                            Error = true;
                            break;
                    }
                return Json(new { datosmodal, txtTextInfo, TipoRespuesta, Error });
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
        }


        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<JsonResult> LoginRecoverPassword(String EmailResetPass) {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";
            try
            {
                var datosmodal = await srv.LoginRecoverPasswordAsync(EmailResetPass);

                switch (datosmodal.Respuesta)
                {
                    case 1:
                        txtTextInfo = "Correo no registrado en el sistema";
                        TipoRespuesta = 1;
                        break;
                    case 2:
                        txtTextInfo = "Usuario inactivo, contacte al soporte del sistema";
                        TipoRespuesta = 2;
                        break;
                    case 3:

                        var mensaje = PlantillaCorreo_RegistrarCuentaSoporteMoto(datosmodal.PassResetVal);
                        Utilities.enviaCorreo(EmailResetPass, mensaje, false, "prueba", "CAMBIO DE CONTRASEÑA GEO-REPORTAPP");

                        txtTextInfo = "Contraseña nueva enviada al correo electronico, valide por favor";
                        TipoRespuesta = 10;
                        break;
                    default:
                        txtTextInfo = "Error no controlado, valide en un rato";
                        TipoRespuesta = 4;
                        Error = true;
                        break;
                }
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
        }


        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<JsonResult> ChangePasswordEvent(String InputPass1, String InputPass2)
        {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";
            try
            {
                usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));
                Int64 idUserVal = usuario.Id_usuario;
                var datosmodal = await srv.ChangePasswordEventAsync(InputPass1, InputPass2 , idUserVal);

                switch (datosmodal)
                {
                    case 1:
                        txtTextInfo = "Las contraseñas no coinciden";
                        TipoRespuesta = 1;
                        break;
                    case 2:
                        txtTextInfo = "Actualizacion realizada con exito";
                        TipoRespuesta = 3;
                        break;
                    default:
                        txtTextInfo = "Error no controlado, valide en un rato";
                        TipoRespuesta = 4;
                        Error = true;
                        break;
                }
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
        }


        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<JsonResult> GenerarReporteEvent(string base64Imagen, string imagenNombre, string DirValue, string LatValue, string LngValue, Int32 TipoValue, string DescValue)
        {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";

            try
            {
                usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));
                Int64 idUserVal = usuario.Id_usuario;

                string ruta = (base64Imagen.Replace("data:image/png;base64,", ""));
                ruta = ruta.Replace("data:image/jpeg;base64,", "");
                ruta = ruta.Replace("data:image/jpg;base64,", "");
                ruta = ruta.Replace('-', '+').Replace('_', '/');
                byte[] data = System.Convert.FromBase64String(ruta);

                string filePath = Server.MapPath("/Img/");
                string filepathComplete = filePath + "\\" + "ReporteHuecos";
                string subCarpeta = CrearSubCarpeta(filepathComplete, filePath);
                string rutaCompleta = subCarpeta + "\\" + imagenNombre;
                using (var imageFile = new FileStream(rutaCompleta, FileMode.Create))
                {
                    imageFile.Write(data, 0, data.Length);
                    imageFile.Flush();
                }

                var datosmodal = await srv.GenerarReporteEventAsync(LatValue, LngValue, DirValue, TipoValue, imagenNombre, DescValue, idUserVal);


                switch (datosmodal)
                {
                    case 1:
                        txtTextInfo = "Registro generado con exito, lo podras encontrar en la opción de (MIS REPORTES) o en el GPS";
                        TipoRespuesta = 3;
                        break;
                    default:
                        txtTextInfo = "Error no controlado, valide en un rato";
                        TipoRespuesta = 4;
                        Error = true;
                        break;
                }

                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }

        }

        private string CrearSubCarpeta(string ruta, string direccion)
        {
            string rutaCreada = "";
            if (!Directory.Exists(ruta))
            {
                DirectoryInfo di = Directory.CreateDirectory(ruta);
                rutaCreada = direccion + "\\" + Convert.ToString(di);
            }
            else
            {
                rutaCreada = ruta;
            }

            return rutaCreada;
        }

        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<JsonResult> ActualizacionEstadoRegistro(Int64 IdReport, Int32 tipoA)
        {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";
            try
            {
                var datosmodal = await srv.ActualizacionEstadoRegistroAsync(IdReport, tipoA);
                return Json(new { txtTextInfo, TipoRespuesta, Error, datosmodal });
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
        }

        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<JsonResult> ConsultaReporteGeneral()
        {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";
            try
            {
                var datosGPSR = await srv.ConsultaReporteGeneralAsync();
                return Json(new { txtTextInfo, TipoRespuesta, Error, datosGPSR });
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
        }

        [HttpPost, OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<JsonResult> RegistroInteraccion(Int64 IdRegistro, int TipoLike)
        {
            var srv = Proxy.obtenerConexionSRV();
            var TipoRespuesta = 0;
            var Error = false;
            var txtTextInfo = "";
            try
            {
                usuario = Seguridad.Seguridad.validaSessionUsuario(Request.Cookies.Get(".UserDTOLogin"));
                Int64 idUserVal = usuario.Id_usuario;
                var datosGPSR = await srv.RegistroInteraccionAsync(IdRegistro, idUserVal, TipoLike);
                return Json(new { txtTextInfo, TipoRespuesta, Error, datosGPSR });
            }
            catch (Exception ex)
            {
                txtTextInfo = ex.Message;
                TipoRespuesta = 4;
                Error = true;
                return Json(new { txtTextInfo, TipoRespuesta, Error });
            }
        }

        string PlantillaCorreo_RegistrarCuentaSoporteMoto(String Clave)
        {
            string mensaje = "\"<meta charset=\"utf-8\" /> <table style=\"width: 500px; height: 300px; border: 1px solid black; border-radius:10px; background: radial-gradient(circle, rgba(178,191,255,1) 0%, rgba(148,148,233,1) 100%);\"><thead><tr><th style=\"font-size: 30px; font-weight: 600;\">GEO-REPORTAPP</th></tr></thead><tbody><tr><td><b>CAMBIO DE CONTRASEÑA</b>, Se ha generado la solicitud para el cambio de contraseña la cual se creo de manera aleatoria, por lo que se recomienda cambiar en el primer ingreso en el modulo de cambio de contraseña! se recomienda claves que no sean faciles de desifrar y con uso de numeros y letras.</td></tr><tr><td><b>CLAVE GENERADA:&nbsp;&nbsp;&nbsp;</b><span style=\"font-size: 35px;\">" + Clave + "<span></td></tr></tbody></table>";

            return mensaje;
        }
    }
}
