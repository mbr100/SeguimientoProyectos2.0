export class Proyecto {
    id?: string;
    codigo?: string;
    acronimo?: string;
    titulo?: string;
    cliente?: string;
    ejercicio?: number;
    fechaInicioProyecto?: Date;
    fechaFinProyecto?: Date | null;
    fechaComite?: Date | null;
    fechaFinComite?: Date | null;
    coordinadorComite?: string;
    numeroVersionComite?: number;
    expertoTecnico?: string;
    experto4D?: string;
    consultor?: string;
    estado?: string;
    IMV?: boolean;
    anoCertificacion?: number;
    precioOfertado?: number;
    codigoUnesco?: string;
    proyectoPrincipal?: boolean;
    tipoProyecto?: string;
}
