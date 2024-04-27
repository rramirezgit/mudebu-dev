import uuidv4 from 'src/utils/uuidv4';
import { snakeCase } from 'src/utils/change-case';
import { IFormDataOnboarding, TSeccionForm, inputsOnboarding, textTypeOnboarding } from './types';

/* ______________________________________________________________________________________ */

const buttonsData = [
  {
    name: 'Casa/Departamento',
    options: ['Recámara', 'Sala de Tv', 'Comedor', 'Cine en Casa', 'Gimnasio', 'Otro'],
    texts: [
      {
        id: uuidv4(),
        type: textTypeOnboarding.title,
        value: '¿Qué tipo de espacio deseas adecuar, remodelar, acondicionar o diseñar?',
      },
      {
        id: uuidv4(),
        type: textTypeOnboarding.text,
        value: 'Selección del Tipo de Espacio.',
      },
    ],
  },
  {
    name: 'Hotel',
    options: [
      'Lobby',
      'Gimnasio',
      'Restaurante',
      'Cuarto de Hotel',
      'Pasillo',
      'Elevador',
      'Terraza',
      'Otro',
    ],
    texts: [
      {
        id: uuidv4(),
        type: textTypeOnboarding.title,
        value: '¿Qué tipo de espacio deseas adecuar, remodelar, acondicionar o diseñar?',
      },
      {
        id: uuidv4(),
        type: textTypeOnboarding.text,
        value: 'Selección del Tipo de Espacio.',
      },
    ],
  },
  {
    name: 'Restaurante',
    options: ['Cocina', 'Terraza', 'Interior', 'Otro'],
    texts: [
      {
        id: uuidv4(),
        type: textTypeOnboarding.title,
        value: '¿Qué tipo de espacio deseas adecuar, remodelar, acondicionar o diseñar?',
      },
      {
        id: uuidv4(),
        type: textTypeOnboarding.text,
        value: 'Selección del Tipo de Espacio.',
      },
    ],
  },
  {
    name: 'Corporativo/Oficina',
    options: ['Pasillo', 'Oficinas Privadas', 'Cubiculos', 'Zona de comer', 'Otro'],
    texts: [
      {
        id: uuidv4(),
        type: textTypeOnboarding.title,
        value: '¿Qué tipo de espacio deseas adecuar, remodelar, acondicionar o diseñar?',
      },
      {
        id: uuidv4(),
        type: textTypeOnboarding.text,
        value: 'Selección del Tipo de Espacio.',
      },
    ],
  },
  {
    name: 'Retail',
    options: [
      'Escaparates',
      'Puntos de Venta',
      'Estanterias y Anaqueles',
      'Probadores',
      'Back office',
      'Otro',
    ],
    texts: [
      {
        id: uuidv4(),
        type: textTypeOnboarding.title,
        value: '¿Qué tipo de espacio deseas adecuar, remodelar, acondicionar o diseñar?',
      },
      {
        id: uuidv4(),
        type: textTypeOnboarding.text,
        value: 'Selección del Tipo de Espacio.',
      },
    ],
  },
  {
    name: 'Otro',
    options: [],
  },
];

export const buttonsOnBoarding = buttonsData
  .map((item) => item.name)
  .map((name) => ({
    name,
    icon: `/assets/icons/onboarding/${snakeCase(name)}.svg`,
    options: buttonsData
      .find((item) => item.name === name)
      ?.options.map((option) => ({
        name: option,
        icon: `/assets/icons/onboarding/${snakeCase(name)}/${snakeCase(option)}.svg`,
      })) as any[],
    texts: buttonsData.find((item) => item.name === name)?.texts as any[],
  }));

/* ______________________________________________________________________________________ */

