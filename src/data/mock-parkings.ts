import { ParkingSpace, ZoneType } from '../types';

export const ZONES_LIST: ZoneType[] = [
  'Todas',
  'Santa Tecla',
  'Colonia Escalón',
  'Zona Rosa',
  'San Salvador Centro',
  'Antiguo Cuscatlán',
];

export const MOCK_PARKINGS: ParkingSpace[] = [
  {
    id: 'cochera-paseo-tecla',
    title: 'Cochera Residencial El Paseo',
    zone: 'Santa Tecla',
    addressReference: 'A 200m de Plaza Merliot, Residencial El Paseo Polígono E',
    hourlyRate: 1.5,
    rating: 4.9,
    reviewCount: 38,
    distanceMeters: 250,
    highlightBadge: 'Techado y Seguro',
    host: {
      name: 'Carlos Méndez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      isSuperHost: true,
      responseTime: '< 5 min',
      rating: 4.95,
    },
    amenities: {
      isCovered: true,
      hasCamera: true,
      gatedEntry: true,
      easyManeuver: true,
      security24_7: true,
      evCharging: false,
    },
    coordinates: {
      lat: 13.6738,
      lng: -89.2882,
      mapX: 28,
      mapY: 62,
    },
    vehicleTypes: ['Sedán', 'Camioneta', 'Moto'],
    images: [
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=900&q=80', // Garage techado amplio moderno
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80', // Casa residencial con portón
      'https://images.unsplash.com/photo-1584463699042-45a278ea4e4f?auto=format&fit=crop&w=900&q=80', // Entrada con iluminación
    ],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Mario Henríquez',
        date: 'Hace 3 días',
        rating: 5,
        comment:
          'Súper seguro y limpio. Don Carlos fue muy amable al abrir el portón de inmediato. Me ahorré más de $5 en comparación con el parqueo del centro comercial en hora pico.',
        carModel: 'Toyota Corolla 2022',
      },
      {
        id: 'rev-2',
        authorName: 'Andrea Solís',
        date: 'Hace 1 semana',
        rating: 5,
        comment:
          'Excelente ubicación para hacer diligencias en Merliot sin estrés. Entró perfecto mi camioneta RAV4 y el portón eléctrico da total tranquilidad.',
        carModel: 'Toyota RAV4',
      },
      {
        id: 'rev-3',
        authorName: 'Guillermo Paz',
        date: 'Hace 2 semanas',
        rating: 4.8,
        comment:
          'Mucho mejor que pagarle $5 a un cuidador desconocido en la calle con el miedo de que rayen el carro. 100% recomendado.',
        carModel: 'Nissan Versa',
      },
    ],
  },
  {
    id: 'estacionamiento-masferrer',
    title: 'Estacionamiento Privado Masferrer',
    zone: 'Colonia Escalón',
    addressReference: 'A 150m del Redondel Masferrer, Pasaje Los Pinos',
    hourlyRate: 1.5,
    rating: 4.8,
    reviewCount: 42,
    distanceMeters: 380,
    highlightBadge: 'Vigilancia 24/7',
    host: {
      name: 'Sofía Rivera',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
      isSuperHost: true,
      responseTime: '< 3 min',
      rating: 4.9,
    },
    amenities: {
      isCovered: true,
      hasCamera: true,
      gatedEntry: true,
      easyManeuver: true,
      security24_7: true,
      evCharging: true,
    },
    coordinates: {
      lat: 13.7082,
      lng: -89.2458,
      mapX: 45,
      mapY: 30,
    },
    vehicleTypes: ['Sedán', 'Camioneta', 'Moto'],
    images: [
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    ],
    reviews: [
      {
        id: 'rev-4',
        authorName: 'Kevin Martínez',
        date: 'Ayer',
        rating: 5,
        comment:
          'Fui a cenar a la Escalón un viernes en la noche. Los valets estaban cobrando $7. Aquí pagué una fracción y mi vehículo estuvo bajo techo con cámara.',
        carModel: 'Honda Civic',
      },
      {
        id: 'rev-5',
        authorName: 'Claudia Batres',
        date: 'Hace 5 días',
        rating: 4.7,
        comment:
          'Cochera súper amplia con espacio para maniobrar tranquilamente sin golpear puertas. Doña Sofía muy atenta.',
        carModel: 'Mazda CX-5',
      },
    ],
  },
  {
    id: 'cochera-las-palmas',
    title: 'Cochera Las Palmas - San Benito',
    zone: 'Zona Rosa',
    addressReference: 'Frente al Museo MARTE, Calle La Reforma, San Benito',
    hourlyRate: 1.5,
    rating: 4.9,
    reviewCount: 56,
    distanceMeters: 420,
    highlightBadge: 'Ideal para Eventos',
    host: {
      name: 'Roberto Gómez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      isSuperHost: true,
      responseTime: '< 8 min',
      rating: 4.92,
    },
    amenities: {
      isCovered: true,
      hasCamera: true,
      gatedEntry: true,
      easyManeuver: true,
      security24_7: true,
      evCharging: false,
    },
    coordinates: {
      lat: 13.6896,
      lng: -89.2435,
      mapX: 62,
      mapY: 48,
    },
    vehicleTypes: ['Sedán', 'Camioneta', 'Moto'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    ],
    reviews: [
      {
        id: 'rev-6',
        authorName: 'Rodrigo Amaya',
        date: 'Hace 4 días',
        rating: 5,
        comment:
          'La mejor opción para los toques y conciertos cerca de San Benito. Cero estrés de buscar parqueo y la cochera está a pasos de los restaurantes.',
        carModel: 'Kia Sportage',
      },
      {
        id: 'rev-7',
        authorName: 'Valeria Rivas',
        date: 'Hace 2 semanas',
        rating: 5,
        comment:
          'Proceso súper rápido con el código QR. Roberto te recibe con portón listo y te vas sin filas al salir.',
        carModel: 'Hyundai Elantra',
      },
    ],
  },
  {
    id: 'espacio-proceres-uca',
    title: 'Espacio Seguro Los Próceres',
    zone: 'Antiguo Cuscatlán',
    addressReference: 'A 3 cuadras de la UCA, Calle El Espino y Autopista Sur',
    hourlyRate: 1.5,
    rating: 4.7,
    reviewCount: 29,
    distanceMeters: 480,
    highlightBadge: 'Ahorro Estudiantes / Citas',
    host: {
      name: 'Gabriela Henríquez',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      isSuperHost: false,
      responseTime: '< 4 min',
      rating: 4.8,
    },
    amenities: {
      isCovered: true,
      hasCamera: true,
      gatedEntry: true,
      easyManeuver: true,
      security24_7: false,
      evCharging: false,
    },
    coordinates: {
      lat: 13.6789,
      lng: -89.2361,
      mapX: 78,
      mapY: 72,
    },
    vehicleTypes: ['Sedán', 'Moto'],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
    ],
    reviews: [
      {
        id: 'rev-8',
        authorName: 'José Luis Flores',
        date: 'Hace 6 días',
        rating: 5,
        comment:
          'La UCA no tenía parqueo libre para trámites de maestría. Esta cochera me salvó la vida. Rápido, económico y seguro.',
        carModel: 'Nissan Sentra',
      },
      {
        id: 'rev-9',
        authorName: 'Daniela Menjívar',
        date: 'Hace 3 semanas',
        rating: 4.5,
        comment:
          'Zona residencial muy tranquila con guardia en la caseta de la colonia. Se siente súper seguro dejar el carro ahí.',
        carModel: 'Suzuki Swift',
      },
    ],
  },
];
