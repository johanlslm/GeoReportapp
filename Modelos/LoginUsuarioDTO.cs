using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelos
{
    public class LoginUsuarioDTO
    {
        public Int64 Id_usuario { get; set; }
        public String Nombre_Usuario { get; set; }
        public String Apellido_Usuario { get; set; }
        public String Correo_Usuario { get; set; }
        public String Contrasena_Usuario { get; set; }
        public Int32 Estado_Contrasena { get; set; }
        public Int32 Tipo_Usuario { get; set; }
        public bool Estado_Usuario { get; set; }
        public Int32 IntentosContrasena { get; set; }
    }
}