const FormDataSteps: IFormDataOnboarding[] = [
  /// Seccion: Descripción Inicial
  {
    id: uuidv4(),
    title: TSeccionForm.DescripcionInicial,
    content: [
      {
        name: 'descripcion',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: 'Cuéntanos sobre tu proyecto: ',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.subtitle,
            value:
              '¿Estás buscando remodelar un espacio existente, desarrollar algo completamente nuevo, o tienes un espacio específico en mente para tu proyecto?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value:
              'Se lo más explicito y danos el mayor de detalles posibles para entender tus necesiades y darte la mejor propuesta.',
          },
        ],
        nextCondition: 'nextStep',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'descripcion',
            type: inputsOnboarding.textArea,
            placeholder: 'Descripción',
          },
        ],
      },
    ],
  },

  /// Seccion: Especificación
  {
    id: uuidv4(),
    title: TSeccionForm.Especificacion,
    content: [
      // Especificacion: Tipo de Proyecto
      {
        name: 'especificacion',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Quieres remodelar/crear un espacio o un producto?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selección del Tipo de Espacio.',
          },
        ],
        nextCondition: {
          condition: (valuesForm) => valuesForm.especificacion === 'Espacio',
          true: 'espacio',
          false: 'nextStep',
        },
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'especificacion',
            type: inputsOnboarding.buttons,
            options: ['Espacio', 'Productos'],
          },
        ],
      },

      // Especificacion : Espacio
      {
        name: 'espacio',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Qué tipo de espacio deseas adecuar, remodelar, acondicionar o diseñar?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selección del Tipo de Espacio.',
          },
        ],
        nextCondition: 'nextContent',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'espacio',
            type: inputsOnboarding.buttons,
            options: [
              'Casa/Departamento',
              'Hotel',
              'Restaurante',
              'Corporativo/Oficina',
              'Retail',
              'Otro',
            ],
          },
        ],
      },

      /// Especificacion : Casa/Departamento

      {
        name: 'Casa/Departamento',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Que espacio dentro de tu casa/departamneto buscas remodelar?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selección del Tipo de Espacio.',
          },
        ],
        nextCondition: 'nextContent',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'Casa/Departamento',
            type: inputsOnboarding.buttons,
            options: ['Recámara', 'Sala de Tv', 'Comedor', 'Cine en Casa', 'Gimnasio', 'Otro'],
          },
        ],
      },

      /// Especificacion : Hotel
      {
        name: 'Hotel',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Que espacio dentro de tu hotel buscas remodelar?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selección del Tipo de Espacio.',
          },
        ],
        nextCondition: 'nextContent',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'Hotel',
            type: inputsOnboarding.buttons,
            options: [
              'Lobby',
              'Gimnasio',
              'Restaurante',
              'Cuarto de Hotel',
              'Pasillo',
              'Elevador',
              'Terraza',
              'Otro',
            ],
          },
        ],
      },

      /// Especificacion : Restaurante

      {
        name: 'Restaurante',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Que espacio dentro de tu Restaurante buscas remodelar?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selección del Tipo de Espacio.',
          },
        ],
        nextCondition: 'nextContent',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'Restaurante',
            type: inputsOnboarding.buttons,
            options: ['Cocina', 'Terraza', 'Interior', 'Otro'],
          },
        ],
      },

      /// Especificacion : Corporativo/Oficina

      {
        name: 'Corporativo/Oficina',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Que espacio dentro de tu oficina buscas remodelar?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selección del Tipo de Espacio.',
          },
        ],
        nextCondition: 'nextContent',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'Corporativo/Oficina',
            type: inputsOnboarding.buttons,
            options: ['Pasillo', 'Oficinas Privadas', 'Cubiculos', 'Zona de comer', 'Otro'],
          },
        ],
      },

      /// Especificacion : Retail

      {
        name: 'Retail',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Que espacio dentro de tu Retail buscas remodelar?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selección del Tipo de Espacio.',
          },
        ],
        nextCondition: 'nextContent',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'Retail',
            type: inputsOnboarding.buttons,
            options: [
              'Escaparates',
              'Puntos de Venta',
              'Estanterias y Anaqueles',
              'Probadores',
              'Back office',
              'Otro',
            ],
          },
        ],
      },

      /// Especificacion : Otro

      {
        name: 'Otro',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Que espacio buscas remodelar?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selección del Tipo de Espacio.',
          },
        ],
        nextCondition: 'nextContent',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'Otro',
            type: inputsOnboarding.textArea,
            placeholder: 'Especifica',
          },
        ],
      },
    ],
  },

  /// Mobilidario y Decoración
  {
    id: uuidv4(),
    title: TSeccionForm.MobiliarioYDecoracion,
    content: [
      {
        name: 'mobiliario',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Qué elementos de mobiliario o decoración estás considerando?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Descríbenos como te imaginas el mobiliario.',
          },
        ],
        nextCondition: 'nextStep',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'mobiliario',
            type: inputsOnboarding.textArea,
            placeholder: 'Mobiliario',
          },
        ],
      },
    ],
  },

  /// Estilos
  {
    id: uuidv4(),
    title: TSeccionForm.MobiliarioYDecoracion,
    content: [
      {
        name: 'estilos',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: 'Define tu estilo ¿Qué estilos estas buscando?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value:
              'Selecciona el estilo o los estilos que te atraen para tu proyecto. Esto nos ayudará a captar la esencia de lo que estás buscando.',
          },
        ],
        nextCondition: 'nextStep',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'estilos',
            type: inputsOnboarding.multiButtons,
            options: [
              'Minimalista',
              'Moderno',
              'Clásico',
              'Industrial',
              'Rústico',
              'Ecléctico',
              'Bohemio',
              'Art Deco',
              'Contemporáneo',
              'Nórdico',
              'Shabby Chic',
              'Mediterráneo',
              'Zen',
              'Art Nouveau',
              'Colonial',
              'Retro',
              'Gótico',
              'Barroco',
              'Bauhaus',
              'High-Tech',
              'Tropical',
              'Costero',
              'Farmhouse',
              'Minimalismo Cálido',
              'Futurista',
              'Artesanal',
              'Étnico',
              'Japonés',
              'Marroquí',
              'Minimalismo de lujo',
              'Postmoderno',
              'Surrealista',
              'Vanguardista',
              'Otro (Especificar)',
            ],
            placeholder: 'Mobiliario',
          },
        ],
      },
    ],
  },
  /// Texturas
  {
    id: uuidv4(),
    title: TSeccionForm.Texturas,
    content: [
      {
        name: 'texturas',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Qué texturas te gustarían?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selecciona las opciones correspondientes.',
          },
        ],
        nextCondition: 'nextStep',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'texturas',
            type: inputsOnboarding.multiButtons,
            options: [
              'Lisas y pulidas',
              'Rugosas',
              'Brillantes o Reflectantes',
              'Mate o Satinadas',
              'Suaves o Acolchadas',
              'Ásperas y Rústicas',
              'Metálicas',
              'Tejidos y Entrelazados',
              'Naturales y Orgánicas',
              'Geométricas y Repetitivas',
              'Fluidas y Onduladas',
              'Otras',
            ],
            placeholder: 'Mobiliario',
          },
        ],
      },
    ],
  },
  /// Materiales
  {
    id: uuidv4(),
    title: TSeccionForm.Materiales,
    content: [
      {
        name: 'materiales',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Qué texturas te gustarían?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: 'Selecciona las opciones correspondientes.',
          },
        ],
        nextCondition: 'nextStep',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'materiales',
            type: inputsOnboarding.multiButtons,
            options: [
              'Maderas',
              'Metales',
              'Vidrios y Cristales',
              'Piedras',
              'Cerámicas',
              'Plásticos',
              'Cuero/Pieles',
              'Concreto',
              'Textiles/Telas',
            ],
            placeholder: 'Mobiliario',
          },
        ],
      },
    ],
  },
  /// Tonos
  {
    id: uuidv4(),
    title: TSeccionForm.Tonos,
    content: [
      {
        name: 'tonos',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value: '¿Qué colores y tones se adecuan mejor a lo que estas buscando?',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value: '¿Hay tonos específicos o paletas que te gustaría ver en el diseño?',
          },
        ],
        nextCondition: 'nextStep',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'tonos',
            type: inputsOnboarding.multiButtons,
            options: [
              'Oscuros',
              'Cálidos',
              'Neutros',
              'Pastel',
              'Vibrantes o Saturados',
              'Tierra',
              'Metálicos',
              'Monocromáticos',
              'Madera Natural',
              'No tengo preferencia',
            ],
            placeholder: 'Mobiliario',
          },
        ],
      },
    ],
  },

  /// Benchmarks
  {
    id: uuidv4(),
    title: TSeccionForm.Tonos,
    content: [
      {
        name: 'benchmarks',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value:
              'Comparte con nosotros cualquier fuente de inspiración o referencias que tengas para tu proyecto',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value:
              'Esto puede incluir imágenes, enlaces a diseños que te gustan, o incluso conceptos de diseño que has visto y que te gustaría explorar. ',
          },
        ],
        nextCondition: 'nextStep',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'benchmarks',
            type: inputsOnboarding.textArea,
            placeholder: 'Mobiliario',
          },
        ],
      },
    ],
  },

  /// DetallesAdicionalesDeDiseño
  {
    id: uuidv4(),
    title: TSeccionForm.DetallesAdicionalesDeDiseño,
    content: [
      {
        name: 'detalles',
        texts: [
          {
            id: uuidv4(),
            type: textTypeOnboarding.title,
            value:
              'Si hay otros detalles específicos de diseño que te gustaría discutir o incorporar, por favor compártelos.',
          },
          {
            id: uuidv4(),
            type: textTypeOnboarding.text,
            value:
              'Esto puede incluir imágenes, enlaces a diseños que te gustan, o incluso conceptos de diseño que has visto y que te gustaría explorar. ',
          },
        ],
        nextCondition: 'finish',
        fields: [
          {
            id: uuidv4(),
            nameFORMIK: 'detalles',
            type: inputsOnboarding.textArea,
            placeholder: 'Mobiliario',
          },
        ],
      },
    ],
  },
];

export { FormDataSteps };
