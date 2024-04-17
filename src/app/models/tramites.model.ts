export class Tramites {
    id?: string;
    codigo?: string;
    titulo?: string;
    cliente?: string;
    fechaInicioTramite?: Date;
    fechaFinTramite?: Date | null;
    fechaEntrega?: Date | null;
    expertoTecnico?: string;
    consultor?: string;
    analisis?: string;
    estado?: string;
}
