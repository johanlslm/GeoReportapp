﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AccesoDatos.ServiceReference1 {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServiceReference1.IService1")]
    public interface IService1 {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService1/IngresarLoginEvent", ReplyAction="http://tempuri.org/IService1/IngresarLoginEventResponse")]
        Modelos.ContenedorLoginDTO IngresarLoginEvent(string correo, string Pass);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IService1/IngresarLoginEvent", ReplyAction="http://tempuri.org/IService1/IngresarLoginEventResponse")]
        System.Threading.Tasks.Task<Modelos.ContenedorLoginDTO> IngresarLoginEventAsync(string correo, string Pass);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IService1Channel : AccesoDatos.ServiceReference1.IService1, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class Service1Client : System.ServiceModel.ClientBase<AccesoDatos.ServiceReference1.IService1>, AccesoDatos.ServiceReference1.IService1 {
        
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
    }
}
