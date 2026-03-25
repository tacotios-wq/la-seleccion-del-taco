export type Ronda = "octavos" | "cuartos" | "semis" | "final";

export type Sello = "participante" | "semifinalista" | "finalista" | "campeon";

export type PrecioRango = "$" | "$$" | "$$$";

export interface Ubicacion {
  direccion: string;
  colonia: string;
  ciudad: string;
  estado: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
}

export type Region = "cdmx" | "gdl" | "mty";

export interface Taqueria {
  id: string;
  nombre: string;
  ubicacion: Ubicacion;
  especialidad: string;
  precioRango: PrecioRango;
  horario: string;
  historia: string;
  fotos: string[];
  tags: string[];
  sello: Sello;
  edad: number;
  region: Region;
  patrimonio?: boolean;
  placeholder?: boolean;
}

export interface Matchup {
  id: string;
  ronda: Ronda;
  taqueria1_id: string;
  taqueria2_id: string;
  votos1: number;
  votos2: number;
  estado: "activo" | "cerrado" | "proximo";
  fecha_inicio: string;
  fecha_fin: string;
}

export interface PasaporteSello {
  taqueria_id: string;
  fecha_obtenido: string;
  tipo: Sello;
}

export interface TeamMember {
  id: string;
  nombre: string;
  titulo: string;
  credencial: string;
  bio: string;
  foto: string;
}
