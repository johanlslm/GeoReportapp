﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AccesoDatos.srvGeoLocalizacion {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="srvGeoLocalizacion.IService1")]
    public interface IService1 {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService1/IngresarLoginEvent", ReplyAction="http://tempuri.org/IService1/IngresarLoginEventResponse")]
        Modelos.ContenedorLoginDTO IngresarLoginEvent(string correo, string Pass);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService1/IngresarLoginEvent", ReplyAction="http://tempuri.org/IService1/IngresarLoginEventResponse")]
        System.Threading.Tasks.Task<Modelos.ContenedorLoginDTO> IngresarLoginEventAsync(string correo, string Pass);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService1/RegistroLoginEvent", ReplyAction="http://tempuri.org/IService1/RegistroLoginEventResponse")]
        int RegistroLoginEvent(string nombres, string apellidos, string correo, string pass1, string pass2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService1/RegistroLoginEvent", ReplyAction="http://tempuri.org/IService1/RegistroLoginEventResponse")]
        System.Threading.Tasks.Task<int> RegistroLoginEventAsync(string nombres, string apellidos, string correo, string pass1, string pass2);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IService1Channel : AccesoDatos.srvGeoLocalizacion.IService1, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class Service1Client : System.ServiceModel.ClientBase<AccesoDatos.srvGeoLocalizacion.IService1>, AccesoDatos.srvGeoLocalizacion.IService1 {
        
        public Service1Client() {
        }
        
        public Service1Client(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public Service1Client(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public Service1Client(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public Service1Client(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Modelos.ContenedorLoginDTO IngresarLoginEvent(string correo, string Pass) {
            return base.Channel.IngresarLoginEvent(correo, Pass);
        }
        
        public System.Threading.Tasks.Task<Modelos.ContenedorLoginDTO> IngresarLoginEventAsync(string correo, string Pass) {
            return base.Channel.IngresarLoginEventAsync(correo, Pass);
        }
        
        public int RegistroLoginEvent(string nombres, string apellidos, string correo, string pass1, string pass2) {
            return base.Channel.RegistroLoginEvent(nombres, apellidos, correo, pass1, pass2);
        }
        
        public System.Threading.Tasks.Task<int> RegistroLoginEventAsync(string nombres, string apellidos, string correo, string pass1, string pass2) {
            return base.Channel.RegistroLoginEventAsync(nombres, apellidos, correo, pass1, pass2);
        }
    }
}
