export class Tramites {
    id: string | undefined;
    codigo?: string;
    titulo?: string;
    cliente?: string;
    fechaInicioTramite?: Date;
    fechaFinTramite?: Date | null;
    fechaEntrega?: Date | null;
    expertoTecnico?: string;
    consultor?: string;


    constructor(id: string | undefined, codigo: string | undefined, titulo: string | undefined, cliente: string | undefined, fechaInicioTramite: Date, expertoTecnico: string | undefined, consultor: string | undefined) {
        this.id = id;
        this.codigo = codigo;
        this.titulo = titulo;
        this.cliente = cliente;
        this.fechaInicioTramite = fechaInicioTramite;
        this.expertoTecnico = expertoTecnico;
        this.consultor = consultor;
        this.fechaFinTramite = null;
        this.fechaEntrega = null;
    }
}
