using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelos
{
    public class ReporteHuecoDTO
    {
        public Int64 Id_Reporte { get; set; }
        public String Coordenadas { get; set; }
        public String Direccion { get; set; }
        public Int32 Estado { get; set; }
        public String Descripcion { get; set; }
        public String Url_Img { get; set; }
        public String FechaRegistro { get; set; }
        public Int32 TipoH { get; set; }
        public Int32 Like { get; set; }
        public Int32 DisLike { get; set; }

    }
}
