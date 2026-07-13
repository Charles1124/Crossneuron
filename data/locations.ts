export interface Country {
    name: string;
    flag: string;
    cities: string[];
}

export const COUNTRIES: Country[] = [
    {
        name: 'México',
        flag: '🇲🇽',
        cities: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Ciudad Juárez', 'Zapopan', 'Mérida', 'San Luis Potosí', 'Aguascalientes', 'Hermosillo', 'Mexicali', 'Culiacán', 'Acapulco', 'Cancún', 'Querétaro', 'Chihuahua', 'Morelia', 'Veracruz'],
    },
    {
        name: 'Argentina',
        flag: '🇦🇷',
        cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Tucumán', 'La Plata', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan', 'Resistencia', 'Neuquén', 'Santiago del Estero', 'Corrientes', 'Posadas'],
    },
    {
        name: 'Colombia',
        flag: '🇨🇴',
        cities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué', 'Manizales', 'Bello', 'Pasto', 'Montería', 'Villavicencio'],
    },
    {
        name: 'Chile',
        flag: '🇨🇱',
        cities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Talca', 'Arica', 'Iquique', 'Puerto Montt', 'Chillán', 'Calama', 'Osorno', 'Copiapó'],
    },
    {
        name: 'Perú',
        flag: '🇵🇪',
        cities: ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Iquitos', 'Cusco', 'Huancayo', 'Tacna', 'Juliaca', 'Ica', 'Ayacucho', 'Pucallpa', 'Cajamarca', 'Chimbote'],
    },
    {
        name: 'Venezuela',
        flag: '🇻🇪',
        cities: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay', 'Ciudad Guayana', 'Barcelona', 'Maturín', 'Cumaná', 'Barinas', 'Mérida', 'San Cristóbal', 'Cabimas', 'Coro', 'Punto Fijo'],
    },
    {
        name: 'Ecuador',
        flag: '🇪🇨',
        cities: ['Quito', 'Guayaquil', 'Cuenca', 'Santo Domingo', 'Machala', 'Manta', 'Portoviejo', 'Loja', 'Ambato', 'Esmeraldas', 'Riobamba', 'Quevedo', 'Ibarra', 'Milagro', 'Durán'],
    },
    {
        name: 'Bolivia',
        flag: '🇧🇴',
        cities: ['Santa Cruz de la Sierra', 'La Paz', 'Cochabamba', 'Sucre', 'Oruro', 'Potosí', 'Tarija', 'Sacaba', 'El Alto', 'Montero', 'Trinidad', 'Cobija', 'Riberalta'],
    },
    {
        name: 'Paraguay',
        flag: '🇵🇾',
        cities: ['Asunción', 'Ciudad del Este', 'San Lorenzo', 'Luque', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Limpio', 'Ñemby', 'Encarnación', 'Pedro Juan Caballero', 'Caaguazú'],
    },
    {
        name: 'Uruguay',
        flag: '🇺🇾',
        cities: ['Montevideo', 'Salto', 'Ciudad de la Costa', 'Paysandú', 'Las Piedras', 'Rivera', 'Maldonado', 'Tacuarembó', 'Melo', 'Mercedes', 'Artigas', 'Minas'],
    },
    {
        name: 'Brasil',
        flag: '🇧🇷',
        cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre', 'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'São Luís'],
    },
    {
        name: 'Guatemala',
        flag: '🇬🇹',
        cities: ['Ciudad de Guatemala', 'Mixco', 'Villa Nueva', 'Quetzaltenango', 'Escuintla', 'Chinautla', 'Amatitlán', 'Petapa', 'Cobán', 'Chiquimula', 'Huehuetenango'],
    },
    {
        name: 'Cuba',
        flag: '🇨🇺',
        cities: ['La Habana', 'Santiago de Cuba', 'Camagüey', 'Holguín', 'Santa Clara', 'Guantánamo', 'Bayamo', 'Las Tunas', 'Cienfuegos', 'Pinar del Río', 'Matanzas'],
    },
    {
        name: 'República Dominicana',
        flag: '🇩🇴',
        cities: ['Santo Domingo', 'Santiago de los Caballeros', 'La Romana', 'San Pedro de Macorís', 'San Francisco de Macorís', 'La Vega', 'Puerto Plata', 'Barahona', 'San Cristóbal'],
    },
    {
        name: 'Honduras',
        flag: '🇭🇳',
        cities: ['Tegucigalpa', 'San Pedro Sula', 'Choloma', 'La Ceiba', 'El Progreso', 'Villanueva', 'Choluteca', 'Comayagua', 'Puerto Cortés', 'Danlí'],
    },
    {
        name: 'El Salvador',
        flag: '🇸🇻',
        cities: ['San Salvador', 'Soyapango', 'Santa Ana', 'San Miguel', 'Mejicanos', 'Apopa', 'Ciudad Delgado', 'Ilopango', 'Sonsonate', 'Ahuachapán'],
    },
    {
        name: 'Nicaragua',
        flag: '🇳🇮',
        cities: ['Managua', 'León', 'Masaya', 'Chinandega', 'Matagalpa', 'Estelí', 'Granada', 'Ciudad Sandino', 'Jinotega', 'Tipitapa'],
    },
    {
        name: 'Costa Rica',
        flag: '🇨🇷',
        cities: ['San José', 'Cartago', 'Alajuela', 'Heredia', 'Liberia', 'Pérez Zeledón', 'Puntarenas', 'Limón', 'San Carlos', 'Desamparados'],
    },
    {
        name: 'Panamá',
        flag: '🇵🇦',
        cities: ['Ciudad de Panamá', 'San Miguelito', 'Tocumen', 'David', 'La Chorrera', 'Santiago', 'Chitré', 'Colón', 'Arraiján', 'Penonomé'],
    },
    {
        name: 'Puerto Rico',
        flag: '🇵🇷',
        cities: ['San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas', 'Guaynabo', 'Arecibo', 'Toa Baja', 'Mayagüez', 'Trujillo Alto'],
    },
];
