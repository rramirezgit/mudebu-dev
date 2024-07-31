// @mui
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// _mock
// components
import { useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import { RootState } from 'src/store';

// ----------------------------------------------------------------------

const faqs = [
  {
    id: 1,
    category: 'Información General y Servicios',
    questions: [
      {
        id: 1,
        value: 'panel1',
        heading: '¿Qué es Mudebu?',
        detail:
          'Mudebu es una empresa mexicana especializada en la fabricación de mobiliario a medida y en ofrecer soluciones integrales de diseño y remodelación para espacios residenciales, corporativos, retail, hoteles y restaurantes.',
      },
      {
        id: 2,
        value: 'panel2',
        heading: '¿Qué servicios ofrece Mudebu?',
        detail:
          'Ofrecemos diseño y remodelación de interiores, fabricación de mobiliario personalizado, consultoría, estudios de topografía, mantenimiento preventivo y correctivo, entre otros servicios.',
      },
    ],
  },
  {
    id: 2,
    category: 'Financiamiento, Logística y Proyectos Internacionales',
    questions: [
      {
        id: 3,
        value: 'panel3',
        heading: '¿Mudebu ofrece financiamiento para proyectos?',
        detail:
          'Sí, proporcionamos opciones de financiamiento flexibles para facilitar la realización de tus proyectos.',
      },
      {
        id: 4,
        value: 'panel4',
        heading: '¿Pueden trabajar en proyectos fuera de México?',
        detail:
          'Depende de la ubicación y el alcance del proyecto. Recomendamos contactarnos para discutir detalles específicos.',
      },
      {
        id: 5,
        value: 'panel5',
        heading: '¿Cómo maneja Mudebu los desafíos logísticos para garantizar entregas a tiempo?',
        detail:
          'Contamos con un equipo logístico experto y utilizamos software de gestión avanzado para optimizar nuestras rutas de entrega y garantizar la puntualidad.',
      },
      {
        id: 6,
        value: 'panel6',
        heading: '¿Existen opciones de pago flexible para proyectos grandes?',
        detail:
          'Sí, entendemos la importancia de la flexibilidad en la financiación de proyectos grandes y ofrecemos diversas opciones de pago para adaptarnos a tus necesidades.',
      },
      {
        id: 7,
        value: 'panel7',
        heading: '¿Mudebu tiene experiencia en manejar proyectos internacionales?',
        detail:
          'Sí, hemos trabajado en proyectos internacionales y tenemos la capacidad logística y la experiencia para manejar desafíos únicos que vienen con proyectos fuera de México, asegurando los mismos estándares de calidad y compromiso.',
      },
    ],
  },
  {
    id: 3,
    category: 'Calidad, Tecnología e Innovación',
    questions: [
      {
        id: 8,
        value: 'panel8',
        heading: '¿Cómo asegura Mudebu la calidad en sus proyectos?',
        detail:
          'Implementamos controles de calidad rigurosos y seguimiento continuo en todas las etapas del proyecto para garantizar la satisfacción del cliente.',
      },
      {
        id: 9,
        value: 'panel9',
        heading: '¿Utiliza Mudebu tecnología en el proceso de diseño?',
        detail:
          'Sí, empleamos tecnologías avanzadas, incluyendo software de diseño asistido por computadora (CAD) y herramientas de inteligencia artificial, para visualizar y personalizar proyectos.',
      },
      {
        id: 10,
        value: 'panel10',
        heading:
          '¿Cómo asegura Mudebu que sus productos y servicios se mantienen al día con las tendencias actuales?',
        detail:
          'Nos mantenemos constantemente actualizados con las últimas tendencias en diseño y tecnología, asistiendo a ferias, participando en capacitaciones y colaborando con innovadores del sector.',
      },
      {
        id: 11,
        value: 'panel11',
        heading:
          '¿Cómo contribuye Mudebu a la innovación en el sector del diseño y la construcción?',
        detail:
          'A través de la adopción de nuevas tecnologías, prácticas sostenibles y un enfoque creativo en cada proyecto, lideramos la innovación y establecemos nuevos estándares en el sector.',
      },
    ],
  },
  {
    id: 4,
    category: 'Mobiliario y Personalización',
    questions: [
      {
        id: 12,
        value: 'panel12',
        heading: '¿Qué tipo de mobiliario puede fabricar Mudebu?',
        detail:
          'Fabricamos una amplia gama de mobiliario personalizado, incluyendo pero no limitado a lavabos, pérgolas, escaleras, cocinas, utilizando materiales como madera, metal y acrílicos.',
      },
      {
        id: 13,
        value: 'panel13',
        heading: '¿Mudebu realiza la instalación del mobiliario?',
        detail:
          'Sí, proporcionamos un servicio completo que incluye la instalación del mobiliario asegurando un acabado perfecto.',
      },
      {
        id: 14,
        value: 'panel14',
        heading: '¿Puedo personalizar completamente el mobiliario para que se ajuste a mi espacio?',
        detail:
          'Absolutamente. En Mudebu, especializamos en la personalización total para que el mobiliario se adapte perfectamente a tus necesidades y al espacio disponible.',
      },
      {
        id: 15,
        value: 'panel15',
        heading: '¿Ofrecen opciones de materiales sostenibles para proyectos ecoamigables?',
        detail:
          'Sí, ofrecemos una selección de materiales sostenibles y eco-amigables para clientes que buscan opciones más verdes en sus proyectos.',
      },
    ],
  },
  {
    id: 5,
    category: 'Proceso de Diseño, Colaboración y Cliente',
    questions: [
      {
        id: 16,
        value: 'panel16',
        heading: '¿Cómo puedo solicitar una cotización para mi proyecto?',
        detail:
          'Puedes solicitar una cotización a través de nuestra página web o contactándonos directamente con los detalles de tu proyecto.',
      },
      {
        id: 17,
        value: 'panel17',
        heading: '¿Mudebu colabora con otros profesionales como arquitectos o diseñadores?',
        detail:
          'Sí, colaboramos con una amplia gama de profesionales para garantizar que cada proyecto se ejecute con la máxima eficacia y creatividad.',
      },
      {
        id: 18,
        value: 'panel18',
        heading: '¿Cómo involucra Mudebu a los clientes en el proceso de diseño?',
        detail:
          'Fomentamos la participación activa de nuestros clientes, desde la conceptualización hasta la finalización del proyecto, asegurando que el resultado final cumpla con sus expectativas.',
      },
      {
        id: 19,
        value: 'panel19',
        heading: '¿Cómo funciona el proceso de diseño con Mudebu?',
        detail:
          'Nuestro proceso de diseño comienza con una consulta detallada para entender tus necesidades y preferencias, seguido de la creación de propuestas de diseño personalizadas, revisiones según tus comentarios y la finalización del diseño perfecto para tu espacio.',
      },
      {
        id: 20,
        value: 'panel20',
        heading:
          '¿Qué puedo esperar en términos de experiencia del cliente al trabajar con Mudebu?',
        detail:
          'Puedes esperar una comunicación constante, atención personalizada y un compromiso con tu satisfacción total. Nuestro equipo te guiará en cada paso, desde la conceptualización hasta la finalización del proyecto, asegurando una experiencia inigualable y completamente adaptada a tus necesidades.',
      },
      {
        id: 21,
        value: 'panel21',
        heading: '¿Con qué tipo de profesionales colabora Mudebu para completar un proyecto?',
        detail:
          'Colaboramos con una red diversa de profesionales, incluyendo arquitectos, diseñadores de interiores, ingenieros y artesanos, asegurando que cada proyecto beneficie de una amplia gama de experticias.',
      },
    ],
  },
  {
    id: 6,
    category: 'Mantenimiento, Postventa y Sostenibilidad',
    questions: [
      {
        id: 22,
        value: 'panel22',
        heading: '¿Qué tipo de mantenimiento ofrece Mudebu después de completar un proyecto?',
        detail:
          'Ofrecemos servicios de mantenimiento preventivo y correctivo para asegurar que los espacios y mobiliario se mantengan en óptimas condiciones.',
      },
      {
        id: 23,
        value: 'panel23',
        heading: '¿Qué tipo de garantía viene con los productos y servicios de Mudebu?',
        detail:
          'Todos nuestros productos y servicios vienen con garantías que cubren defectos de fabricación y mano de obra, asegurando tu completa satisfacción.',
      },
      {
        id: 24,
        value: 'panel24',
        heading: '¿Cómo incorpora Mudebu prácticas sostenibles en sus proyectos?',
        detail:
          'Nos comprometemos con la sostenibilidad a través del uso de materiales eco-amigables, optimización de recursos y promoción de prácticas de construcción que minimizan el impacto ambiental.',
      },
      {
        id: 25,
        value: 'panel25',
        heading:
          '¿Ofrece Mudebu opciones ecológicas para proyectos conscientes del medio ambiente?',
        detail:
          'Sí, ofrecemos una amplia gama de opciones ecológicas, incluyendo materiales sostenibles, soluciones de eficiencia energética y prácticas de construcción que minimizan el impacto ambiental.',
      },
    ],
  },
];

export default function FaqsList() {
  const faqsSelected = useSelector((state: RootState) => state.OnBoarding.faqsSelected);
  return (
    <div>
      {faqs
        .find((faq) => faq.id === faqsSelected)
        ?.questions.map((accordion) => (
          <Accordion key={accordion.id}>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
              <Typography variant="subtitle1">{accordion.heading}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>{accordion.detail}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}
