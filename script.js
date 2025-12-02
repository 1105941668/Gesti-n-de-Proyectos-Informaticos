import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// === 1. CONFIGURACIÓN FIREBASE ===
const firebaseConfig = {
  apiKey: "AIzaSyDdKyFcivRj_wFz5HaPytv_Zb4gVbbD0vE",
  authDomain: "gestioninformaticos-d40ae.firebaseapp.com",
  projectId: "gestioninformaticos-d40ae",
  storageBucket: "gestioninformaticos-d40ae.firebasestorage.app",
  messagingSenderId: "859002239168",
  appId: "1:859002239168:web:6967e9f53c07afbb89d525",
  measurementId: "G-6RYSJ1Q0BQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === 2. LISTAS DE CORREOS AUTORIZADOS ===
const correosDosDispositivos = [
    "dpachecog2@unemi.edu.ec", "htigrer@unemi.edu.ec", "sgavilanezp2@unemi.edu.ec", 
    "jzamoram9@unemi.edu.ec", "fcarrillop@unemi.edu.ec", "naguilarb@unemi.edu.ec", 
    "kholguinb2@unemi.edu.ec"
];

const correosUnDispositivo = [
    "cnavarretem4@unemi.edu.ec", "gorellanas2@unemi.edu.ec", "ehidalgoc4@unemi.edu.ec", 
    "lbrionesg3@unemi.edu.ec", "xsalvadorv@unemi.edu.ec", "nbravop4@unemi.edu.ec", 
    "jmoreirap6@unemi.edu.ec", "jcastrof8@unemi.edu.ec", "csanchezl3@unemi.edu.ec",
    "malmachi@unemi.edu.ec"
];

const correosPermitidos = [...correosDosDispositivos, ...correosUnDispositivo];

// === 3. BANCO DE PREGUNTAS (110 PREGUNTAS) ===
const bancoPreguntas = [
  //1
  {
    "tipo": "multiple",
    "pregunta": "En la gestión de proyectos, ¿podemos decir que los procesos son parte de una cadena de calidad cuándo?",
    "opciones": [
      "Los procesos comparten los mismos parámetros de entrada y salida.",
      "Los resultados de un proceso sirven como entradas para otros procesos.",
      "Los costos de un proceso son iguales al resto de procesos.",
      "Los insumos son diferentes para cada proceso."
    ],
    "respuesta": 1,
    "explicacion": "Los procesos forman una cadena de calidad cuando los resultados de un proceso sirven como entradas para otros procesos, creando un flujo continuo de trabajo."
  },
  //2
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál de los siguientes serían ejemplos que corresponden a métricas de calidad relacionados al proyecto?",
    "opciones": [
      "Defectos por fase: Número de defectos encontrados durante cada fase del proyecto.",
      "Corregir el tiempo de respuesta: Tiempo promedio que toma arreglar un defecto.",
      "Solicitudes de cambio: Número de cambios de alcance solicitados por el cliente o patrocinador.",
      "Recursos sobreasignados: Número de recursos sobreasignados a más de una tarea.",
      "Tareas sobrepuestas: Número de tareas (y el monto en dólares de las tareas) cuya finalización ha costado más de lo esperado."
    ],
    "respuestas_correctas": [0, 1],
    "explicacion": "Las métricas de calidad incluyen defectos por fase y tiempo de corrección, que miden directamente la calidad del trabajo realizado."
  },
  //3
  {
    "tipo": "multiple",
    "pregunta": "A qué tipo de técnica general para resolver conflicto, corresponde el siguiente enunciado: busca soluciones que traigan cierto grado de satisfacción a todas las partes para resolver temporal o parcialmente el conflicto.",
    "opciones": [
      "Retirar/evitar.",
      "Suavizar/acomodar.",
      "Compromiso/reconciliación.",
      "Fuerza/Directo.",
      "Colaborar/resolver problemas."
    ],
    "respuesta": 2,
    "explicacion": "El compromiso/reconciliación busca soluciones que traigan cierto grado de satisfacción a todas las partes involucradas en el conflicto."
  },
  //4
  {
    "tipo": "multiple",
    "pregunta": "Complete: Un proceso es un conjunto de _________________, ________________, _________________ utilizados para producir un ____________ o ___________.",
    "opciones": [
      "servicios; productos; materiales; métodos; actividades.",
      "actividades; métodos; materiales; producto; servicio.",
      "actividades; métodos; producto; servicio; materiales;",
      "servicios; actividades; producto; materiales; métodos."
    ],
    "respuesta": 1,
    "explicacion": "Un proceso es un conjunto de actividades, métodos y materiales utilizados para producir un producto o servicio."
  },
  //5
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles son las herramientas sugeridas para la planificación de la gestión de la calidad?",
    "opciones": [
      "Diagrama de control",
      "Diagrama de dispersión",
      "Diagramas de Árbol",
      "Diagramas de flujo",
      "Histogramas",
      "Diagrama causa efecto",
      "Hoja de verificación",
      "Dígrafos de Interrelaciones",
      "Gráficas de programación de decisiones",
      "Diagramas Matriciales",
      "Diagrama de Pareto"
    ],
    "respuestas_correctas": [2, 3, 7, 8, 9],
    "explicacion": "Para la planificación de calidad se utilizan: Diagramas de Árbol, Diagramas de flujo, Dígrafos de Interrelaciones, Gráficas de programación de decisiones y Diagramas Matriciales."
  },
  //6
  {
    "tipo": "multiple",
    "pregunta": "Completar: ___________________________ es un acuerdo legal y vinculante que obliga a proporcionar productos, servicios o resultado por una compensación monetaria.",
    "opciones": [
      "Remuneración o sueldo.",
      "Venta",
      "Compra",
      "Contrato"
    ],
    "respuesta": 3,
    "explicacion": "Un contrato es un acuerdo legal y vinculante que obliga a las partes a proporcionar productos, servicios o resultados a cambio de una compensación monetaria."
  },
  //7
  {
    "tipo": "multiple_seleccion",
    "pregunta": "Identifique cuál es considerada una habilidad genérica de comunicación que debe poseer todo director general de una organización o director de algún proyecto en TI",
    "opciones": [
      "Escuchar de manera activa y eficaz.",
      "Orientar al equipo para optimizar su desempeño.",
      "Organiza las actividades del proyecto.",
      "Mitigar conflictos.",
      "Negociar con las partes interesadas.",
      "Persuadir instigando a los miembros del equipo.",
      "Limita la formación para incrementar conocimiento.",
      "Planifica las actividades del proyecto.",
      "Incentiva las confrontaciones entre equipos."
    ],
    "respuestas_correctas": [0, 3, 4],
    "explicacion": "Las habilidades genéricas de comunicación incluyen: escuchar activamente, mitigar conflictos y negociar con las partes interesadas."
  },
  //8
  {
    "tipo": "multiple",
    "pregunta": "Complete: _______________________________ significa que no existen los recursos suficientes y disponibles para realizar el trabajo asignado durante un periodo de tiempo determinado.",
    "opciones": [
      "Sobreasignación de recursos",
      "Subasignación de recursos",
      "Redistribución de recursos",
      "Reprogramación de recursos",
      "Sobredimensión de recursos."
    ],
    "respuesta": 0,
    "explicacion": "La sobreasignación de recursos ocurre cuando no hay recursos suficientes disponibles para realizar el trabajo asignado en el tiempo determinado."
  },
  //9
  {
    "tipo": "multiple_seleccion",
    "pregunta": "A partir de los siguiente, identifique cuál corresponde a los costos de falla o mala calidad externos.",
    "opciones": [
      "Costos por pérdidas de clientes.",
      "Costos por retrabajo",
      "Costos por desperdicio o chatarra.",
      "Costos por responsabilidades.",
      "Quejas de clientes",
      "Costos por garantías"
    ],
    "respuestas_correctas": [0, 3, 4, 5],
    "explicacion": "Los costos de falla externos incluyen: pérdidas de clientes, responsabilidades, quejas de clientes y costos por garantías."
  },
  //10
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál(es) de los siguientes son considerados métodos de la comunicación?",
    "opciones": [
      "Método Pull",
      "Asincrónico",
      "Método interactivo",
      "Sincrónico",
      "Método Push"
    ],
    "respuestas_correctas": [0, 2, 4],
    "explicacion": "Los métodos de comunicación son: Método Pull, Método interactivo y Método Push."
  },
  //11
  {
    "tipo": "emparejamiento",
    "pregunta": "En el contexto de la reunión final y presentación de un proyecto. Identifique y relacione sus beneficios.",
    "pares": [
      {
        "izquierda": "Comunicar",
        "derecha": "Conclusión del proyecto."
      },
      {
        "izquierda": "Transferir",
        "derecha": "Producto, servicio o resultado a la organización."
      },
      {
        "izquierda": "Reconocer",
        "derecha": "Contribuciones del equipo del Proyecto y otros interesados."
      },
      {
        "izquierda": "Obtener",
        "derecha": "Aprobación formal del proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "En la reunión final: se comunica la conclusión, se transfiere el producto a la organización, se reconocen las contribuciones y se obtiene la aprobación formal."
  },
  //12
  {
    "tipo": "multiple",
    "pregunta": "Dentro de los grupos de procesos de gestión de proyectos, ¿a qué grupo corresponden los siguientes productos y/o entregables? Archivar documentos del proyecto, Aceptación formal de resultados del proyecto o fase, Cerrar contratos, lecciones aprendidas, Acta entrega-recepción formal.",
    "opciones": [
      "Proceso de seguimiento y control",
      "Proceso de Cierre",
      "Proceso de ejecución",
      "Proceso de planificación"
    ],
    "respuesta": 1,
    "explicacion": "Estas actividades y entregables corresponden al proceso de Cierre del proyecto."
  },
  //13
  {
    "tipo": "multiple",
    "pregunta": "Complete: ___________________________ tiende a ver el proyecto como una relación comprador-vendedor a corto plazo, donde sacar el máximo provecho de su dinero es el criterio más importante para aceptar el proyecto. ¿Qué tipo de patrocinador es?",
    "opciones": [
      "Patrocinador informado",
      "Patrocinador negociador.",
      "Patrocinador miope",
      "Patrocinador objetivo"
    ],
    "respuesta": 1,
    "explicacion": "El patrocinador negociador ve el proyecto como una relación comprador-vendedor donde lo más importante es sacar el máximo provecho económico."
  },
  //14
  {
    "tipo": "multiple_seleccion",
    "pregunta": "Son actividades de gestión de cambio:",
    "opciones": [
      "Informar a los grupos de interés afectados del cambio en el proyecto.",
      "Verificar y comunicar el progreso del desempeño.",
      "Mantener la integridad de las líneas base.",
      "Supervisar la ejecución del proyecto.",
      "Controlar que los hitos se cumplan respecto a lo previsto en la planificación.",
      "Gestionar solo los cambios aprobados.",
      "Evaluar, aprobar y/o rechazar acciones preventivas y correctivas propuestas.",
      "Llevar a buen puerto el proyecto y alcanzar los objetivos trazados."
    ],
    "respuestas_correctas": [0, 2, 5, 6],
    "explicacion": "Las actividades de gestión de cambio incluyen: informar a grupos de interés, mantener integridad de líneas base, gestionar solo cambios aprobados y evaluar/aprobar acciones correctivas."
  },
  //15
  {
    "tipo": "multiple",
    "pregunta": "Dentro del contenido de informe de entrega de resultados de un proyecto, los siguientes documentos corresponden a que sección del informe: Documentación de sistemas, Manual de usuario, Materiales de formación, Documentación de mantenimiento.",
    "opciones": [
      "Cuestiones pendientes.",
      "Comparación de lo planificado con lo real.",
      "Lista de documentos del proyecto.",
      "Resumen del proyecto."
    ],
    "respuesta": 2,
    "explicacion": "Estos documentos corresponden a la sección 'Lista de documentos del proyecto' en el informe de entrega."
  },
  //16
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál(es) de los siguientes son errores de forma que pueden ser subsanados y que no afectan a la planificación o alcance del proyecto?",
    "opciones": [
      "Error en la transcripción de un dato",
      "Error en las estimaciones de tiempo del proyecto.",
      "Omisión de información en documento.",
      "Error en cálculos de costos del proyecto.",
      "Errores en el formato del documento"
    ],
    "respuestas_correctas": [0, 2, 4],
    "explicacion": "Los errores de forma que no afectan planificación o alcance son: errores de transcripción, omisiones de información y errores de formato."
  },
  //17
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál(es) de las siguientes son herramientas y técnicas aplicadas al control integrado de cambios?",
    "opciones": [
      "Sistemas de información de gestión de proyectos.",
      "Reuniones de control de cambios.",
      "Técnicas analíticas",
      "Juicio de expertos"
    ],
    "respuestas_correctas": [0, 1, 2, 3],
    "explicacion": "Todas las opciones son herramientas y técnicas aplicadas al control integrado de cambios."
  },
  //18
  {
    "tipo": "emparejamiento",
    "pregunta": "Identifique y relacione los procesos del ciclo de vida de un proyecto con los hitos y/o entregables que corresponda.",
    "pares": [
      {
        "izquierda": "Inicio",
        "derecha": "Elaborar los objetivos del proyecto"
      },
      {
        "izquierda": "Monitoreo y control",
        "derecha": "Estado de rendimiento"
      },
      {
        "izquierda": "Planeación",
        "derecha": "Plan de gestión del proyecto autorizado"
      },
      {
        "izquierda": "Ejecución",
        "derecha": "Proyecto alineado a la estrategia corporativa"
      },
      {
        "izquierda": "Cierre",
        "derecha": "Acta entrega-recepción"
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada fase del ciclo de vida tiene hitos específicos: Inicio-Elaborar los objetivos del proyecto, Monitoreo-Estado de rendimiento, Planeación-Plan de gestión del proyecto autorizado, Ejecución-Proyecto alineado a la estrategia corporativa, Cierre-Acta entrega-recepción."
  },
  //19
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál(es) de los siguientes son herramientas y técnicas para monitorear y controlar proyectos?",
    "opciones": [
      "Gestión del valor ganado",
      "Previsiones de costes",
      "Analítica de regresión",
      "Pronósticos del cronograma",
      "Sistema de información de gestión de proyectos.",
      "Juicio de expertos"
    ],
    "respuestas_correctas": [0, 1, 3, 4, 5],
    "explicacion": "Las herramientas para monitorear y controlar incluyen: valor ganado, previsiones de costes, pronósticos del cronograma, sistemas de información y juicio de expertos."
  },
  //20
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál(es) tipos de cambios que pueden afectar a la planificación o al alcance de gestión del proyecto o sus planes subyacentes?",
    "opciones": [
      "Metodología de desarrollo del proveedor.",
      "Estructura interna organizacional de la empresa.",
      "Presupuesto del proyecto.",
      "Nuevos competidores.",
      "Cronograma o actividades del proyecto.",
      "Descripción del alcance del proyecto.",
      "Personal del equipo del proyecto"
    ],
    "respuestas_correctas": [2, 4, 5, 6],
    "explicacion": "Los cambios que afectan la planificación/alcance son: presupuesto, cronograma, descripción del alcance y personal del equipo."
  },
  //21
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál(es) de las siguientes es(son) responsabilidad(es) del director del proyecto cuando se producen cambios respecto al plan del proyecto autorizado?",
    "opciones": [
      "Supervisar la línea base y rendimiento esperado.",
      "Proponer acciones correctivas ante posibles problemas.",
      "Garantizar solo implementar cambios aprobados.",
      "Controlar los cambios",
      "Proponer acciones preventivas ante posibles problemas."
    ],
    "respuestas_correctas": [0, 1, 2, 3, 4],
    "explicacion": "Todas las opciones son responsabilidades del director cuando ocurren cambios: supervisar línea base, proponer acciones correctivas y preventivas, garantizar solo cambios aprobados y controlar los cambios."
  },
  //22
  {
    "tipo": "multiple",
    "pregunta": "Los siguientes son beneficios claves de que tipo de control nos referimos? 1. Identificar las causas de errores del proceso y/o producto, y recomendar medidas de acción para eliminarlas. 2. Validar los entregables con la finalidad de cumplir con los requisitos especificados por las partes interesadas según el plan.",
    "opciones": [
      "Control de calidad",
      "Control de alcance",
      "Control de riesgos",
      "Control integrado de cambios"
    ],
    "respuesta": 0,
    "explicacion": "Estos beneficios corresponden al control de calidad, que identifica causas de errores y valida entregables según requisitos."
  },
  //23
  {
    "tipo": "multiple_seleccion",
    "pregunta": "Como refiere J. Davidson Frame (1998), el director y el equipo del proyecto deben estar preparados para hacer frente a las siguientes realidades:",
    "opciones": [
      "Los recursos se están agotando.",
      "Aún existen errores derivados del proyecto.",
      "La documentación adquiere una importancia primordial.",
      "Miembros del equipo están preocupados por futuros trabajos."
    ],
    "respuestas_correctas": [0, 1, 2, 3],
    "explicacion": "Todas las opciones son realidades que el director y equipo deben enfrentar según Frame (1998)."
  },
  //24
  {
    "tipo": "multiple_seleccion",
    "pregunta": "En el contexto de aceptación de entregables. Si el patrocinador sea del estilo miope o informado, el director o gerente del proyecto y su equipo pueden mejorar la probabilidad de que el proyecto sea aceptado si:",
    "opciones": [
      "Cierra la contabilidad del proyecto incluyendo contrataciones y liquidaciones",
      "Desarrollar una revisión final del proyecto.",
      "Documentar la finalización de todos los entregables e hitos del proyecto",
      "Definen claramente los criterios de aceptación en las primeras etapas del proyecto.",
      "Cuenta con procedimientos de cambios de alcance"
    ],
    "respuestas_correctas": [1, 2, 3],
    "explicacion": "Para mejorar la aceptación se debe: desarrollar revisión final, documentar finalización de entregables/hitos y definir criterios de aceptación tempranamente."
  },
  //25
  {
    "tipo": "multiple_seleccion",
    "pregunta": "En paralelo, algunas actividades adicionales necesitan ser llevadas a cabo en la etapa de cierre. Un conjunto completo de registros derivados del proyecto debe ser preparado para el archivo, incluyendo:",
    "opciones": [
      "Supervisar la implementación de cambios aprobados.",
      "Analizar riesgos existentes e identificar nuevos riesgos para el proyecto.",
      "Documentar el impacto total de las solicitudes de cambio.",
      "Liberar los recursos del proyecto",
      "Elaborar un informe final del proyecto",
      "Revisar, analizar y aprobar todas las solicitudes de cambio.",
      "Reunión con los clientes para lograr aprobación final de los entregables",
      "Cerrar la contabilidad del proyecto incluyendo contrataciones y liquidaciones"
    ],
    "respuestas_correctas": [4, 7],
    "explicacion": "En el cierre se debe: elaborar informe final y cerrar la contabilidad del proyecto incluyendo contrataciones y liquidaciones."
  },
  //26
  {
    "tipo": "multiple",
    "pregunta": "Complete: ______________________es la instancia responsable de aprobar o rechazar las solicitudes de cambio en un proyecto.",
    "opciones": [
      "Comité de evaluación del proyecto.",
      "Director del proyecto",
      "Comité de control de cambios.",
      "Directores de área de la organización ejecutante.",
      "Junta directiva de la organización ejecutante."
    ],
    "respuesta": 2,
    "explicacion": "El Comité de control de cambios (CCB) es la instancia responsable de aprobar o rechazar solicitudes de cambio."
  },
  //27
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles de las siguientes son razones para terminar un proyecto?",
    "opciones": [
      "Prioridades normales",
      "Cambio de política o leyes gubernamentales.",
      "Prematuro",
      "Perpetuo",
      "Fallido",
      "Nuevo producto o tecnología de la competencia",
      "Prioridades cambiadas"
    ],
    "respuestas_correctas": [0, 1, 2, 3, 4, 5, 6],
    "explicacion": "Todas las opciones son razones válidas para terminar un proyecto: normal, prematuro, perpetuo, fallido, cambios externos o de prioridades."
  },
  //28
  {
    "tipo": "multiple",
    "pregunta": "¿Qué indica el análisis de sensibilidad cuando la TIR de un proyecto es sensible a pequeñas variaciones en los flujos de efectivo?",
    "opciones": [
      "El proyecto tiene un alto riesgo ya que sus resultados dependen de pequeñas variaciones.",
      "El proyecto es estable y no presenta riesgos.",
      "El proyecto no genera valor significativo.",
      "El proyecto debe ser aceptado sin ajustes."
    ],
    "respuesta": 0,
    "explicacion": "Si la TIR es sensible a pequeñas variaciones, indica alto riesgo porque pequeños cambios pueden afectar significativamente los resultados."
  },
  //29
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Qué tipo de información debe estar incluida en el Project Charter?",
    "opciones": [
      "Lista de los principales interesados.",
      "Nombre y descripción del proyecto.",
      "Plan de gestión de riesgos.",
      "Cronograma detallado del proyecto."
    ],
    "respuestas_correctas": [0, 1],
    "explicacion": "El Project Charter debe incluir la lista de principales interesados y el nombre y descripción del proyecto."
  },
  //30
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los criterios de aceptación del VAN con sus características:",
    "pares": [
      {
        "izquierda": "VAN igual a cero",
        "derecha": "El proyecto no genera ni ganancias ni pérdidas."
      },
      {
        "izquierda": "VAN negativo",
        "derecha": "El proyecto debería ser rechazado."
      },
      {
        "izquierda": "VAN mayor que cero",
        "derecha": "Incrementa la riqueza de los accionistas."
      },
      {
        "izquierda": "VAN positivo",
        "derecha": "El proyecto debería ser aceptado."
      }
    ],
    "respuesta": 0,
    "explicacion": "VAN=0: no hay ganancias ni pérdidas; VAN negativo: rechazar; VAN>0: incrementa riqueza; VAN positivo: aceptar."
  },
  //31
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es una de las principales razones para realizar reuniones en los proyectos?",
    "opciones": [
      "Controlar el presupuesto del proyecto.",
      "Crear y potenciar la identidad del equipo de trabajo.",
      "Realizar el análisis de riesgos.",
      "Definir el alcance del proyecto."
    ],
    "respuesta": 1,
    "explicacion": "Una razón principal para realizar reuniones es crear y potenciar la identidad del equipo de trabajo, fortaleciendo la cohesión del grupo."
  },
  //32
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja las fuentes de financiamiento externo con sus características:",
    "pares": [
      {
        "izquierda": "Préstamos bancarios",
        "derecha": "Fondos otorgados por instituciones financieras con pago de intereses."
      },
      {
        "izquierda": "Bonos",
        "derecha": "Títulos de deuda emitidos por empresas o gobiernos para recaudar fondos."
      },
      {
        "izquierda": "Crowdfunding",
        "derecha": "Financiamiento obtenido a través de contribuciones de múltiples personas."
      },
      {
        "izquierda": "Venture capital",
        "derecha": "Financiamiento provisto por inversores a startups con potencial de crecimiento."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada fuente de financiamiento tiene características específicas: préstamos con intereses, bonos de deuda, crowdfunding colaborativo y venture capital para startups."
  },
  //33
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Qué herramientas son útiles para el control de un proyecto?",
    "opciones": [
      "Establecimiento del alcance",
      "Gestión del valor ganado",
      "Planificación de recursos",
      "Análisis de tendencia"
    ],
    "respuestas_correctas": [1, 3],
    "explicacion": "Para el control del proyecto son útiles la gestión del valor ganado y el análisis de tendencia."
  },
  //34
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja las modalidades de financiamiento con sus características:",
    "pares": [
      {
        "izquierda": "Préstamo a corto plazo",
        "derecha": "Se paga en un periodo de tiempo breve, generalmente menos de un año."
      },
      {
        "izquierda": "Préstamo a largo plazo",
        "derecha": "Se paga a lo largo de varios años, con intereses acumulados."
      },
      {
        "izquierda": "Leasing",
        "derecha": "Alquila bienes para su uso temporal."
      },
      {
        "izquierda": "Factoring",
        "derecha": "Venta de cuentas por cobrar a un tercero."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada modalidad tiene características específicas: préstamos corto/largo plazo por duración, leasing por alquiler y factoring por venta de cuentas por cobrar."
  },
  //35
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles son pasos clave en el control del presupuesto de un proyecto?",
    "opciones": [
      "Hacer ajustes en los pronósticos de costos según el progreso",
      "Revisar el presupuesto real frente al presupuesto planificado",
      "Asignar recursos adicionales",
      "Definir el presupuesto del proyecto"
    ],
    "respuestas_correctas": [0, 1],
    "explicacion": "Los pasos clave para controlar el presupuesto son: hacer ajustes en pronósticos según progreso y revisar presupuesto real vs planificado."
  },
  //36
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja las funciones del gerente de proyecto con sus descripciones correspondientes:",
    "pares": [
      {
        "izquierda": "Planificación",
        "derecha": "Asignar recursos y tiempos para cada tarea."
      },
      {
        "izquierda": "Control",
        "derecha": "Supervisar el progreso y hacer ajustes."
      },
      {
        "izquierda": "Ejecución",
        "derecha": "Llevar a cabo las actividades planificadas."
      },
      {
        "izquierda": "Cierre",
        "derecha": "Completar formalmente el proyecto y entregarlo."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada función del gerente tiene un propósito: planificación-asignación, control-supervisión, ejecución-llevar a cabo, cierre-completar."
  },
  //37
  {
    "tipo": "multiple",
    "pregunta": "Complete: ______________________es el proceso de definir la disponibilidad del personal (equipo del proyecto) y obtener el personal necesario para completar las actividades planificadas del proyecto.",
    "opciones": [
      "Desarrollar el equipo del proyecto.",
      "Planificar la gestión de recursos humanos.",
      "Adquirir el equipo del proyecto.",
      "Gestionar el equipo del proyecto."
    ],
    "respuesta": 2,
    "explicacion": "Adquirir el equipo del proyecto es el proceso de definir disponibilidad y obtener el personal necesario para las actividades planificadas."
  },
  //38
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles de los siguientes son herramientas y técnicas utilizadas para gestionar el equipo del proyecto?",
    "opciones": [
      "Asignación previa.",
      "Gestión de conflictos.",
      "Habilidades interpersonales.",
      "Evaluación del desempeño.",
      "Adquisición.",
      "Observación y conversación.",
      "Negociación."
    ],
    "respuestas_correctas": [1, 2, 3, 5],
    "explicacion": "Para gestionar el equipo se utilizan: gestión de conflictos, habilidades interpersonales, evaluación del desempeño y observación/conversación."
  },
  //39
  {
    "tipo": "multiple",
    "pregunta": "Dado el análisis de requisitos de comunicación, un director o gerente debe considerar la cantidad de posibles canales de comunicación como un indicador de la complejidad. Aplicando la fórmula para obtener el número de canales de comunicación. ¿Cuántos canales de comunicación obtendría para un proyecto con: Jefe de desarrolladores: 2 integrantes, Desarrolladores del módulo de RRHH: 4 integrantes, Usuarios clave del área de RRHH: 2 integrantes?",
    "opciones": [
      "16 canales de comunicación potenciales.",
      "24 canales de comunicación potenciales.",
      "28 canales de comunicación potenciales.",
      "12 canales de comunicación potenciales."
    ],
    "respuesta": 2,
    "explicacion": "Total de personas: 2+4+2=8. Fórmula: n(n-1)/2 = 8(7)/2 = 28 canales de comunicación potenciales."
  },
  //40
  {
    "tipo": "multiple",
    "pregunta": "Complete: __________________________significa que la información sea proporcionada en el formato adecuado, en el momento adecuado y con el impacto adecuado.",
    "opciones": [
      "Comunicación afectiva.",
      "Comunicación efectiva.",
      "Comunicación objetiva.",
      "Comunicación asertiva."
    ],
    "respuesta": 1,
    "explicacion": "Comunicación efectiva significa proporcionar información en el formato, momento e impacto adecuados."
  },
  //41
  {
    "tipo": "multiple_seleccion",
    "pregunta": "En un proyecto de desarrollo de software, el sistema en sí, es el producto más importante del proyecto; el cuál debe ser apto para el uso y conforme a los requisitos especificados, por ende estos insumos deben estar descritos en qué documentos?",
    "opciones": [
      "Requisitos funcionales.",
      "Alcance del proyecto.",
      "Cronograma del proyecto.",
      "Presupuesto.",
      "Manuales técnicos de usuario y desarrollo."
    ],
    "respuestas_correctas": [0, 1, 4],
    "explicacion": "Los requisitos y especificaciones deben estar en: requisitos funcionales, alcance del proyecto y manuales técnicos."
  },
  //42
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál de los siguientes son factores que pueden afectar la elección de la tecnología empleada para la gestión de las comunicaciones?",
    "opciones": [
      "Disponibilidad de la tecnología.",
      "Facilidad de uso",
      "Confidencialidad de la información",
      "Urgencia de la necesidad de la información.",
      "Disponibilidad de la información"
    ],
    "respuestas_correctas": [0, 1, 2, 3],
    "explicacion": "Los factores que afectan la elección de tecnología son: disponibilidad, facilidad de uso, confidencialidad y urgencia de la información."
  },
  //43
  {
    "tipo": "multiple",
    "pregunta": "Complete: ____________________es el proceso que permite crear, recopilar, distribuir, almacenar, recuperar y disponer de la información final del proyecto.",
    "opciones": [
      "Administrar las comunicaciones",
      "Controlar las comunicaciones",
      "Organizar las comunicaciones",
      "Planificar la gestión de las comunicaciones"
    ],
    "respuesta": 1,
    "explicacion": "Controlar las comunicaciones es el proceso de crear, recopilar, distribuir, almacenar, recuperar y disponer de la información final."
  },
  //44
  {
    "tipo": "multiple",
    "pregunta": "La planificación de las comunicaciones se las realiza durante:",
    "opciones": [
      "Ejecución del plan de proyecto.",
      "Análisis de necesidades y requerimientos.",
      "Diseño del plan de la gestión del proyecto.",
      "Desarrollo del plan del proyecto."
    ],
    "respuesta": 2,
    "explicacion": "La planificación de las comunicaciones se realiza durante el diseño del plan de la gestión del proyecto."
  },
  //45
  {
    "tipo": "multiple",
    "pregunta": "Complete: _______________________________ es una técnica de proceso formal de revisión o evaluación de los oferentes, de acuerdo con las políticas de adquisición del comprador.",
    "opciones": [
      "Evaluación de Propuestas",
      "Estimaciones Independientes",
      "Conferencias de oferentes.",
      "Negociación de Adquisiciones"
    ],
    "respuesta": 0,
    "explicacion": "La Evaluación de Propuestas es el proceso formal de revisión de oferentes según políticas de adquisición."
  },
  //46
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles son las herramientas sugeridas para la realización del aseguramiento de la calidad?",
    "opciones": [
      "Diagrama de Pareto",
      "Histogramas",
      "Diagramas de flujo",
      "Diagrama de Red de la Actividad",
      "Dígrafos de Interrelaciones",
      "Gráficas de programación de decisiones",
      "Matrices de Priorización",
      "Diagrama causa efecto",
      "Diagramas de Árbol",
      "Diagramas Matriciales",
      "Hoja de verificación"
    ],
    "respuestas_correctas": [2, 4, 5, 6, 8, 9],
    "explicacion": "Para aseguramiento de calidad se usan: diagramas de flujo, dígrafos de interrelaciones, gráficas de programación, matrices de priorización, diagramas de árbol y diagramas matriciales."
  },
  //47
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los documentos de un proyecto con su propósito principal:",
    "pares": [
      {
        "izquierda": "Acta de Constitución",
        "derecha": "Describe los entregables y objetivos del proyecto."
      },
      {
        "izquierda": "Plan de Gestión",
        "derecha": "Asegura la correcta asignación de recursos y tiempos."
      },
      {
        "izquierda": "Registro de Riesgos",
        "derecha": "Registra los posibles eventos que podrían afectar el proyecto."
      },
      {
        "izquierda": "Informe de Progreso",
        "derecha": "Proporciona actualizaciones sobre el estado actual del proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada documento tiene un propósito: Acta-objetivos, Plan-recursos/tiempos, Registro-riesgos, Informe-estado actual."
  },
  //48
  {
    "tipo": "multiple",
    "pregunta": "¿Qué debe priorizar un gerente de proyecto cuando el presupuesto y tiempo son fijos pero surge una nueva necesidad?",
    "opciones": [
      "Asignar más recursos sin aprobación.",
      "Reevaluar el alcance y negociar con el patrocinador.",
      "Eliminar la necesidad sin documentarla.",
      "Suspender el proyecto hasta obtener más fondos."
    ],
    "respuesta": 1,
    "explicacion": "Con presupuesto y tiempo fijos, se debe reevaluar el alcance y negociar con el patrocinador para gestionar la nueva necesidad."
  },
  //49
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Qué actividades administrativas integran el proceso de cierre de un proyecto?",
    "opciones": [
      "Archivar documentos de proyecto.",
      "Documentar lecciones aprendidas.",
      "Definición y autorización de un proyecto o fase.",
      "Diseñar y mantener un plan de trabajo.",
      "Coordinar las personas y recursos",
      "Recibir aceptación formal del trabajo entregado.",
      "Cerrar contratos"
    ],
    "respuestas_correctas": [0, 1, 5, 6],
    "explicacion": "El cierre incluye: archivar documentos, documentar lecciones aprendidas, recibir aceptación formal y cerrar contratos."
  },
  //50
  {
    "tipo": "multiple_seleccion",
    "pregunta": "El beneficio clave del seguimiento y control del trabajo del proyecto es que permite a las partes interesadas comprender:",
    "opciones": [
      "El pronósticos del alcance.",
      "El cronograma actual del proyecto.",
      "Presupuesto actual del proyecto.",
      "Estado actual del proyecto.",
      "El plan de la gestión del proyecto.",
      "La lista de interesados del proyecto."
    ],
    "respuestas_correctas": [3],
    "explicacion": "El beneficio clave del seguimiento y control es comprender el estado actual del proyecto."
  },
  //51
  {
    "tipo": "multiple_seleccion",
    "pregunta": "A partir del siguiente enunciado, identifique cuál o cuáles limita la gestión del control integrado de cambios? Realizar el control integrado de cambios es el proceso de revisar todas las solicitudes de cambio, aprobadas o no; gestionando los cambios en:",
    "opciones": [
      "Plan de gestión",
      "Comunicar del cambio a todo el equipo.",
      "Entregables",
      "Actualización de documentos",
      "Línea base"
    ],
    "respuestas_correctas": [0, 2, 4],
    "explicacion": "El control integrado de cambios gestiona cambios en: plan de gestión, entregables y línea base."
  },
  //52
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la alternativa correcta: En el caso de cierre de un proyecto de desarrollo de software, se considera aceptado el producto final ¿Cuándo?",
    "opciones": [
      "Entregas parciales o preliminares por cada fase, actividad, tarea mediante reuniones informales.",
      "Con entregas parciales o finales que involucre entregables.",
      "Con entregas parciales o finales que involucre entregables, verificados, validados y certificados formalmente por el cliente.",
      "Con la entrega, instalación e implementación del software."
    ],
    "respuesta": 2,
    "explicacion": "El producto se acepta cuando los entregables están verificados, validados y certificados formalmente por el cliente."
  },
  //53
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál de los siguientes son características del control integrado de cambios?",
    "opciones": [
      "Evaluar el desempeño para resolver si aplicar alguna medida preventiva o correctiva.",
      "Mantener actualizados los planes adyacentes al proyecto.",
      "Responder a eventos o incidencias.",
      "Cualquier interesado puede proponer cambios o ajustes.",
      "Mantener una base de información actualizada sobre los productos del proyecto.",
      "Contrastar el desempeño real del proyecto en el plan original."
    ],
    "respuestas_correctas": [0, 1, 3, 4],
    "explicacion": "Las características del control integrado incluyen: evaluar desempeño, mantener planes actualizados, permitir propuestas de cambio y mantener información actualizada."
  },
  //54
  {
    "tipo": "multiple",
    "pregunta": "Complete: __________________ se define como un conjunto de indicadores seleccionados para el seguimiento y evaluación sistémica del proyecto o programa, donde su primera muestra representa una primera medición.",
    "opciones": [
      "Línea base",
      "Indicador",
      "Métrica",
      "Hito"
    ],
    "respuesta": 0,
    "explicacion": "La línea base es el conjunto de indicadores para seguimiento y evaluación, con su primera muestra como primera medición."
  },
  //55
  {
    "tipo": "multiple",
    "pregunta": "Complete: ________________________ es la entrega formal de fases, actividades y tareas, así como del producto, servicio o resultado definitivo.",
    "opciones": [
      "Etapa de planificación",
      "Etapa de cierre",
      "Etapa de seguimiento y control",
      "Etapa de ejecución"
    ],
    "respuesta": 1,
    "explicacion": "La etapa de cierre es donde se realiza la entrega formal de fases, actividades, tareas y el producto/servicio final."
  },
  //56
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja las técnicas de gestión de proyectos con sus aplicaciones correspondientes:",
    "pares": [
      {
        "izquierda": "Análisis FODA",
        "derecha": "Identifica fortalezas, oportunidades, debilidades y amenazas."
      },
      {
        "izquierda": "Análisis de ruta crítica",
        "derecha": "Calcula el camino más largo para completar el proyecto."
      },
      {
        "izquierda": "Análisis de valor ganado",
        "derecha": "Mide el rendimiento del proyecto en función del costo y tiempo."
      },
      {
        "izquierda": "Diagrama de flujo",
        "derecha": "Representa visualmente los pasos de un proceso."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada técnica tiene su aplicación: FODA-análisis estratégico, Ruta crítica-camino más largo, Valor ganado-rendimiento, Diagrama de flujo-visualización de procesos."
  },
  //57
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál de los siguientes representa un ejemplo de fracaso por mal control del alcance?",
    "opciones": [
      "Cumplir todos los entregables en menos tiempo.",
      "Actualizar el cronograma con retroalimentación del equipo.",
      "Negociar con usuarios la priorización de entregables.",
      "Incluir funcionalidades no planificadas sin autorización formal."
    ],
    "respuesta": 3,
    "explicacion": "Incluir funcionalidades no planificadas sin autorización formal es un ejemplo claro de mal control del alcance."
  },
  //58
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles son técnicas comunes para realizar un seguimiento efectivo durante la ejecución de un proyecto?",
    "opciones": [
      "Análisis del valor ganado (EVM)",
      "Revisión de progreso frente al cronograma",
      "Definir el alcance del proyecto",
      "Revisar los objetivos del proyecto"
    ],
    "respuestas_correctas": [0, 1],
    "explicacion": "Las técnicas comunes para seguimiento son: análisis del valor ganado (EVM) y revisión de progreso frente al cronograma."
  },
  //59
  {
    "tipo": "multiple",
    "pregunta": "En un proyecto TI que se encuentra con retrasos en el cronograma, ¿cuál sería una forma válida de mantener el cumplimiento del alcance y calidad?",
    "opciones": [
      "Cambiar el gerente del proyecto sin informar al equipo.",
      "Eliminar requisitos de calidad para ahorrar tiempo.",
      "Reducir el alcance sin aprobación del patrocinador.",
      "Aumentar el presupuesto para incorporar más recursos."
    ],
    "respuesta": 3,
    "explicacion": "Aumentar el presupuesto para incorporar más recursos permite mantener el alcance y calidad ante retrasos en el cronograma."
  },
  //60
  {
    "tipo": "multiple_seleccion",
    "pregunta": "A partir del siguiente enunciado, identifique los componentes que encierra la siguiente afirmación: Los grupos de procesos de seguimiento y control del proyecto están determinados por aquellos procesos orientados a:",
    "opciones": [
      "Analizar el progreso y rendimiento del proyecto",
      "Supervisar el progreso y rendimiento del proyecto",
      "Planificar el progreso y rendimiento del proyecto",
      "Evaluar el progreso y rendimiento del proyecto",
      "Medir el progreso y rendimiento del proyecto"
    ],
    "respuestas_correctas": [0, 1, 3, 4],
    "explicacion": "Los procesos de seguimiento y control están orientados a: analizar, supervisar, evaluar y medir el progreso y rendimiento."
  },
  //61
  {
    "tipo": "multiple_seleccion",
    "pregunta": "Con frecuencia, las lecciones aprendidas son puestas en segundo plano, por factores tales como:",
    "opciones": [
      "Presión para cumplir los plazos",
      "Rediseño de controles en proyectos futuros",
      "Factores de cultura organizacional",
      "Oportunidad de mejora continua",
      "Falta de interés o motivación"
    ],
    "respuestas_correctas": [0, 2, 4],
    "explicacion": "Las lecciones aprendidas se descuidan por: presión de plazos, factores culturales organizacionales y falta de interés/motivación."
  },
  //62
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál (es) de las siguientes son actividades del proceso de control integrado de cambios?",
    "opciones": [
      "Documentar el impacto total de las solicitudes de cambio",
      "Influir en la afectación general debido al control integrado de cambios",
      "Proporcionar información para respaldar informes de estado, medición de progreso y la previsión",
      "Mantener una base de información actualizada sobre los productos del proyecto",
      "Revisar, analizar y aprobar todas las solicitudes de cambio"
    ],
    "respuestas_correctas": [0, 3, 4],
    "explicacion": "Las actividades del control integrado incluyen: documentar impacto, mantener información actualizada y revisar/analizar/aprobar solicitudes."
  },
  //63
  {
    "tipo": "multiple_seleccion",
    "pregunta": "Para (Ramon Rodriguez & Mariné, 2020) un informe de rendimiento puede incluir información sobre:",
    "opciones": [
      "Rendimiento actual y su análisis",
      "Perfil de nuevas contrataciones de personal",
      "Situación de los riesgos y problemas",
      "Cotizaciones de compras o adquisiciones",
      "Próximas tareas",
      "Cambios aprobados en el periodo",
      "Errores, omisiones e inconsistencias",
      "Grado de avance del proyecto"
    ],
    "respuestas_correctas": [0, 2, 4, 5, 7],
    "explicacion": "Un informe de rendimiento incluye: rendimiento y análisis, situación de riesgos, próximas tareas, cambios aprobados y grado de avance."
  },
  //64
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál de las siguientes afirmaciones no es correcta, en el contexto del grupo de proceso de cierre de un proyecto?",
    "opciones": [
      "Cada fase de proyecto puede cerrar sus entregas",
      "Las actividades de cierre no deben planificarse hasta la finalización del proyecto",
      "Muy rara vez atender y satisfacer las necesidades de todos los grupos de interés",
      "Evitar capitalizar el conocimiento y habilidades de los colaboradores en base de datos"
    ],
    "respuesta": 1,
    "explicacion": "Es INCORRECTO que las actividades de cierre no deban planificarse hasta la finalización; deben planificarse desde el inicio."
  },
  //65
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál de los siguientes casos de proyectos son aptos para ser cerrados?",
    "opciones": [
      "Proyectos cancelados",
      "Proyectos suspendidos por falta de presupuesto",
      "Proyectos con resultados finales",
      "Todos los proyectos deben ser cerrados independientemente de sus resultados"
    ],
    "respuestas_correctas": [3],
    "explicacion": "Todos los proyectos deben ser cerrados formalmente, independientemente de sus resultados (exitosos, cancelados o suspendidos)."
  },
  //66
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Con que propósito las organizaciones competitivas dedican tiempo a capitalizar conocimiento de sus proyectos?",
    "opciones": [
      "Alcanzar mejores resultados en próximos proyectos",
      "Aprender de sus proyectos exitosos o no",
      "Cumplir por la cultura organizacional del equipo",
      "Cumplir con las políticas de la organización ejecutable"
    ],
    "respuestas_correctas": [0, 1],
    "explicacion": "Las organizaciones capitalizan conocimiento para: alcanzar mejores resultados futuros y aprender de proyectos exitosos o no."
  },
  //67
  {
    "tipo": "multiple",
    "pregunta": "Complete: __________________ y ______________ el trabajo del proyecto es el proceso de ___________________, _________________ y __________________ el progreso del desempeño para cumplir con los objetivos del plan.",
    "opciones": [
      "Monitorear; verificar; controlar; supervisar; comunicar",
      "Verificar; controlar; supervisar; monitorear; comunicar",
      "Monitorea; verificar; comunicar; controlar; supervisar",
      "Controlar; supervisar; monitorear; verificar; comunicar"
    ],
    "respuesta": 0,
    "explicacion": "Monitorear y controlar el trabajo del proyecto es el proceso de supervisar, monitorear y comunicar el progreso del desempeño."
  },
  //68
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles de las siguientes razones corresponden a proyectos fallidos?",
    "opciones": [
      "Cambio en las prioridades",
      "Verse obligado a completar un proyecto antes de tiempo",
      "Varios aspectos: atención a las personas, procesos o tecnologías",
      "Proyectos que no tienen éxito esperado",
      "Proyectos nunca parecen terminar"
    ],
    "respuestas_correctas": [0, 1, 2, 3, 4],
    "explicacion": "Todas las opciones representan razones por las que los proyectos pueden fallar."
  },
  //69
  {
    "tipo": "multiple",
    "pregunta": "Dentro del proceso de control integrado de cambios. ¿Qué tipos de cambios NO es necesario someter a procedimientos ni instancias superiores para aprobación de dichos cambios? Omisiones o errores que no afecten a….",
    "opciones": [
      "Cierre del proyecto",
      "Planificación o alcance de la gestión del proyecto",
      "Control y monitoreo de la gestión del proyecto",
      "Ejecución de la gestión del proyecto"
    ],
    "respuesta": 1,
    "explicacion": "Los errores que NO afectan la planificación o alcance del proyecto no requieren aprobación de instancias superiores."
  },
  //70
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta que describa el propósito de la planeación estratégica en la gestión de proyectos.",
    "opciones": [
      "Determinar objetivos organizacionales a largo plazo y seleccionar proyectos que generen valor.",
      "Definir objetivos organizacionales a corto plazo.",
      "Identificar proyectos que no tienen impacto en la organización.",
      "Eliminar la necesidad de análisis FODA."
    ],
    "respuesta": 0,
    "explicacion": "La planeación estratégica determina objetivos a largo plazo y selecciona proyectos que generen valor organizacional."
  },
  //71
  {
    "tipo": "multiple",
    "pregunta": "Seleccione el beneficio clave de la implementación de un plan estratégico de TI.",
    "opciones": [
      "Alineación de TI con la estrategia empresarial",
      "Desconexión de los objetivos organizacionales",
      "Reducción de la eficiencia operativa",
      "Aumento de los costos sin beneficios claros"
    ],
    "respuesta": 0,
    "explicacion": "El beneficio clave de un plan estratégico de TI es la alineación de TI con la estrategia empresarial."
  },
  //72
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la característica que mejor describa un ciclo de vida de proyecto adaptativo.",
    "opciones": [
      "El producto se desarrolla a través de múltiples iteraciones y el alcance detallado se define para cada iteración.",
      "El producto y los entregables se definen al comienzo del proyecto y cualquier cambio en el alcance se gestiona cuidadosamente.",
      "El proyecto se completa sin iteraciones, siguiendo un plan detallado desde el inicio.",
      "El enfoque se basa en la improvisación y adaptación constante sin planificación previa."
    ],
    "respuesta": 0,
    "explicacion": "En el ciclo de vida adaptativo, el producto se desarrolla en múltiples iteraciones con alcance detallado definido en cada una."
  },
  //73
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción que NO corresponde a una fase del ciclo de vida de un proyecto.",
    "opciones": [
      "Implementación continua",
      "Iniciación",
      "Planificación",
      "Cierre"
    ],
    "respuesta": 0,
    "explicacion": "Implementación continua NO es una fase del ciclo de vida del proyecto. Las fases son: iniciación, planificación, ejecución, monitoreo/control y cierre."
  },
  //74
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la definición correcta de control de calidad en proyectos.",
    "opciones": [
      "Actividades de control y aseguramiento de que los entregables cumplan con los requisitos del cliente.",
      "Actividades de planificación detallada del cronograma del proyecto.",
      "Actividades de seguimiento y control de los costos del proyecto.",
      "Actividades de cierre y evaluación final del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "El control de calidad son las actividades para asegurar que los entregables cumplan con los requisitos del cliente."
  },
  //75
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la actividad que pertenece a la fase de ejecución de un proyecto.",
    "opciones": [
      "Llevar a cabo el trabajo del proyecto según los planes establecidos.",
      "Evaluar los entregables y cerrar el proyecto.",
      "Identificación de las necesidades del negocio y estudio de factibilidad.",
      "Creación de un pull de planes para guiar al equipo de trabajo."
    ],
    "respuesta": 0,
    "explicacion": "En la fase de ejecución se lleva a cabo el trabajo del proyecto según los planes establecidos."
  },
  //76
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la característica que mejor describa los métodos ágiles.",
    "opciones": [
      "Se basan en ciclos iterativos y entregas incrementales.",
      "Requieren planificación detallada desde el inicio.",
      "Eliminan la necesidad de comunicación con el cliente.",
      "No permiten cambios una vez iniciado el proyecto."
    ],
    "respuesta": 0,
    "explicacion": "Los métodos ágiles se basan en ciclos iterativos y entregas incrementales del producto."
  },
  //77
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción que NO describe una habilidad crucial para un gerente de proyectos.",
    "opciones": [
      "Habilidad para realizar tareas repetitivas sin cambio",
      "Habilidad para liderar equipos",
      "Habilidad para gestionar tiempo y recursos",
      "Habilidad para comunicarse efectivamente"
    ],
    "respuesta": 0,
    "explicacion": "Realizar tareas repetitivas sin cambio NO es una habilidad crucial para un gerente de proyectos; debe adaptarse y liderar."
  },
  //78
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la definición correcta de un proyecto.",
    "opciones": [
      "Un esfuerzo temporal que se lleva a cabo para crear un producto, servicio o resultado único.",
      "Una operación continua sin un objetivo específico.",
      "Un conjunto de tareas rutinarias para mantener el negocio en funcionamiento.",
      "Una serie de actividades realizadas sin ningún tipo de planificación."
    ],
    "respuesta": 0,
    "explicacion": "Un proyecto es un esfuerzo temporal para crear un producto, servicio o resultado único."
  },
  //79
  {
    "tipo": "multiple",
    "pregunta": "Seleccione el factor clave que contribuye al éxito de un proyecto.",
    "opciones": [
      "Apoyo ejecutivo",
      "Uso de tecnologías de última generación",
      "Inversión financiera ilimitada",
      "Recursos humanos abundantes"
    ],
    "respuesta": 0,
    "explicacion": "El apoyo ejecutivo es un factor clave que contribuye significativamente al éxito de un proyecto."
  },
  //80
  {
    "tipo": "multiple",
    "pregunta": "Seleccione el ejemplo que mejor describa una actividad en la fase de cierre de un proyecto.",
    "opciones": [
      "Revisión Post-implantación para establecer el nivel de éxito y las lecciones aprendidas.",
      "Identificación de las necesidades del negocio.",
      "Creación de un pull de planes para guiar al equipo de trabajo.",
      "Monitoreo y control de la ejecución del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "La revisión post-implantación para establecer éxito y lecciones aprendidas es una actividad típica de cierre."
  },
  //81
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la razón principal del fracaso de los proyectos de TI según el informe de CHAOS.",
    "opciones": [
      "Falta de apoyo ejecutivo",
      "Uso de tecnologías desactualizadas",
      "Exceso de presupuesto",
      "Falta de personal capacitado"
    ],
    "respuesta": 0,
    "explicacion": "Según el informe CHAOS, la falta de apoyo ejecutivo es la razón principal del fracaso de proyectos de TI."
  },
  //82
  {
    "tipo": "multiple",
    "pregunta": "Seleccione el rol principal del patrocinador del proyecto.",
    "opciones": [
      "Asumir el costo del bien, servicio, producto o resultado final derivado del proyecto.",
      "Coordinar y guiar al equipo técnico del proyecto.",
      "Realizar el trabajo técnico necesario para completar el proyecto.",
      "Evaluar los entregables y cerrar el proyecto."
    ],
    "respuesta": 0,
    "explicacion": "El rol principal del patrocinador es asumir el costo del bien, servicio, producto o resultado final del proyecto."
  },
  //83
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la definición correcta de un plan financiero en proyectos.",
    "opciones": [
      "Un documento que describe los recursos financieros necesarios y el costo total del proyecto.",
      "Un desglose jerárquico de las tareas y actividades del proyecto.",
      "Un cronograma detallado con fechas de inicio y fin del proyecto.",
      "Un diagrama que muestra las dependencias entre las tareas del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "Un plan financiero describe los recursos financieros necesarios y el costo total del proyecto."
  },
  //84
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción que mejor describa la planificación estratégica en la gestión de proyectos.",
    "opciones": [
      "Es el proceso de definir objetivos organizacionales a largo plazo y seleccionar proyectos que generen valor.",
      "Es la definición de objetivos a corto plazo para proyectos específicos.",
      "Es la selección de tecnologías para implementar en proyectos.",
      "Es la evaluación de proyectos en base a su impacto financiero inmediato."
    ],
    "respuesta": 0,
    "explicacion": "La planificación estratégica define objetivos a largo plazo y selecciona proyectos que generen valor organizacional."
  },
  //85
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta que describa el objetivo principal de la gestión de proyectos.",
    "opciones": [
      "Alcanzar los objetivos del proyecto dentro de los parámetros de tiempo, costos y calidad.",
      "Aumentar la rentabilidad de la empresa.",
      "Garantizar la satisfacción total del cliente.",
      "Implementar nuevas tecnologías."
    ],
    "respuesta": 0,
    "explicacion": "El objetivo principal de la gestión de proyectos es alcanzar objetivos dentro de los parámetros de tiempo, costos y calidad."
  },
  //86
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre el desarrollo de una metodología de gestión de proyectos en una organización.",
    "opciones": [
      "Adaptar las mejores prácticas a las necesidades particulares de la organización.",
      "Adoptar metodologías sin adaptarlas a las necesidades de la organización.",
      "Implementar solo metodologías ágiles.",
      "Desarrollar metodologías sin la participación de los equipos de proyecto."
    ],
    "respuesta": 0,
    "explicacion": "El desarrollo de una metodología debe adaptar las mejores prácticas a las necesidades particulares de la organización."
  },
  //87
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la definición correcta de una estructura de desglose de trabajo (EDT).",
    "opciones": [
      "Un desglose jerárquico de las tareas y actividades necesarias para completar el proyecto.",
      "Una lista de los recursos financieros necesarios para el proyecto.",
      "Un diagrama que muestra las dependencias entre las tareas del proyecto.",
      "Un cronograma detallado del proyecto con fechas de inicio y fin."
    ],
    "respuesta": 0,
    "explicacion": "La EDT es un desglose jerárquico de las tareas y actividades necesarias para completar el proyecto."
  },
  //88
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción que NO describe un grupo de interés en un proyecto de TI.",
    "opciones": [
      "Competencia directa de la empresa",
      "Patrocinador del proyecto",
      "Equipo técnico del proyecto",
      "Clientes y usuarios finales"
    ],
    "respuesta": 0,
    "explicacion": "La competencia directa NO es un grupo de interés (stakeholder) del proyecto."
  },
  //89
  {
    "tipo": "multiple_seleccion",
    "pregunta": "Seleccione la opción correcta sobre las prácticas clave durante la pre-iniciación de un proyecto.",
    "opciones": [
      "Identificar al sponsor y seleccionar el director del proyecto.",
      "Ignorar las limitaciones de alcance, tiempo y costo.",
      "Iniciar el proyecto sin desarrollar un business case.",
      "Evitar reuniones con el director del proyecto."
    ],
    "respuestas_correctas": [0],
    "explicacion": "En la pre-iniciación es clave identificar al sponsor y seleccionar al director del proyecto."
  },
  //90
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre el objetivo de la gestión de recursos humanos en un proyecto.",
    "opciones": [
      "Desarrollar, gestionar y liderar al equipo del proyecto.",
      "Identificar los riesgos financieros del proyecto.",
      "Controlar el cronograma del proyecto.",
      "Definir los requisitos de calidad del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "El objetivo de la gestión de recursos humanos es desarrollar, gestionar y liderar al equipo del proyecto."
  },
  //91
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre la importancia de identificar a los stakeholders en un proyecto.",
    "opciones": [
      "Permite entender sus expectativas y gestionar su influencia en el proyecto.",
      "Es irrelevante para el éxito del proyecto.",
      "Solo es importante para proyectos pequeños.",
      "Se realiza solo una vez al inicio del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "Identificar stakeholders permite entender sus expectativas y gestionar su influencia en el proyecto."
  },
  //92
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre qué es un plan de gestión de riesgos.",
    "opciones": [
      "Un documento que describe cómo se gestionarán los riesgos durante el proyecto.",
      "Un cronograma detallado de todas las actividades del proyecto.",
      "Una lista de los recursos necesarios para el proyecto.",
      "Una estructura de desglose del trabajo (EDT) del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "El plan de gestión de riesgos describe cómo se identificarán, analizarán y responderán a los riesgos del proyecto."
  },
  //93
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre la finalidad del análisis de valor presente neto (VAN) en la gestión de proyectos.",
    "opciones": [
      "Evaluar la viabilidad económica del proyecto mediante la comparación de ingresos y costos a lo largo del tiempo.",
      "Identificar los riesgos asociados al proyecto.",
      "Determinar la duración del proyecto.",
      "Asignar recursos a las actividades del proyecto"
    ],
    "respuesta": 0,
    "explicacion": "El VAN evalúa la viabilidad económica comparando ingresos y costos a lo largo del tiempo."
  },
  //94
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta que describa la relación de dependencia donde una tarea no puede comenzar hasta que otra termine.",
    "opciones": [
      "Fin a comienzo (FS).",
      "Comienzo a comienzo (SS).",
      "Fin a fin (FF).",
      "Comienzo a fin (SF)."
    ],
    "respuesta": 0,
    "explicacion": "La dependencia Fin a comienzo (FS) indica que una tarea no puede comenzar hasta que otra termine."
  },
  //95
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre qué es un análisis de stakeholders.",
    "opciones": [
      "Un análisis que identifica y clasifica a las partes interesadas del proyecto.",
      "Un análisis que identifica todas las tareas del proyecto.",
      "Un análisis que determina las tecnologías necesarias para el proyecto.",
      "Un análisis financiero del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "El análisis de stakeholders identifica y clasifica a las partes interesadas del proyecto según su influencia e interés."
  },
  //96
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre el objetivo de la gestión de la integración del proyecto.",
    "opciones": [
      "Asegurar que los diferentes elementos del proyecto se coordinen de manera efectiva.",
      "Gestionar únicamente los riesgos del proyecto.",
      "Monitorear el rendimiento del equipo de proyecto.",
      "Definir los requisitos técnicos del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de la integración asegura que los diferentes elementos del proyecto se coordinen de manera efectiva."
  },
  //97
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta que describa qué es un project charter.",
    "opciones": [
      "Un documento que autoriza formalmente un proyecto y da autoridad al gerente del proyecto.",
      "Un documento que detalla cada tarea diaria del proyecto.",
      "Un contrato entre el equipo del proyecto y el cliente.",
      "Un cronograma detallado del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "El project charter autoriza formalmente un proyecto y otorga autoridad al gerente del proyecto."
  },
  //98
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la técnica correcta para estimar la duración de las actividades del proyecto.",
    "opciones": [
      "Estimación paramétrica.",
      "Análisis FODA.",
      "Diagrama de Gantt.",
      "Análisis de Monte Carlo."
    ],
    "respuesta": 0,
    "explicacion": "La estimación paramétrica utiliza relaciones estadísticas entre datos históricos y variables para estimar duraciones."
  },
  //99
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta que describa qué es una reserva de contingencia en la gestión de costos del proyecto.",
    "opciones": [
      "Una cantidad de presupuesto reservada para mitigar riesgos identificados.",
      "El costo total estimado del proyecto.",
      "El presupuesto aprobado para el proyecto.",
      "Una cantidad de fondos reservados para cambios de alcance."
    ],
    "respuesta": 0,
    "explicacion": "La reserva de contingencia es presupuesto reservado para mitigar riesgos identificados en el proyecto."
  },
  //100
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la técnica más común para descomponer el trabajo en la Estructura de Desglose de Trabajo (EDT).",
    "opciones": [
      "Descomposición.",
      "Estimación paramétrica.",
      "Diagramación de precedencia.",
      "Análisis de Monte Carlo."
    ],
    "respuesta": 0,
    "explicacion": "La descomposición es la técnica más común para dividir el trabajo del proyecto en componentes más pequeños y manejables."
  },
  //101
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre el propósito de la gestión de la comunicación en un proyecto.",
    "opciones": [
      "Asegurar que la información del proyecto se genere, recopile, distribuya y almacene de manera oportuna y adecuada.",
      "Identificar los riesgos del proyecto.",
      "Definir los requisitos técnicos del proyecto.",
      "Monitorear el desempeño del equipo del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de la comunicación asegura que la información se genere, recopile, distribuya y almacene oportunamente."
  },
  //102
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la técnica correcta para analizar el poder y el interés de los stakeholders.",
    "opciones": [
      "Matriz de poder/interés.",
      "Análisis FODA.",
      "Diagrama de Gantt.",
      "Análisis de Monte Carlo."
    ],
    "respuesta": 0,
    "explicacion": "La matriz de poder/interés es la técnica adecuada para analizar el poder e interés de los stakeholders."
  },
  //103
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la técnica correcta de estimación de tiempo que utiliza tres valores para calcular una media ponderada.",
    "opciones": [
      "Program Evaluation and Review Technique (PERT).",
      "Método del camino crítico (CPM).",
      "Estimación por analogía.",
      "Diagrama de Gantt."
    ],
    "respuesta": 0,
    "explicacion": "PERT utiliza tres valores (optimista, pesimista, más probable) para calcular una media ponderada de duración."
  },
  //104
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción que NO corresponde a un objetivo del project charter.",
    "opciones": [
      "Establecer el presupuesto detallado del proyecto.",
      "Definir los objetivos del proyecto.",
      "Identificar las partes interesadas clave.",
      "Proporcionar al gerente del proyecto la autoridad para utilizar recursos."
    ],
    "respuesta": 0,
    "explicacion": "El presupuesto detallado NO es parte del project charter; se desarrolla en la planificación."
  },
  //105
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre la diferencia entre duración y esfuerzo en la gestión del tiempo del proyecto.",
    "opciones": [
      "La duración se refiere al tiempo total en el calendario, mientras que el esfuerzo se refiere a la cantidad de jornadas u horas de trabajo necesarias.",
      "La duración se refiere a la cantidad de recursos necesarios, mientras que el esfuerzo se refiere al tiempo total en el calendario.",
      "La duración se refiere a la estimación de costos, mientras que el esfuerzo se refiere a la cantidad de recursos necesarios.",
      "La duración se refiere al tiempo necesario para completar el proyecto, mientras que el esfuerzo se refiere a las dependencias entre actividades."
    ],
    "respuesta": 0,
    "explicacion": "Duración es el tiempo total en el calendario; esfuerzo es la cantidad de jornadas u horas de trabajo necesarias."
  },
  //106
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre el objetivo principal de la gestión de adquisiciones del proyecto.",
    "opciones": [
      "Obtener bienes y servicios externos necesarios para el proyecto.",
      "Controlar el presupuesto del proyecto.",
      "Definir el alcance del proyecto.",
      "Monitorear los riesgos del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de adquisiciones busca obtener bienes y servicios externos necesarios para el proyecto."
  },
  //107
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta que describa qué es un atributo de actividad en la gestión del cronograma.",
    "opciones": [
      "Información relacionada con el cronograma sobre cada actividad, como predecesores, sucesores y restricciones.",
      "Una lista de todas las actividades necesarias para completar el trabajo del proyecto.",
      "Una técnica para descomponer el trabajo en tareas más pequeñas.",
      "Una herramienta para estimar los costos del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "Los atributos de actividad incluyen información sobre predecesores, sucesores, restricciones y otros detalles del cronograma."
  },
  //108
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre la finalidad de la gestión de costos del proyecto.",
    "opciones": [
      "Asegurar que el proyecto se complete dentro del presupuesto aprobado.",
      "Minimizar el tiempo necesario para completar el proyecto.",
      "Identificar los riesgos financieros del proyecto.",
      "Definir los requisitos de calidad del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de costos asegura que el proyecto se complete dentro del presupuesto aprobado."
  },
  //109
  {
    "tipo": "multiple",
    "pregunta": "Seleccione la opción correcta sobre el documento que se utiliza para autorizar formalmente la existencia de un proyecto.",
    "opciones": [
      "El project charter.",
      "El business case.",
      "El acta de reuniones.",
      "El plan de gestión de riesgos."
    ],
    "respuesta": 0,
    "explicacion": "El project charter es el documento que autoriza formalmente la existencia de un proyecto."
  },
  //110
  {
    "tipo": "multiple",
    "pregunta": "¿Cómo influye una mala definición del alcance en el éxito de un proyecto informático?",
    "opciones": [
      "Reduce los costos si se omiten tareas no necesarias.",
      "No afecta si el equipo es suficientemente experimentado.",
      "Permite mayor flexibilidad en la planificación del cronograma.",
      "Genera ambigüedad en entregables y retrasa decisiones clave."
    ],
    "respuesta": 3,
    "explicacion": "Una mala definición del alcance genera ambigüedad en los entregables y retrasa decisiones clave del proyecto."
  },
  //111
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es un atributo esencial del ciclo de vida de un proyecto según el enfoque PMBOK?",
    "opciones": [
      "Consiste en una única fase que agrupa todo el trabajo.",
      "Consta de fases secuenciales como iniciación, planificación, ejecución, seguimiento y cierre.",
      "Solo aplica a proyectos del sector público.",
      "Es idéntico al ciclo de vida del producto generado."
    ],
    "respuesta": 1,
    "explicacion": "Según PMBOK, el ciclo de vida consta de fases secuenciales: iniciación, planificación, ejecución, seguimiento y cierre."
  },
  //112
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es una diferencia clave entre proyectos y operaciones dentro de las organizaciones?",
    "opciones": [
      "Las operaciones tienen un alcance limitado",
      "Los proyectos tienen procesos repetitivos",
      "Los proyectos son esfuerzos temporales",
      "Las operaciones producen productos únicos"
    ],
    "respuesta": 2,
    "explicacion": "La diferencia clave es que los proyectos son esfuerzos temporales, mientras que las operaciones son continuas."
  },
  //113
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es el objetivo principal de la fase de planificación en el ciclo de vida de un proyecto TI?",
    "opciones": [
      "Organizar y preparar los planes para ejecutar el proyecto",
      "Establecer relaciones con los stakeholders",
      "Cerrar contratos con proveedores",
      "Desarrollar los entregables definidos"
    ],
    "respuesta": 0,
    "explicacion": "El objetivo principal de la planificación es organizar y preparar los planes necesarios para ejecutar el proyecto."
  },
  //114
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es el propósito del Project Charter?",
    "opciones": [
      "Definir los entregables detallados del proyecto.",
      "Dar al gerente del proyecto la autoridad para aplicar los recursos de la organización.",
      "Autorizar formalmente la existencia de un proyecto.",
      "Establecer el cronograma detallado del proyecto."
    ],
    "respuesta": 2,
    "explicacion": "El Project Charter autoriza formalmente la existencia de un proyecto y documenta sus objetivos iniciales."
  },
  //115
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los conceptos relacionados con la TIR:",
    "pares": [
      {
        "izquierda": "TIR",
        "derecha": "Tasa que iguala el valor presente de los flujos netos de efectivo al gasto inicial."
      },
      {
        "izquierda": "Tasa de descuento",
        "derecha": "Tasa mínima de rendimiento aceptada por la empresa."
      },
      {
        "izquierda": "Flujos de efectivo descontados",
        "derecha": "Flujos futuros de efectivo ajustados por la tasa de interés."
      },
      {
        "izquierda": "Criterio de aceptación",
        "derecha": "El proyecto es aceptado si la TIR es mayor que la tasa de descuento."
      }
    ],
    "respuesta": 0,
    "explicacion": "La TIR iguala el valor presente de flujos al gasto inicial; la tasa de descuento es el rendimiento mínimo aceptado."
  },
  //116
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los grupos de procesos de gestión de proyectos con sus funciones:",
    "pares": [
      {
        "izquierda": "Iniciación",
        "derecha": "Establece los objetivos y define el alcance del proyecto."
      },
      {
        "izquierda": "Planificación",
        "derecha": "Desarrolla el plan que guiará la ejecución del proyecto."
      },
      {
        "izquierda": "Ejecución",
        "derecha": "Implementa las actividades definidas en el plan del proyecto."
      },
      {
        "izquierda": "Cierre",
        "derecha": "Formaliza la finalización y entrega del proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada grupo de procesos tiene una función específica en el ciclo de vida del proyecto."
  },
  //117
  {
    "tipo": "multiple",
    "pregunta": "Un proyecto requiere una inversión de $50,000 y genera un flujo de efectivo neto de $10,000 por año. ¿Cuál es el PRI o período de recuperación de la inversión?",
    "opciones": [
      "PRI = 5 años",
      "PRI = 10 años",
      "PRI = 3 años",
      "PRI = 7 años"
    ],
    "respuesta": 0,
    "explicacion": "PRI = Inversión inicial / Flujo de efectivo anual = $50,000 / $10,000 = 5 años."
  },
  //118
  {
    "tipo": "multiple",
    "pregunta": "¿Qué rol se espera que cumpla un gerente de proyecto según la guía PMBOK?",
    "opciones": [
      "Guiar al equipo para cumplir los objetivos del proyecto aplicando conocimientos, herramientas y liderazgo.",
      "Aprobar cambios en la política organizacional.",
      "Evaluar el desempeño financiero anual de la organización.",
      "Decidir sobre la contratación del personal de toda la empresa."
    ],
    "respuesta": 0,
    "explicacion": "Según PMBOK, el gerente debe guiar al equipo aplicando conocimientos, herramientas y habilidades de liderazgo."
  },
  //119
  {
    "tipo": "multiple",
    "pregunta": "¿Qué elemento NO debe faltar en un acta de constitución del proyecto?",
    "opciones": [
      "Resumen del currículo de cada miembro del equipo.",
      "Plan de marketing del producto generado.",
      "Identificación de los objetivos del negocio.",
      "Horario detallado de todas las reuniones técnicas."
    ],
    "respuesta": 2,
    "explicacion": "La identificación de los objetivos del negocio es un elemento esencial del acta de constitución del proyecto."
  },
  //120
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es una característica distintiva del ciclo de vida adaptativo en proyectos de TI?",
    "opciones": [
      "Se prohíbe cualquier cambio posterior a la planificación.",
      "El producto final se entrega en una única fase.",
      "No se requiere validación del cliente en cada etapa.",
      "El alcance detallado se define en cada iteración."
    ],
    "respuesta": 3,
    "explicacion": "En el ciclo de vida adaptativo, el alcance detallado se define progresivamente en cada iteración."
  },
  //121
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es una dificultad clave que enfrentan las estructuras organizacionales mixtas en proyectos?",
    "opciones": [
      "Falta de herramientas informáticas disponibles.",
      "Doble reporte jerárquico que genera conflictos de autoridad.",
      "Ausencia de gerentes de proyecto.",
      "Exceso de control del gerente funcional sobre presupuesto."
    ],
    "respuesta": 1,
    "explicacion": "Las estructuras mixtas enfrentan el desafío del doble reporte jerárquico que puede generar conflictos de autoridad."
  },
  //122
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es el principal objetivo de la gestión de las comunicaciones en un proyecto según PMBOK?",
    "opciones": [
      "Garantizar que la información fluya correctamente entre los interesados.",
      "Planificar el alcance del proyecto.",
      "Monitorear los costos.",
      "Desarrollar el equipo del proyecto."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de comunicaciones busca garantizar que la información fluya adecuadamente entre todos los interesados."
  },
  //123
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es la diferencia esencial entre gestión de programas y gestión de proyectos?",
    "opciones": [
      "Los programas no tienen entregables.",
      "La gestión de programas tiene menor presupuesto que los proyectos.",
      "Un programa solo puede contener proyectos idénticos.",
      "La gestión de programas coordina múltiples proyectos relacionados para obtener beneficios estratégicos."
    ],
    "respuesta": 3,
    "explicacion": "La gestión de programas coordina múltiples proyectos relacionados para obtener beneficios estratégicos y sinergias."
  },
  //124
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles de los siguientes son beneficios del proyecto que deben incluirse en el Project Charter?",
    "opciones": [
      "Mejora de la eficiencia operativa.",
      "Aumento en la satisfacción del cliente.",
      "Detalles técnicos del producto.",
      "Listado de actividades operativas."
    ],
    "respuestas_correctas": [0, 1],
    "explicacion": "Los beneficios como mejora de eficiencia operativa y aumento en satisfacción del cliente deben incluirse en el Project Charter."
  },
  //125
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál de los siguientes es un método utilizado para distribuir información en proyectos informáticos?",
    "opciones": [
      "Reuniones del proyecto.",
      "Análisis de riesgos.",
      "Diagrama de Gantt.",
      "Control de calidad."
    ],
    "respuesta": 0,
    "explicacion": "Las reuniones del proyecto son un método efectivo para distribuir información entre los interesados."
  },
  //126
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuáles son las mejores prácticas para asegurar una comunicación efectiva durante la ejecución de un proyecto?",
    "opciones": [
      "Realizar reuniones periódicas de equipo",
      "Asignar los entregables",
      "Establecer canales de comunicación claros",
      "Definir el plan de comunicación"
    ],
    "respuestas_correctas": [0, 2],
    "explicacion": "Realizar reuniones periódicas y establecer canales claros son prácticas clave para una comunicación efectiva."
  },
  //127                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  {
    "tipo": "multiple",
    "pregunta": "¿Qué factor puede afectar la adquisición del equipo de trabajo en un proyecto?",
    "opciones": [
      "Planificación del alcance.",
      "Disponibilidad de los recursos humanos.",
      "Costos de adquisición.",
      "Evaluación de riesgos."
    ],
    "respuesta": 1,
    "explicacion": "La disponibilidad de los recursos humanos es un factor crítico que puede afectar la adquisición del equipo de trabajo."
  },
  //128
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál de las siguientes razones corresponden a proyectos terminados normalmente?",
    "opciones": [
      "Verse obligado a completar un proyecto antes de tiempo.",
      "Cumplen dentro de los objetivos, costo, calidad y cronograma.",
      "Cambio en las prioridades.",
      "Varios aspectos: atención a las personas, procesos o tecnologías.",
      "Proyectos que no tiene éxito esperado.",
      "Proyectos nunca pareces terminar.",
      "Proyecto completa sus resultados según lo planificado."
    ],
    "respuestas_correctas": [1, 6],
    "explicacion": "Los proyectos terminados normalmente cumplen objetivos dentro de parámetros establecidos y completan sus resultados según lo planificado."
  },
  //129
  {
    "tipo": "ordenamiento",
    "pregunta": "A partir del siguiente listado, ordenen los pasos del proceso para el control integrado de cambio de un proyecto:",
    "items": [
      "Búsqueda de alternativas",
      "Ajuste del plan de dirección y de líneas base",
      "Aprobación por parte del CCB",
      "Gestionar el proyecto de acuerdo al nuevo plan",
      "Evaluación del impacto",
      "Notificación a los interesados del cambio e impacto"
    ],
    "orden_correcto": [4, 0, 2, 1, 5, 3],
    "explicacion": "El orden correcto es: Evaluación del impacto, Búsqueda de alternativas, Aprobación por CCB, Ajuste del plan, Notificación a interesados, Gestionar según nuevo plan."
  },
  //130
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja cada tipo de proyecto informático con su descripción.",
    "pares": [
      {
        "izquierda": "Proyectos de mejoramiento",
        "derecha": "Optimización o actualización de sistemas existentes."
      },
      {
        "izquierda": "Proyectos de equipamiento",
        "derecha": "Implementación de nuevos equipos o infraestructura."
      },
      {
        "izquierda": "Proyectos de investigación aplicada",
        "derecha": "Aplicación de resultados de investigación a problemas específicos."
      },
      {
        "izquierda": "Proyectos de desarrollo de aplicaciones",
        "derecha": "Creación de un nuevo sistema o aplicación."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada tipo de proyecto TI tiene un propósito específico: mejoramiento optimiza sistemas, equipamiento implementa infraestructura, investigación aplica conocimiento y desarrollo crea nuevos sistemas."
  },
  //131
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada factor de éxito con una práctica adecuada que lo respalde.",
    "pares": [
      {
        "izquierda": "Gestión efectiva del cambio",
        "derecha": "Implementar un proceso formal para solicitudes de modificación."
      },
      {
        "izquierda": "Comunicación continua",
        "derecha": "Establecer canales y frecuencia de interacción definidos."
      },
      {
        "izquierda": "Participación del usuario",
        "derecha": "Incluir retroalimentación en cada etapa del proyecto."
      },
      {
        "izquierda": "Apoyo de la alta dirección",
        "derecha": "Proveer recursos y soporte estratégico continuo."
      },
      {
        "izquierda": "Claridad en el alcance",
        "derecha": "Documentar y validar requisitos desde el inicio."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada factor crítico de éxito requiere prácticas específicas: cambios formalizados, comunicación establecida, usuarios involucrados, apoyo ejecutivo y alcance claro."
  },
  //132
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los siguientes conceptos sobre la relación entre la EDT y el cronograma del proyecto.",
    "pares": [
      {
        "izquierda": "Dependencias",
        "derecha": "Relaciones entre actividades que deben completarse antes de que otras puedan comenzar."
      },
      {
        "izquierda": "Duración estimada",
        "derecha": "El tiempo necesario para completar un paquete de trabajo o actividad."
      },
      {
        "izquierda": "Hitos del proyecto",
        "derecha": "Puntos clave que indican el progreso y logros importantes del proyecto."
      },
      {
        "izquierda": "Secuenciación de actividades",
        "derecha": "Define el orden en que se deben completar las actividades del proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "La EDT se relaciona con el cronograma mediante: dependencias entre tareas, duraciones estimadas, hitos de progreso y secuencia de actividades."
  },
  //133
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada grupo de procesos con una actividad clave que realiza.",
    "pares": [
      {
        "izquierda": "Inicio",
        "derecha": "Desarrollar el acta de constitución del proyecto."
      },
      {
        "izquierda": "Planificación",
        "derecha": "Definir actividades y estimar recursos."
      },
      {
        "izquierda": "Ejecución",
        "derecha": "Dirigir y gestionar el trabajo del proyecto."
      },
      {
        "izquierda": "Monitoreo y control",
        "derecha": "Medir el desempeño y aplicar acciones correctivas."
      },
      {
        "izquierda": "Cierre",
        "derecha": "Finalizar todas las actividades y contratos."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada grupo de procesos tiene actividades clave: Inicio-acta, Planificación-definición, Ejecución-dirección, Monitoreo-medición, Cierre-finalización."
  },
  //134
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los componentes clave del paquete de trabajo con su descripción.",
    "pares": [
      {
        "izquierda": "Actividades",
        "derecha": "Acciones específicas que deben realizarse para cumplir con los entregables."
      },
      {
        "izquierda": "Tiempo estimado",
        "derecha": "Duración proyectada para completar las actividades del paquete de trabajo."
      },
      {
        "izquierda": "Costos",
        "derecha": "Presupuesto necesario para completar las actividades dentro del paquete de trabajo."
      },
      {
        "izquierda": "Recursos asignados",
        "derecha": "Los recursos necesarios para completar las actividades del paquete de trabajo."
      }
    ],
    "respuesta": 0,
    "explicacion": "Un paquete de trabajo incluye: actividades específicas, tiempo estimado, costos presupuestados y recursos asignados."
  },
  //135
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada fase del proceso de integración del proyecto con el entregable correspondiente.",
    "pares": [
      {
        "izquierda": "Inicio",
        "derecha": "Acta de constitución del proyecto."
      },
      {
        "izquierda": "Planificación",
        "derecha": "Plan de gestión del proyecto."
      },
      {
        "izquierda": "Ejecución",
        "derecha": "Entregables del proyecto."
      },
      {
        "izquierda": "Monitoreo y control",
        "derecha": "Solicitudes de cambio."
      },
      {
        "izquierda": "Cierre",
        "derecha": "Producto final y lecciones aprendidas."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada fase tiene entregables específicos: Inicio-acta, Planificación-plan, Ejecución-entregables, Monitoreo-cambios, Cierre-producto final."
  },
  //136
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada metodología de gestión de proyectos con su característica distintiva.",
    "pares": [
      {
        "izquierda": "PRINCE2",
        "derecha": "Enfoque basado en procesos y roles definidos."
      },
      {
        "izquierda": "PMBOK",
        "derecha": "Guía basada en áreas de conocimiento y procesos."
      },
      {
        "izquierda": "Kanban",
        "derecha": "Flujo visual continuo de trabajo."
      },
      {
        "izquierda": "Scrum",
        "derecha": "Iteraciones cortas con entregables incrementales."
      },
      {
        "izquierda": "Agile",
        "derecha": "Valoración del cliente y respuesta al cambio."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada metodología tiene características únicas: PRINCE2-procesos, PMBOK-áreas de conocimiento, Kanban-flujo visual, Scrum-iteraciones, Agile-adaptabilidad."
  },
  //137
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada tipo de riesgo con un ejemplo representativo.",
    "pares": [
      {
        "izquierda": "Riesgo legal",
        "derecha": "Cambios en normativa."
      },
      {
        "izquierda": "Riesgo humano",
        "derecha": "Rotación del personal clave."
      },
      {
        "izquierda": "Riesgo técnico",
        "derecha": "Falla en la integración con sistemas existentes."
      },
      {
        "izquierda": "Riesgo financiero",
        "derecha": "Variación en los costos."
      },
      {
        "izquierda": "Riesgo operativo",
        "derecha": "Fallas en los servidores."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los riesgos se clasifican por tipo: legal-normativa, humano-personal, técnico-integración, financiero-costos, operativo-infraestructura."
  },
  //138
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los factores clave con su importancia en la ejecución de proyectos.",
    "pares": [
      {
        "izquierda": "Colaboración del equipo",
        "derecha": "Promover un entorno de trabajo cooperativo entre los miembros del proyecto."
      },
      {
        "izquierda": "Gestión de riesgos",
        "derecha": "Identificar y mitigar posibles problemas antes de que afecten el proyecto."
      },
      {
        "izquierda": "Comunicación efectiva",
        "derecha": "Garantiza que toda la información relevante llegue a los interesados."
      },
      {
        "izquierda": "Asignación adecuada de recursos",
        "derecha": "Distribuir correctamente los recursos para evitar cuellos de botella."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los factores clave en ejecución incluyen: colaboración del equipo, gestión de riesgos, comunicación efectiva y asignación de recursos."
  },
  //139
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los procesos de control de calidad con sus descripciones.",
    "pares": [
      {
        "izquierda": "Auditoría de calidad",
        "derecha": "Evaluar si los procesos cumplen con los estándares establecidos."
      },
      {
        "izquierda": "Análisis de causa raíz",
        "derecha": "Identificar las causas de los defectos o problemas."
      },
      {
        "izquierda": "Evaluación del desempeño",
        "derecha": "Medir el desempeño de los entregables del proyecto."
      },
      {
        "izquierda": "Revisión de entregables",
        "derecha": "Verificar que los productos cumplan con los requisitos."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los procesos de control de calidad incluyen: auditoría-estándares, análisis-causas, evaluación-desempeño, revisión-requisitos."
  },
  //140
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los beneficios de usar una EDT con su descripción.",
    "pares": [
      {
        "izquierda": "Mejora en la gestión del tiempo",
        "derecha": "Asegura que las actividades se programen correctamente."
      },
      {
        "izquierda": "Claridad en los objetivos",
        "derecha": "Permite que todos los miembros entiendan el alcance."
      },
      {
        "izquierda": "Control de riesgos",
        "derecha": "Facilita la identificación temprana de problemas."
      },
      {
        "izquierda": "Asignación de responsabilidades",
        "derecha": "Define claramente las tareas de cada miembro."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los beneficios de la EDT incluyen: gestión del tiempo, claridad de objetivos, control de riesgos y asignación de responsabilidades."
  },
  //141
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja las fases del control integrado de cambios con sus descripciones.",
    "pares": [
      {
        "izquierda": "Revisión de cambios",
        "derecha": "Evaluar y analizar las solicitudes de cambio antes de su aprobación."
      },
      {
        "izquierda": "Documentación del impacto",
        "derecha": "Registrar el efecto que los cambios tendrán en el proyecto."
      },
      {
        "izquierda": "Implementación de cambios",
        "derecha": "Gestionar la ejecución de los cambios aprobados en el proyecto."
      },
      {
        "izquierda": "Supervisión de cambios",
        "derecha": "Monitorear que los cambios implementados cumplan con los objetivos."
      }
    ],
    "respuesta": 0,
    "explicacion": "El control de cambios incluye: revisión-evaluación, documentación-impacto, implementación-ejecución, supervisión-monitoreo."
  },
  //142
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja las estrategias de mitigación de riesgos con sus descripciones.",
    "pares": [
      {
        "izquierda": "Evitar",
        "derecha": "Eliminar el riesgo por completo modificando el plan del proyecto."
      },
      {
        "izquierda": "Mitigación",
        "derecha": "Tomar medidas para reducir el impacto o la probabilidad del riesgo."
      },
      {
        "izquierda": "Transferencia",
        "derecha": "Transferir el riesgo a un tercero, como una compañía de seguros."
      },
      {
        "izquierda": "Aceptación",
        "derecha": "Aceptar el riesgo sin realizar acciones preventivas adicionales."
      }
    ],
    "respuesta": 0,
    "explicacion": "Las estrategias de riesgos son: evitar-eliminar, mitigar-reducir, transferir-terceros, aceptar-sin acción."
  },
  //143
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada beneficio con el proceso de planificación que lo proporciona.",
    "pares": [
      {
        "izquierda": "Definición clara del trabajo",
        "derecha": "Crear la EDT (Estructura de Desglose del Trabajo)."
      },
      {
        "izquierda": "Control del tiempo",
        "derecha": "Desarrollar el cronograma."
      },
      {
        "izquierda": "Estimación realista de costos",
        "derecha": "Determinar el presupuesto."
      },
      {
        "izquierda": "Gestión de expectativas",
        "derecha": "Planificar la gestión de las comunicaciones."
      },
      {
        "izquierda": "Organización del equipo",
        "derecha": "Planificar la gestión de recursos."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada proceso de planificación proporciona beneficios específicos: EDT-trabajo definido, cronograma-control tiempo, presupuesto-costos, comunicaciones-expectativas, recursos-organización."
  },
  //144
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja las siguientes herramientas con su uso en la ejecución de proyectos.",
    "pares": [
      {
        "izquierda": "Diagrama de Gantt",
        "derecha": "Herramienta para visualizar el cronograma del proyecto."
      },
      {
        "izquierda": "Diagrama de red",
        "derecha": "Visualiza las relaciones entre actividades."
      },
      {
        "izquierda": "Tablero Kanban",
        "derecha": "Ayuda a gestionar tareas en flujo continuo."
      },
      {
        "izquierda": "Software de gestión de recursos",
        "derecha": "Permite controlar la distribución de recursos."
      }
    ],
    "respuesta": 0,
    "explicacion": "Las herramientas de ejecución incluyen: Gantt-cronograma, red-relaciones, Kanban-flujo, software-recursos."
  },
  //145
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja cada metodología de desarrollo de proyectos TI con su característica principal.",
    "pares": [
      {
        "izquierda": "Cascada",
        "derecha": "Un proceso secuencial en el que cada fase depende de la anterior."
      },
      {
        "izquierda": "Ágil (SCRUM)",
        "derecha": "Un enfoque flexible y adaptable con entregas incrementales."
      },
      {
        "izquierda": "Espiral",
        "derecha": "Desarrollo iterativo con una evaluación constante de riesgos."
      },
      {
        "izquierda": "Incremental",
        "derecha": "Entrega de pequeñas partes del proyecto de manera continua."
      }
    ],
    "respuesta": 0,
    "explicacion": "Las metodologías de desarrollo son: Cascada-secuencial, Ágil-flexible, Espiral-iterativo con riesgos, Incremental-entregas continuas."
  },
  //146
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada entregable con una herramienta utilizada para su creación o control.",
    "pares": [
      {
        "izquierda": "Acta de constitución",
        "derecha": "Plantillas de inicio del proyecto."
      },
      {
        "izquierda": "Cronograma",
        "derecha": "Software de gestión de proyectos."
      },
      {
        "izquierda": "Presupuesto",
        "derecha": "Hojas de cálculo y técnicas de estimación."
      },
      {
        "izquierda": "Informe de avance",
        "derecha": "Tableros de control e indicadores."
      },
      {
        "izquierda": "Matriz RACI",
        "derecha": "Diagrama de responsabilidades."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada entregable usa herramientas específicas: acta-plantillas, cronograma-software, presupuesto-hojas de cálculo, informe-tableros, RACI-diagramas."
  },
  //147
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada concepto de gestión de proyectos con su contribución estratégica.",
    "pares": [
      {
        "izquierda": "Proyecto",
        "derecha": "Genera un producto o resultado único."
      },
      {
        "izquierda": "Programa",
        "derecha": "Coordina múltiples proyectos interrelacionados."
      },
      {
        "izquierda": "Portafolio",
        "derecha": "Alinea los proyectos con los objetivos de la organización."
      },
      {
        "izquierda": "Gobernanza",
        "derecha": "Establece políticas y estándares para dirigir proyectos."
      },
      {
        "izquierda": "Valor del negocio",
        "derecha": "Maximiza beneficios para los stakeholders."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los conceptos estratégicos son: Proyecto-resultado único, Programa-coordinación, Portafolio-alineación, Gobernanza-políticas, Valor-beneficios."
  },
  //148
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada métrica del valor ganado con su significado dentro del proyecto.",
    "pares": [
      {
        "izquierda": "PV (Valor planificado)",
        "derecha": "Valor del trabajo que debería estar completado."
      },
      {
        "izquierda": "EV (Valor ganado)",
        "derecha": "Trabajo realmente completado en términos de presupuesto."
      },
      {
        "izquierda": "AC (Costo real)",
        "derecha": "Gasto real incurrido en el trabajo realizado."
      },
      {
        "izquierda": "SPI (Índice de desempeño de cronograma)",
        "derecha": "Relación entre valor ganado y valor planificado."
      },
      {
        "izquierda": "CPI (Índice de desempeño de costos)",
        "derecha": "Relación entre valor ganado y costo real."
      }
    ],
    "respuesta": 0,
    "explicacion": "Las métricas EVM son: PV-planificado, EV-ganado, AC-real, SPI-cronograma, CPI-costos."
  },
  //149
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada actividad con el proceso de gestión de proyectos que la involucra.",
    "pares": [
      {
        "izquierda": "Identificar partes interesadas",
        "derecha": "Gestión de interesados."
      },
      {
        "izquierda": "Calcular el valor presente neto",
        "derecha": "Gestión de costos."
      },
      {
        "izquierda": "Desarrollar el cronograma",
        "derecha": "Gestión del tiempo."
      },
      {
        "izquierda": "Gestionar conflictos del equipo",
        "derecha": "Gestión de recursos."
      },
      {
        "izquierda": "Gestionar cambios en requisitos",
        "derecha": "Gestión del alcance."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada actividad pertenece a un área: interesados-stakeholders, VPN-costos, cronograma-tiempo, conflictos-recursos, cambios-alcance."
  },
  //150
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada entrada con el proceso de planificación donde se utiliza.",
    "pares": [
      {
        "izquierda": "Acta de constitución",
        "derecha": "Desarrollar el plan para la dirección del proyecto."
      },
      {
        "izquierda": "Requisitos del proyecto",
        "derecha": "Planificar la gestión del alcance."
      },
      {
        "izquierda": "Datos históricos",
        "derecha": "Desarrollar el cronograma."
      },
      {
        "izquierda": "Restricciones del proyecto",
        "derecha": "Estimar los recursos de las actividades."
      },
      {
        "izquierda": "Registro de riesgos",
        "derecha": "Planificar la respuesta a los riesgos."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada entrada se usa en procesos específicos: acta-plan dirección, requisitos-alcance, históricos-cronograma, restricciones-recursos, riesgos-respuesta."
  },
  //151
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja cada fase del ciclo de vida del proyecto con su descripción.",
    "pares": [
      {
        "izquierda": "Iniciación",
        "derecha": "Definir los objetivos y el alcance del proyecto."
      },
      {
        "izquierda": "Planificación",
        "derecha": "Desarrollar el plan de trabajo detallado del proyecto."
      },
      {
        "izquierda": "Ejecución",
        "derecha": "Implementar las actividades planificadas."
      },
      {
        "izquierda": "Cierre",
        "derecha": "Formalizar la entrega y evaluar el desempeño del proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "Las fases del ciclo de vida son: Iniciación-definición, Planificación-desarrollo, Ejecución-implementación, Cierre-formalización."
  },
  //152
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los tipos de riesgo con sus características en un proyecto.",
    "pares": [
      {
        "izquierda": "Riesgo técnico",
        "derecha": "Posibilidad de que las herramientas o tecnologías utilizadas en el proyecto no funcionen como se esperaba."
      },
      {
        "izquierda": "Riesgo financiero",
        "derecha": "Riesgo relacionado con la falta de fondos o recursos financieros."
      },
      {
        "izquierda": "Riesgo de calidad",
        "derecha": "Posibilidad de que los entregables no cumplan con los estándares de calidad establecidos."
      },
      {
        "izquierda": "Riesgo de cronograma",
        "derecha": "Posibilidad de retrasos en el cronograma del proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los tipos de riesgo incluyen: técnico-herramientas, financiero-fondos, calidad-estándares, cronograma-retrasos."
  },
  //153
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona las áreas de conocimiento con un ejemplo representativo de sus procesos.",
    "pares": [
      {
        "izquierda": "Gestión de integración",
        "derecha": "Desarrollar el acta de constitución del proyecto."
      },
      {
        "izquierda": "Gestión del tiempo",
        "derecha": "Determinar la duración de las actividades."
      },
      {
        "izquierda": "Gestión de calidad",
        "derecha": "Asegurar la realización de la calidad."
      },
      {
        "izquierda": "Gestión de comunicaciones",
        "derecha": "Distribuir información relevante del proyecto."
      },
      {
        "izquierda": "Gestión de adquisiciones",
        "derecha": "Controlar los contratos con proveedores."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada área tiene procesos característicos: integración-acta, tiempo-duración, calidad-aseguramiento, comunicaciones-distribución, adquisiciones-contratos."
  },
  //154
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada actividad de cierre con el documento resultante o entregable asociado.",
    "pares": [
      {
        "izquierda": "Evaluar desempeño del proyecto",
        "derecha": "Informe de cierre."
      },
      {
        "izquierda": "Actualizar lecciones aprendidas",
        "derecha": "Base de conocimientos organizacional."
      },
      {
        "izquierda": "Validar aceptación del producto",
        "derecha": "Acta de aceptación final."
      },
      {
        "izquierda": "Cerrar contratos",
        "derecha": "Certificado de cumplimiento contractual."
      },
      {
        "izquierda": "Liberar recursos",
        "derecha": "Registro de asignaciones finalizadas."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada actividad de cierre genera documentos específicos: evaluación-informe, lecciones-base conocimientos, validación-acta, contratos-certificado, recursos-registro."
  },
  //155
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada tipo de contrato con su principal característica o enfoque.",
    "pares": [
      {
        "izquierda": "Contrato de precio fijo",
        "derecha": "Costo establecido independientemente del esfuerzo real."
      },
      {
        "izquierda": "Contrato de costo reembolsable",
        "derecha": "Reembolso de costos más una tarifa adicional."
      },
      {
        "izquierda": "Contrato por tiempo y materiales",
        "derecha": "Pago según tiempo trabajado y materiales usados."
      },
      {
        "izquierda": "Contrato de incentivo",
        "derecha": "Premio si se logra una meta determinada."
      },
      {
        "izquierda": "Contrato abierto",
        "derecha": "Términos ajustables durante la ejecución."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los tipos de contrato son: precio fijo-establecido, reembolsable-costos+tarifa, tiempo y materiales-según uso, incentivo-premio, abierto-ajustable."
  },
  //156
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja las siguientes definiciones de calidad con sus respectivas fuentes.",
    "pares": [
      {
        "izquierda": "ISO 8402:1994",
        "derecha": "Totalidad de propiedades y características de un producto o servicio que satisfacen necesidades."
      },
      {
        "izquierda": "ISO 9000:2000",
        "derecha": "Grado en que un conjunto de características cumple con los requisitos."
      },
      {
        "izquierda": "Real Academia Española",
        "derecha": "Propiedad o conjunto de propiedades que permiten juzgar el valor de algo."
      },
      {
        "izquierda": "Pressman (1993)",
        "derecha": "Número de defectos por cada mil líneas de código (KLOC)."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada fuente define calidad diferente: ISO 8402-satisfacción, ISO 9000-requisitos, RAE-valor, Pressman-defectos."
  },
  //157
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada restricción con una estrategia para su adecuada gestión.",
    "pares": [
      {
        "izquierda": "Tiempo",
        "derecha": "Uso de rutas críticas y cronogramas ajustados."
      },
      {
        "izquierda": "Costo",
        "derecha": "Monitoreo de presupuestos y reservas de contingencia."
      },
      {
        "izquierda": "Alcance",
        "derecha": "Gestión del cambio y control del trabajo."
      },
      {
        "izquierda": "Calidad",
        "derecha": "Aplicación de estándares y auditorías."
      },
      {
        "izquierda": "Recursos",
        "derecha": "Asignación eficiente y negociación con interesados."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada restricción requiere estrategias específicas: tiempo-ruta crítica, costo-monitoreo, alcance-cambios, calidad-estándares, recursos-asignación."
  },
  //158
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los documentos clave utilizados en la distribución de información con su función.",
    "pares": [
      {
        "izquierda": "Plan de comunicaciones",
        "derecha": "Describe cómo se gestionarán y controlarán las comunicaciones del proyecto."
      },
      {
        "izquierda": "Acta de reunión",
        "derecha": "Registro formal de los temas tratados y acuerdos alcanzados en una reunión."
      },
      {
        "izquierda": "Informe de progreso",
        "derecha": "Proporciona una actualización periódica sobre el estado del proyecto."
      },
      {
        "izquierda": "Solicitud de cambio",
        "derecha": "Petición formal para modificar algún aspecto del proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los documentos de comunicación son: plan-gestión, acta-registro, informe-actualización, solicitud-modificación."
  },
  //159
  {
    "tipo": "multiple",
    "pregunta": "Si un proyecto tiene un costo inicial de $20,000 y genera flujos de efectivo de $5,000 por año durante 6 años, ¿cuál es la TIR aproximada?",
    "opciones": [
      "TIR = 12%",
      "TIR = 8%",
      "TIR = 15%",
      "TIR = 10%"
    ],
    "respuesta": 0,
    "explicacion": "Con inversión inicial de $20,000 y flujos anuales de $5,000 por 6 años, la TIR aproximada es 12%."
  },
  //160
  {
    "tipo": "multiple",
    "pregunta": "¿Cómo se diferencia la gestión de proyectos de TI de otros tipos de proyectos?",
    "opciones": [
      "Los proyectos de TI se enfocan en software, hardware y redes.",
      "No hay diferencias entre proyectos de TI y otros tipos.",
      "Los proyectos de TI no siguen buenas prácticas de gestión.",
      "Los proyectos de TI tienen ciclos de vida distintos."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de proyectos de TI se diferencia por su enfoque en software, hardware y redes, con desafíos técnicos específicos."
  },
  //161
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Por qué la administración del cambio es fundamental en proyectos de TI?",
    "opciones": [
      "Por la criticidad del negocio y riesgo tecnológico.",
      "Por la velocidad de innovación en el área.",
      "Para controlar el crecimiento del alcance.",
      "Debido a los frecuentes cambios en requerimientos."
    ],
    "respuestas_correctas": [0, 1, 2, 3],
    "explicacion": "La administración del cambio es fundamental por: criticidad del negocio, velocidad de innovación, control del alcance y frecuentes cambios en requerimientos."
  },
  //162
  {
    "tipo": "multiple",
    "pregunta": "¿Por qué es importante la gestión de stakeholders para la gestión de riesgos?",
    "opciones": [
      "Porque los stakeholders pueden generar o mitigar riesgos según su nivel de influencia.",
      "Porque todos los riesgos dependen de sus aprobaciones.",
      "Porque los stakeholders evitan la necesidad de un plan de riesgos.",
      "Porque solo los clientes externos influyen en los riesgos."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de stakeholders es importante porque pueden generar o mitigar riesgos según su nivel de influencia e interés."
  },
  //163
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona el tipo de estructura organizacional con su característica principal.",
    "pares": [
      {
        "izquierda": "Funcional",
        "derecha": "La autoridad reside en los gerentes funcionales."
      },
      {
        "izquierda": "Proyectizada",
        "derecha": "El gerente del proyecto tiene control total."
      },
      {
        "izquierda": "Matricial débil",
        "derecha": "El poder lo conserva el gerente funcional."
      },
      {
        "izquierda": "Matricial balanceada",
        "derecha": "Autoridad compartida entre funcional y proyecto."
      },
      {
        "izquierda": "Matricial fuerte",
        "derecha": "Mayor control del gerente de proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada estructura tiene características de autoridad: Funcional-gerentes funcionales, Proyectizada-gerente proyecto, Matriciales-compartida o dominante."
  },
  //164
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es la ventaja principal de los métodos ágiles sobre los tradicionales?",
    "opciones": [
      "Mayor adaptabilidad al cambio.",
      "Documentación más rigurosa.",
      "Planificación más exhaustiva y control.",
      "Procesos más estructurados y formales."
    ],
    "respuesta": 0,
    "explicacion": "La ventaja principal de los métodos ágiles es la mayor adaptabilidad al cambio y flexibilidad en los requisitos."
  },
  //165
  {
    "tipo": "multiple",
    "pregunta": "¿Qué rol asume la gestión de los stakeholders en el éxito de un proyecto?",
    "opciones": [
      "Fundamental, pues son quienes aprueban los entregables.",
      "Secundario, pues el equipo técnico es el responsable principal.",
      "Opcional, ya que depende del tipo de proyecto y organización.",
      "Irrelevante, porque cada stakeholder vela por sus propios intereses."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de stakeholders es fundamental porque son quienes validan, aprueban y determinan el éxito de los entregables."
  },
  //166
  {
    "tipo": "multiple",
    "pregunta": "¿Qué implica el proceso de determinar el presupuesto?",
    "opciones": [
      "Asignar los costos a los recursos y actividades en el tiempo.",
      "Asignar los recursos a las actividades.",
      "Asignar los costos a las actividades.",
      "Asignar solo los costos de recursos humanos."
    ],
    "respuesta": 0,
    "explicacion": "Determinar el presupuesto implica asignar los costos estimados a los recursos y actividades distribuidos en el tiempo."
  },
  //167
  {
    "tipo": "multiple_seleccion",
    "pregunta": "A partir de lo siguiente, identifique cuál corresponde a los costos de falla o mala calidad externos.",
    "opciones": [
      "Costos por responsabilidades.",
      "Costos por pérdidas de clientes.",
      "Costos por garantías.",
      "Costos por desperdicio o chatarra.",
      "Costos por retrabajo.",
      "Quejas de clientes."
    ],
    "respuestas_correctas": [0, 1, 2, 5],
    "explicacion": "Los costos de falla externos incluyen: responsabilidades, pérdida de clientes, garantías y quejas de clientes."
  },
  //168
  {
    "tipo": "multiple",
    "pregunta": "Se denomina ______________________________ a los gastos incurridos durante y después del proyecto por fallas.",
    "opciones": [
      "Costos de No-conformidad.",
      "Costos de pruebas.",
      "Costos de conformidad.",
      "Costos por aseguramiento de calidad."
    ],
    "respuesta": 0,
    "explicacion": "Los costos de No-conformidad son los gastos incurridos durante y después del proyecto debido a fallas o defectos."
  },
  //169
  {
    "tipo": "multiple_seleccion",
    "pregunta": "En el acta de cierre administrativo típicamente se incluye:",
    "opciones": [
      "Evaluación del desempeño del equipo de proyecto.",
      "Revisión de lecciones aprendidas y capacitaciones.",
      "Liberación de recursos y cierre financiero.",
      "Celebración del éxito del proyecto."
    ],
    "respuestas_correctas": [0, 1, 2],
    "explicacion": "El acta de cierre incluye: evaluación de desempeño, lecciones aprendidas y liberación de recursos/cierre financiero."
  },
  //170
  {
    "tipo": "multiple",
    "pregunta": "La reunión de cierre permite principalmente:",
    "opciones": [
      "Reconocer las contribuciones del equipo de trabajo.",
      "Renegociar cambios en el alcance con el sponsor.",
      "Replanificar actividades pendientes del proyecto.",
      "Reducir riesgos de entregables incompletos."
    ],
    "respuesta": 0,
    "explicacion": "La reunión de cierre permite principalmente reconocer y celebrar las contribuciones del equipo de trabajo."
  },
  //171
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es una de las características del Control Integrado de Cambios?",
    "opciones": [
      "Se realiza durante todo el ciclo de vida del proyecto.",
      "No requiere aprobación por el director de proyecto.",
      "Se realiza solo al final del proyecto.",
      "Solo el director de proyecto puede solicitarlos."
    ],
    "respuesta": 0,
    "explicacion": "El Control Integrado de Cambios se realiza durante todo el ciclo de vida del proyecto, desde el inicio hasta el cierre."
  },
  //172
  {
    "tipo": "multiple",
    "pregunta": "¿Qué proceso pertenece a la gestión del alcance del proyecto según PMBOK?",
    "opciones": [
      "Definir el alcance.",
      "Controlar la calidad.",
      "Identificar interesados.",
      "Estimación de costos."
    ],
    "respuesta": 0,
    "explicacion": "Definir el alcance es un proceso que pertenece específicamente a la gestión del alcance del proyecto según PMBOK."
  },
  //173
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál es el beneficio principal de gestionar proyectos en forma de portafolio dentro de una organización?",
    "opciones": [
      "Alinear los proyectos con los objetivos estratégicos institucionales.",
      "Evitar el uso de herramientas automatizadas para control.",
      "Garantizar que todos los proyectos tengan la misma duración.",
      "Reducir el número total de proyectos activos obligatoriamente."
    ],
    "respuesta": 0,
    "explicacion": "El beneficio principal de gestionar portafolios es alinear los proyectos con los objetivos estratégicos de la organización."
  },
  //174
  {
    "tipo": "multiple",
    "pregunta": "¿Qué implica el proceso de monitoreo y control de un proyecto?",
    "opciones": [
      "Supervisar el avance, identificar desviaciones y tomar acciones correctivas.",
      "Definir el alcance, actividades, recursos y costos del proyecto.",
      "Coordinar y desarrollar el trabajo para entregar los resultados esperados.",
      "Obtener la autorización formal para comenzar el proyecto o fase."
    ],
    "respuesta": 0,
    "explicacion": "El monitoreo y control implica supervisar el avance, identificar desviaciones y tomar acciones correctivas oportunas."
  },
  //175
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Qué habilidades interpersonales necesita un gerente de proyectos según el texto?",
    "opciones": [
      "Liderazgo, motivación, negociación.",
      "Contabilidad, finanzas, ventas.",
      "Programación, análisis, diseño.",
      "Logística, producción, compras."
    ],
    "respuestas_correctas": [0],
    "explicacion": "Las habilidades interpersonales clave para un gerente de proyectos son: liderazgo, motivación y negociación."
  },
  //176
  {
    "tipo": "multiple",
    "pregunta": "¿Qué framework proporciona un conjunto de buenas prácticas en gestión de proyectos?",
    "opciones": [
      "PMBOK",
      "SCRUM",
      "PRINCE2",
      "FODA"
    ],
    "respuesta": 0,
    "explicacion": "PMBOK (Project Management Body of Knowledge) proporciona un conjunto de buenas prácticas en gestión de proyectos."
  },
  //177
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Qué planes complementarios se despliegan del plan de gestión de proyectos?",
    "opciones": [
      "Gestión de calidad, recursos humanos, comunicaciones y riesgos.",
      "Solo gestión de calidad.",
      "Solo gestión de recursos humanos.",
      "Solo gestión de riesgos."
    ],
    "respuestas_correctas": [0],
    "explicacion": "Del plan de gestión se despliegan múltiples planes complementarios: calidad, recursos humanos, comunicaciones y riesgos, entre otros."
  },
  //178
  {
    "tipo": "multiple",
    "pregunta": "Complete: _______________ es el grado en el que un conjunto de características inherentes cumple con los requisitos.",
    "opciones": [
      "Calidad",
      "Conformidad con los requisitos",
      "Aptitud para el uso",
      "Fiabilidad"
    ],
    "respuesta": 0,
    "explicacion": "Calidad es el grado en el que un conjunto de características inherentes cumple con los requisitos establecidos."
  },
  //179
  {
    "tipo": "multiple_seleccion",
    "pregunta": "Identifique y seleccione la(s) afirmación(es) correcta(s) a partir de los siguientes enunciados, relacionado al informe de rendimiento en la gestión de comunicaciones:",
    "opciones": [
      "Muestra la línea de base versus datos reales.",
      "Comunica el progreso del desempeño del equipo.",
      "Pronostica los insumos del proyecto.",
      "Proporciona información apropiada a una sola audiencia.",
      "Su elaboración es periódica y por excepción.",
      "Muestra información de rendimiento."
    ],
    "respuestas_correctas": [0, 1, 4, 5],
    "explicacion": "El informe de rendimiento: muestra línea base vs real, comunica progreso, es periódico y muestra información de rendimiento."
  },
  //180
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál de los siguientes tipos de contratos es el que representa cuando al vendedor se le reembolsan los costos totales autorizados y recibe una tarifa predeterminada más un bono basado en el logro de objetivos?",
    "opciones": [
      "Contrato de costos más honorarios por cumplimiento de objetivos (CPAF)",
      "Contrato de costos más tarifa fija (CPFF)",
      "Contrato de costos más honorarios con incentivos (CPIF)",
      "Contratos de Precio Fijo Cerrado (FFP)",
      "Contratos de Precio Fijo más Honorarios con Incentivos (FPIF)"
    ],
    "respuesta": 0,
    "explicacion": "El contrato CPAF (Cost Plus Award Fee) reembolsa costos autorizados más una tarifa predeterminada y un bono basado en el logro de objetivos."
  },
  //181
  {
    "tipo": "multiple",
    "pregunta": "El propósito principal de documentar lecciones aprendidas es:",
    "opciones": [
      "Mejorar procesos y resultados en futuros proyectos.",
      "Informar métricas de productividad del equipo.",
      "Respaldar contractualmente los entregables ante el sponsor.",
      "Justificar la selección de proveedores realizada."
    ],
    "respuesta": 0,
    "explicacion": "El propósito principal de las lecciones aprendidas es mejorar procesos y obtener mejores resultados en futuros proyectos."
  },
  //182
  {
    "tipo": "multiple",
    "pregunta": "¿Por qué es importante identificar lecciones aprendidas en los proyectos?",
    "opciones": [
      "Para mejorar procesos y obtener mejores resultados en futuros proyectos.",
      "Para informar métricas de productividad del equipo.",
      "Para justificar ante el sponsor la selección de proveedores.",
      "Para validar contractualmente los entregables ante el sponsor."
    ],
    "respuesta": 0,
    "explicacion": "Identificar lecciones aprendidas es importante para capturar conocimiento y mejorar continuamente los procesos organizacionales."
  },
  //183
  {
    "tipo": "multiple",
    "pregunta": "El informe final de proyecto tiene como propósito principal:",
    "opciones": [
      "Informar métricas de desempeño del proyecto.",
      "Obtener aprobación formal del sponsor sobre entregables.",
      "Documentar las lecciones aprendidas durante la ejecución.",
      "Celebrar el éxito del proyecto con los interesados."
    ],
    "respuesta": 0,
    "explicacion": "El propósito principal del informe final es informar las métricas de desempeño y resultados obtenidos en el proyecto."
  },
  //184
  {
    "tipo": "multiple",
    "pregunta": "¿Qué técnica se utiliza para medir el desempeño de trabajo en un proyecto?",
    "opciones": [
      "Evaluación del desempeño",
      "Planificación de recursos",
      "Gestión del alcance",
      "Control de calidad"
    ],
    "respuesta": 0,
    "explicacion": "La evaluación del desempeño es la técnica utilizada para medir el rendimiento del trabajo realizado en el proyecto."
  },
  //185
  {
    "tipo": "multiple_seleccion",
    "pregunta": "¿Cuál(es) de los siguientes corresponden a los procesos del grupo o etapa de seguimiento y control según la Guía del PMBok del PMI?",
    "opciones": [
      "Control del cronograma o calendario.",
      "Control del alcance.",
      "Control de adquisiciones y/o contratos.",
      "Control de la calidad.",
      "Control y seguimiento integrado.",
      "Control de la cultura y clima organizacional de los empleados de la organización ejecutante.",
      "Validar el alcance.",
      "Control de las comunicaciones de información sobre el progreso o rendimiento del proyecto.",
      "Control integrado de cambios.",
      "Control del plan de Dirección de proyecto.",
      "Control sobre las políticas de gobierno que afectan al proyecto.",
      "Control de riesgos.",
      "Control de los costes."
    ],
    "respuestas_correctas": [0, 1, 2, 3, 4, 7, 8, 11, 12],
    "explicacion": "Los procesos de seguimiento y control incluyen: cronograma, alcance, adquisiciones, calidad, integrado, comunicaciones, cambios, riesgos y costes."
  },
  //186
  {
    "tipo": "emparejamiento",
    "pregunta": "Empareja los aspectos clave de la gestión de comunicaciones en el proyecto con sus descripciones.",
    "pares": [
      {
        "izquierda": "Requisitos de comunicación",
        "derecha": "Identificar la información necesaria para cada interesado."
      },
      {
        "izquierda": "Nivel de detalle",
        "derecha": "Determinar la cantidad de información necesaria para cada interesado."
      },
      {
        "izquierda": "Frecuencia de informes",
        "derecha": "Especificar cada cuánto se deben entregar los informes de progreso."
      },
      {
        "izquierda": "Idiomas y formatos",
        "derecha": "Definir los lenguajes y estructuras que se usarán en las comunicaciones del proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "Los aspectos clave de comunicaciones incluyen: requisitos-información necesaria, nivel-cantidad, frecuencia-periodicidad, idiomas-formatos."
  },
  //187
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada problema frecuente en proyectos con la acción o práctica que lo mitiga.",
    "pares": [
      {
        "izquierda": "Cambios frecuentes no documentados",
        "derecha": "Implementar control integrado de cambios."
      },
      {
        "izquierda": "Sobrecostos no justificados",
        "derecha": "Aplicar control de costos y análisis de valor ganado."
      },
      {
        "izquierda": "Desviaciones del cronograma",
        "derecha": "Revisar la ruta crítica y aplicar compresión de cronograma."
      },
      {
        "izquierda": "Falta de coordinación del equipo",
        "derecha": "Reuniones regulares y definición clara de roles."
      },
      {
        "izquierda": "Desacuerdos con stakeholders",
        "derecha": "Gestión activa de las expectativas."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada problema tiene una práctica mitigadora: cambios-control, sobrecostos-valor ganado, cronograma-ruta crítica, coordinación-reuniones, desacuerdos-expectativas."
  },
  //188
  {
    "tipo": "multiple",
    "pregunta": "¿Qué factor NO se considera crítico para el éxito de un proyecto de TI según el informe CHAOS 2015?",
    "opciones": [
      "Estimaciones basadas en suposiciones",
      "Apoyo ejecutivo activo",
      "Uso de procesos ágiles",
      "Participación del usuario"
    ],
    "respuesta": 0,
    "explicacion": "Las estimaciones basadas en suposiciones NO son un factor de éxito, al contrario, son una causa de fracaso de proyectos."
  },
  //189
  {
    "tipo": "multiple",
    "pregunta": "¿Qué desafío suele enfrentar un gerente de proyecto dentro de una estructura organizacional funcional?",
    "opciones": [
      "Limitada autoridad sobre los recursos asignados.",
      "Control exclusivo del presupuesto del portafolio.",
      "Acceso prioritario a todos los recursos técnicos.",
      "Comunicación directa con el CEO de la empresa."
    ],
    "respuesta": 0,
    "explicacion": "En estructuras funcionales, el gerente de proyecto enfrenta el desafío de tener limitada autoridad sobre los recursos asignados."
  },
  //190
  {
    "tipo": "multiple",
    "pregunta": "Para (Ramón Rodríguez & Mariné, 2022), la calidad tiene dimensiones. ¿Cuál de las dimensiones refiere el autor con la siguiente afirmación: Entendida como la conformidad con los requisitos y normas, establecidos al principio del proyecto, acordados con el cliente y, eventualmente, alineados con unos estándares de la industria o de la profesión?",
    "opciones": [
      "Calidad objetiva",
      "Calidad superior",
      "Calidad subjetiva",
      "Calidad defensiva"
    ],
    "respuesta": 0,
    "explicacion": "La calidad objetiva se refiere a la conformidad con requisitos, normas y estándares acordados al inicio del proyecto."
  },
  //191
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál de las siguientes características NO corresponde a un proyecto, según la gestión de proyectos informáticos?",
    "opciones": [
      "Tiene una duración indefinida",
      "Es progresivo en definición y ejecución",
      "Tiene recursos limitados y definidos",
      "Genera un resultado único"
    ],
    "respuesta": 0,
    "explicacion": "Un proyecto NO tiene duración indefinida; por definición, un proyecto es temporal con inicio y fin definidos."
  },
  //192
  {
    "tipo": "multiple",
    "pregunta": "¿A qué tipo de técnicas de comunicación efectiva nos referimos cuando se trata de preparar un memorando informal o un informe formal; o, cuando se desea comunicar por correo electrónico o de manera presencial cara a cara?",
    "opciones": [
      "Elección de medios",
      "Técnicas de presentación",
      "Técnicas de gestión de reuniones",
      "Modelo emisor-receptor"
    ],
    "respuesta": 0,
    "explicacion": "La elección de medios se refiere a seleccionar el canal apropiado de comunicación según el contexto y mensaje."
  },
  //193
  {
    "tipo": "multiple",
    "pregunta": "¿Qué puede ocurrir si no se gestionan adecuadamente las expectativas de los interesados?",
    "opciones": [
      "Rechazo del producto final incluso si cumple los objetivos técnicos.",
      "Los interesados se adaptan sin dificultad al resultado.",
      "Automáticamente se ajustan a los requerimientos reales.",
      "No impactan mientras se cumpla el alcance."
    ],
    "respuesta": 0,
    "explicacion": "Si no se gestionan las expectativas, puede ocurrir el rechazo del producto final incluso si cumple los objetivos técnicos."
  },
  //194
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona cada grupo de procesos con una actividad clave que realiza.",
    "pares": [
      {
        "izquierda": "Inicio",
        "derecha": "Desarrollar el acta constitución del proyecto."
      },
      {
        "izquierda": "Planificación",
        "derecha": "Definir actividades y estimar recursos."
      },
      {
        "izquierda": "Ejecución",
        "derecha": "Dirigir y gestionar el trabajo del proyecto."
      },
      {
        "izquierda": "Monitoreo y control",
        "derecha": "Medir el desempeño y aplicar acciones correctivas."
      },
      {
        "izquierda": "Cierre",
        "derecha": "Finalizar todas las actividades y contratos."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada grupo de procesos realiza actividades clave específicas a lo largo del ciclo de vida del proyecto."
  },
  //195
  {
    "tipo": "multiple",
    "pregunta": "¿Qué implica el proceso de determinar el presupuesto?",
    "opciones": [
      "Asignar los costos a los recursos y actividades en el tiempo.",
      "Asignar los recursos a las actividades.",
      "Asignar los costos a las actividades.",
      "Asignar solo los costos de recursos humanos."
    ],
    "respuesta": 0,
    "explicacion": "Determinar el presupuesto implica asignar los costos estimados a los recursos y actividades distribuidos en el tiempo."
  },
  //196
  {
    "tipo": "multiple",
    "pregunta": "¿Por qué la administración del cambio es fundamental en proyectos de TI? (Seleccione todas las que apliquen)",
    "opciones": [
      "Por la criticidad del negocio y riesgo tecnológico.",
      "Por la velocidad de innovación en el área.",
      "Para controlar el crecimiento del alcance.",
      "Debido a los frecuentes cambios en requerimientos."
    ],
    "respuestas_correctas": [0, 1, 2, 3],
    "tipo": "multiple_seleccion",
    "explicacion": "La administración del cambio es fundamental por: criticidad del negocio, velocidad de innovación, control del alcance y frecuentes cambios en requerimientos."
  },
  //197
  {
    "tipo": "emparejamiento",
    "pregunta": "Relaciona el tipo de estructura organizacional con su característica principal.",
    "pares": [
      {
        "izquierda": "Funcional",
        "derecha": "La autoridad reside en los gerentes funcionales."
      },
      {
        "izquierda": "Proyectizada",
        "derecha": "El gerente del proyecto tiene control total."
      },
      {
        "izquierda": "Matricial débil",
        "derecha": "El poder lo conserva el gerente funcional."
      },
      {
        "izquierda": "Matricial balanceada",
        "derecha": "Autoridad compartida entre funcional y proyecto."
      },
      {
        "izquierda": "Matricial fuerte",
        "derecha": "Mayor control del gerente de proyecto."
      }
    ],
    "respuesta": 0,
    "explicacion": "Cada estructura tiene características de autoridad: Funcional-gerentes funcionales, Proyectizada-gerente proyecto, Matriciales-compartida o dominante."
  },
  //198
  {
    "tipo": "multiple",
    "pregunta": "Para (Ramón Rodríguez & Mariné, 2022), la calidad tiene dimensiones. ¿Cuál de las dimensiones refiere el autor con la siguiente afirmación: Entendida como la conformidad con los requisitos y normas, establecidos al principio del proyecto, acordados con el cliente y, eventualmente, alineados con unos estándares de la industria o de la profesión?",
    "opciones": [
      "Calidad objetiva",
      "Calidad superior",
      "Calidad subjetiva",
      "Calidad defensiva"
    ],
    "respuesta": 0,
    "explicacion": "La calidad objetiva se refiere a la conformidad con requisitos, normas y estándares acordados al inicio del proyecto."
  },
  //199
  {
    "tipo": "multiple",
    "pregunta": "¿Cuál de las siguientes características NO corresponde a un proyecto, según la gestión de proyectos informáticos?",
    "opciones": [
      "Tiene una duración indefinida",
      "Es progresivo en definición y ejecución",
      "Tiene recursos limitados y definidos",
      "Genera un resultado único"
    ],
    "respuesta": 0,
    "explicacion": "Un proyecto NO tiene duración indefinida; por definición, un proyecto es temporal con inicio y fin definidos."
  },
  //200
  {
    "tipo": "multiple",
    "pregunta": "¿Cómo se diferencia la gestión de proyectos de TI de otros tipos de proyectos?",
    "opciones": [
      "Los proyectos de TI se enfocan en software, hardware y redes.",
      "No hay diferencias entre proyectos de TI y otros tipos.",
      "Los proyectos de TI no siguen buenas prácticas de gestión.",
      "Los proyectos de TI tienen ciclos de vida distintos."
    ],
    "respuesta": 0,
    "explicacion": "La gestión de proyectos de TI se diferencia por su enfoque en software, hardware y redes, con desafíos técnicos específicos."
  }
];

// VARIABLES GLOBALES
let preguntasExamen = [];
let indiceActual = 0;
let respuestasUsuario = []; 
let seleccionTemporal = null;
let seleccionesTemporales = []; // Para selección múltiple
let tiempoRestante = 0;
let intervaloTiempo;

// REFERENCIAS HTML
const authScreen = document.getElementById('auth-screen');
const setupScreen = document.getElementById('setup-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const reviewScreen = document.getElementById('review-screen');
const btnLogout = document.getElementById('btn-logout');
const btnNextQuestion = document.getElementById('btn-next-question');

// === 4. FUNCIÓN: OBTENER ID ÚNICO DEL DISPOSITIVO ===
function obtenerDeviceId() {
    let deviceId = localStorage.getItem('device_id_seguro');
    if (!deviceId) {
        deviceId = 'dev_' + Math.random().toString(36).substr(2, 9) + Date.now();
        localStorage.setItem('device_id_seguro', deviceId);
    }
    return deviceId;
}

// === 5. VALIDACIÓN DE DISPOSITIVOS ===
async function validarDispositivo(user) {
    const email = user.email;
    const miDeviceId = obtenerDeviceId();
    let limiteDispositivos = correosUnDispositivo.includes(email) ? 1 : 2;

    const docRef = doc(db, "usuarios_seguros", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const datos = docSnap.data();
        let listaDispositivos = datos.dispositivos || [];
        
        if (listaDispositivos.includes(miDeviceId)) {
            return true;
        } else {
            if (listaDispositivos.length < limiteDispositivos) {
                listaDispositivos.push(miDeviceId);
                await setDoc(docRef, { dispositivos: listaDispositivos }, { merge: true });
                return true;
            } else {
                alert(`⛔ ACCESO DENEGADO ⛔\n\nYa tienes ${limiteDispositivos} dispositivo(s) registrado(s).\nNo puedes iniciar sesión en otro equipo.`);
                await signOut(auth);
                location.reload();
                return false;
            }
        }
    } else {
        await setDoc(docRef, {
            dispositivos: [miDeviceId],
            fecha_registro: new Date().toISOString()
        });
        return true;
    }
}

// === 6. MONITOR DE AUTENTICACIÓN ===
onAuthStateChanged(auth, async (user) => {
    if (user) {
        if (correosPermitidos.includes(user.email)) {
            const titulo = document.querySelector('h2');
            if(titulo) titulo.innerText = "Verificando Dispositivo...";
            
            const dispositivoValido = await validarDispositivo(user);
            
            if (dispositivoValido) {
                authScreen.classList.add('hidden');
                setupScreen.classList.remove('hidden');
                btnLogout.classList.remove('hidden');
                document.getElementById('user-display').innerText = user.email;
                if(titulo) titulo.innerText = "Bienvenido";
            }
        } else {
            alert("ACCESO RESTRINGIDO: Tu correo no está autorizado.");
            signOut(auth);
        }
    } else {
        authScreen.classList.remove('hidden');
        setupScreen.classList.add('hidden');
        quizScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        reviewScreen.classList.add('hidden');
        btnLogout.classList.add('hidden');
    }
});

// === 7. EVENTOS DE AUTENTICACIÓN ===
document.getElementById('btn-google').addEventListener('click', () => {
    signInWithPopup(auth, new GoogleAuthProvider()).catch(e => alert("Error Google: " + e.message));
});

btnLogout.addEventListener('click', () => { 
    signOut(auth); 
    location.reload(); 
});

// === 8. INICIO DEL EXAMEN ===
document.getElementById('btn-start').addEventListener('click', () => {
    const tiempo = document.getElementById('time-select').value;
    const modo = document.getElementById('mode-select').value;

    if (tiempo !== 'infinity') { 
        tiempoRestante = parseInt(tiempo) * 60; 
        iniciarReloj(); 
    } else { 
        document.getElementById('timer-display').innerText = "--:--"; 
    }
    
    if (modo === 'study') {
        preguntasExamen = [...bancoPreguntas].sort(() => 0.5 - Math.random());
    } else {
        preguntasExamen = [...bancoPreguntas].sort(() => 0.5 - Math.random()).slice(0, 30);
    }
    
    respuestasUsuario = [];
    indiceActual = 0;
    setupScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    cargarPregunta();
});

// === 9. CARGAR PREGUNTA ===
function cargarPregunta() {
    seleccionTemporal = null;
    seleccionesTemporales = [];
    btnNextQuestion.classList.add('hidden');
    
    if (indiceActual >= preguntasExamen.length) { 
        terminarQuiz(); 
        return; 
    }
    
    const pregunta = preguntasExamen[indiceActual];
    const tipo = pregunta.tipo;
    
    // Mostrar tipo de pregunta
    const badge = document.getElementById('question-type-badge');
    const tiposTexto = {
        'multiple': '📝 Opción Múltiple',
        'multiple_seleccion': '☑️ Selección Múltiple',
        'emparejamiento': '🔗 Emparejamiento',
        'ordenamiento': '🔢 Ordenamiento'
    };
    badge.textContent = tiposTexto[tipo] || tipo;
    
    document.getElementById('question-text').innerText = `${indiceActual + 1}. ${pregunta.pregunta}`;
    const cont = document.getElementById('options-container');
    cont.innerHTML = '';
    
    if (tipo === 'multiple') {
        cargarPreguntaMultiple(pregunta, cont);
    } else if (tipo === 'multiple_seleccion') {
        cargarPreguntaSeleccionMultiple(pregunta, cont);
    } else if (tipo === 'emparejamiento') {
        cargarPreguntaEmparejamiento(pregunta, cont);
    } else if (tipo === 'ordenamiento') {  // ✅ AGREGAR ESTA LÍNEA
    cargarPreguntaOrdenamiento(pregunta, cont);
    } 
    
    document.getElementById('progress-display').innerText = `Pregunta ${indiceActual + 1} de ${preguntasExamen.length}`;

    if(indiceActual === preguntasExamen.length - 1) {
        btnNextQuestion.innerHTML = 'Finalizar <i class="fa-solid fa-check"></i>';
    } else {
        btnNextQuestion.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
    }
}

// === 10. CARGAR PREGUNTA MÚLTIPLE ===
function cargarPreguntaMultiple(pregunta, cont) {
    pregunta.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.innerText = opcion;
        btn.onclick = () => seleccionarOpcion(index, btn);
        cont.appendChild(btn);
    });
}

// === 11. CARGAR PREGUNTA SELECCIÓN MÚLTIPLE ===
function cargarPreguntaSeleccionMultiple(pregunta, cont) {
    const isStudyMode = document.getElementById('mode-select').value === 'study';
    
    pregunta.opciones.forEach((opcion, index) => {
        const div = document.createElement('div');
        div.className = 'checkbox-option';
        div.innerHTML = `
            <input type="checkbox" id="opt-${index}" value="${index}">
            <label for="opt-${index}" style="cursor: pointer; flex: 1; margin: 0;">${opcion}</label>
        `;
        
        const checkbox = div.querySelector('input');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                div.classList.add('selected');
                if (!seleccionesTemporales.includes(index)) {
                    seleccionesTemporales.push(index);
                }
            } else {
                div.classList.remove('selected');
                seleccionesTemporales = seleccionesTemporales.filter(i => i !== index);
            }
            
            if (seleccionesTemporales.length > 0) {
                if (isStudyMode) {
                    const btnConfirmar = document.querySelector('.btn-confirmar-multiple');
                    if (btnConfirmar) btnConfirmar.style.display = 'block';
                } else {
                    btnNextQuestion.classList.remove('hidden');
                }
            } else {
                if (isStudyMode) {
                    const btnConfirmar = document.querySelector('.btn-confirmar-multiple');
                    if (btnConfirmar) btnConfirmar.style.display = 'none';
                } else {
                    btnNextQuestion.classList.add('hidden');
                }
            }
        });
        
        cont.appendChild(div);
    });
    
    // Agregar botón de confirmar solo en modo estudio
    if (isStudyMode) {
        const btnConfirmar = document.createElement('button');
        btnConfirmar.className = 'btn-primary btn-confirmar-multiple';
        btnConfirmar.style.marginTop = '15px';
        btnConfirmar.style.color = '#000';
        btnConfirmar.style.display = 'none';
        btnConfirmar.innerHTML = 'Confirmar Respuesta';
        btnConfirmar.onclick = () => {
            if (seleccionesTemporales.length > 0) {
                btnConfirmar.style.display = 'none';
                mostrarResultadoInmediatoSeleccionMultiple();
            }
        };
        cont.appendChild(btnConfirmar);
    }
}

// === 12. CARGAR PREGUNTA EMPAREJAMIENTO ===
function cargarPreguntaEmparejamiento(pregunta, cont) {
    const isStudyMode = document.getElementById('mode-select').value === 'study';
    
    const matchingDiv = document.createElement('div');
    matchingDiv.className = 'matching-container';
    
    // Mezclar las opciones de la derecha
    const derechas = [...pregunta.pares.map(p => p.derecha)].sort(() => 0.5 - Math.random());
    
    pregunta.pares.forEach((par, index) => {
        const pairDiv = document.createElement('div');
        pairDiv.className = 'matching-pair';
        
        const select = document.createElement('select');
        select.id = `match-${index}`;
        select.dataset.correcta = par.derecha; // ✅ Guardar la respuesta correcta
        select.innerHTML = '<option value="">Seleccione...</option>';
        
        derechas.forEach((derecha) => {
            select.innerHTML += `<option value="${derecha}">${derecha}</option>`; // ✅ Usar el texto como valor
        });
        
        select.addEventListener('change', () => {
            verificarEmparejamientoCompleto(isStudyMode);
        });
        
        pairDiv.innerHTML = `
            <div class="matching-left">${par.izquierda}</div>
            <div class="matching-arrow">→</div>
            <div class="matching-right"></div>
        `;
        
        pairDiv.querySelector('.matching-right').appendChild(select);
        matchingDiv.appendChild(pairDiv);
    });
    
    cont.appendChild(matchingDiv);
    
    // Agregar botón de confirmar solo en modo estudio
    if (isStudyMode) {
        const btnConfirmar = document.createElement('button');
        btnConfirmar.className = 'btn-primary';
        btnConfirmar.id = 'btn-confirmar-emparejamiento';
        btnConfirmar.style.marginTop = '15px';
        btnConfirmar.style.display = 'none';
        btnConfirmar.style.color = '#000';
        btnConfirmar.innerHTML = 'Confirmar Respuesta';
        btnConfirmar.onclick = () => {
            btnConfirmar.style.display = 'none';
            validarRespuestaEmparejamiento();
        };
        cont.appendChild(btnConfirmar);
    }
}

function verificarEmparejamientoCompleto(isStudyMode = false) {
    const selects = document.querySelectorAll('[id^="match-"]');
    let todosCompletos = true;
    
    selects.forEach(select => {
        if (!select.value) todosCompletos = false;
    });
    
    if (todosCompletos) {
        if (isStudyMode) {
            const btnConfirmar = document.getElementById('btn-confirmar-emparejamiento');
            if (btnConfirmar) btnConfirmar.style.display = 'block';
        } else {
            btnNextQuestion.classList.remove('hidden');
        }
    } else {
        if (isStudyMode) {
            const btnConfirmar = document.getElementById('btn-confirmar-emparejamiento');
            if (btnConfirmar) btnConfirmar.style.display = 'none';
        } else {
            btnNextQuestion.classList.add('hidden');
        }
    }
}

// ✅ Función para verificar si el emparejamiento es correcto
function verificarEmparejamiento() {
    const selects = document.querySelectorAll('[id^="match-"]');
    let todasCorrectas = true;
    
    selects.forEach(select => {
        const seleccionada = select.value;
        const correcta = select.dataset.correcta;
        
        if (seleccionada !== correcta) {
            todasCorrectas = false;
        }
    });
    
    return todasCorrectas;
}

// ✅ Función para mostrar resultado inmediato de emparejamiento (modo estudio)
function validarRespuestaEmparejamiento() {
    const selects = document.querySelectorAll('[id^="match-"]');
    const correcto = verificarEmparejamiento();
    
    // Deshabilitar todos los selects
    selects.forEach(select => {
        select.disabled = true;
        const pairDiv = select.closest('.matching-pair');
        const correcta = select.dataset.correcta;
        
        if (select.value === correcta) {
            pairDiv.classList.add('correct');
            pairDiv.style.backgroundColor = '#e6f4ea';
        } else {
            pairDiv.classList.add('incorrect');
            pairDiv.style.backgroundColor = '#fce8e6';
            // Mostrar la respuesta correcta
            const rightDiv = pairDiv.querySelector('.matching-right');
            const correctDiv = document.createElement('div');
            correctDiv.className = 'correct-answer';
            correctDiv.style.cssText = 'margin-top: 8px; padding: 8px; background-color: #d4edda; border-radius: 4px; font-size: 0.9em; color: #155724;';
            correctDiv.textContent = `✓ Correcta: ${correcta}`;
            rightDiv.appendChild(correctDiv);
        }
    });
    
    // Mostrar mensaje general
    const pregunta = preguntasExamen[indiceActual];
    const feedback = document.createElement('div');
    feedback.className = `feedback-box ${correcto ? 'correct' : 'incorrect'}`;
    feedback.style.cssText = 'margin-top: 20px; padding: 15px; border-radius: 8px;';
    feedback.style.backgroundColor = correcto ? '#d4edda' : '#f8d7da';
    feedback.style.border = correcto ? '2px solid #28a745' : '2px solid #dc3545';
    feedback.innerHTML = `
        <strong>${correcto ? '¡Correcto!' : 'Incorrecto'}</strong>
        <p>${pregunta.explicacion || ''}</p>
    `;
    
    const cont = document.getElementById('options-container');
    cont.appendChild(feedback);
    
    // Registrar respuesta
    respuestasUsuario.push(correcto ? 'correcta' : 'incorrecta');
    
    // Mostrar botón siguiente
    btnNextQuestion.classList.remove('hidden');
}

// === CARGAR PREGUNTA ORDENAMIENTO ===
function cargarPreguntaOrdenamiento(pregunta, cont) {
    const isStudyMode = document.getElementById('mode-select').value === 'study';
    
    const orderingDiv = document.createElement('div');
    orderingDiv.className = 'ordering-container';
    orderingDiv.id = 'ordering-container';
    
    // Mezclar los items aleatoriamente
    const itemsMezclados = pregunta.items.map((item, idx) => ({ 
        texto: item, 
        indiceOriginal: idx 
    })).sort(() => 0.5 - Math.random());
    
    itemsMezclados.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'ordering-item';
        itemDiv.draggable = true;
        itemDiv.dataset.indiceOriginal = item.indiceOriginal;
        itemDiv.dataset.posicionActual = index;
        
        itemDiv.innerHTML = `
            <div class="ordering-number">${index + 1}</div>
            <div class="ordering-text">${item.texto}</div>
            <div class="ordering-handle">⋮⋮</div>
        `;
        
        // Eventos de arrastre
        itemDiv.addEventListener('dragstart', handleDragStart);
        itemDiv.addEventListener('dragover', handleDragOver);
        itemDiv.addEventListener('drop', handleDrop);
        itemDiv.addEventListener('dragend', handleDragEnd);
        
        orderingDiv.appendChild(itemDiv);
    });
    
    cont.appendChild(orderingDiv);
    
    // Agregar botón de confirmar en modo estudio
    if (isStudyMode) {
        const btnConfirmar = document.createElement('button');
        btnConfirmar.className = 'btn-primary';
        btnConfirmar.id = 'btn-confirmar-ordenamiento';
        btnConfirmar.style.marginTop = '15px';
        btnConfirmar.innerHTML = 'Confirmar Orden';
        btnConfirmar.onclick = () => {
            btnConfirmar.style.display = 'none';
            validarRespuestaOrdenamiento();
        };
        cont.appendChild(btnConfirmar);
    } else {
        // En modo examen, mostrar el botón siguiente automáticamente
        btnNextQuestion.classList.remove('hidden');
    }
}

// Variables para el drag and drop
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const container = document.getElementById('ordering-container');
        const items = Array.from(container.children);
        const draggedIndex = items.indexOf(draggedElement);
        const targetIndex = items.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
        
        // Actualizar números
        actualizarNumerosOrdenamiento();
    }
    
    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    
    const items = document.querySelectorAll('.ordering-item');
    items.forEach(item => {
        item.classList.remove('over');
    });
}

function actualizarNumerosOrdenamiento() {
    const items = document.querySelectorAll('.ordering-item');
    items.forEach((item, index) => {
        const numberDiv = item.querySelector('.ordering-number');
        numberDiv.textContent = index + 1;
        item.dataset.posicionActual = index;
    });
}

function validarRespuestaOrdenamiento() {
    const pregunta = preguntasExamen[indiceActual];
    const items = document.querySelectorAll('.ordering-item');
    const ordenUsuario = Array.from(items).map(item => parseInt(item.dataset.indiceOriginal));
    const ordenCorrecto = pregunta.orden_correcto;
    
    let correcto = JSON.stringify(ordenUsuario) === JSON.stringify(ordenCorrecto);
    
    // Deshabilitar arrastre
    items.forEach((item, index) => {
        item.draggable = false;
        item.style.cursor = 'default';
        
        const posicionCorrecta = ordenCorrecto.indexOf(parseInt(item.dataset.indiceOriginal));
        
        if (posicionCorrecta === index) {
            item.classList.add('correct');
            item.style.backgroundColor = '#e6f4ea';
            item.style.borderLeft = '4px solid #28a745';
        } else {
            item.classList.add('incorrect');
            item.style.backgroundColor = '#fce8e6';
            item.style.borderLeft = '4px solid #dc3545';
            
            // Mostrar posición correcta
            const correctDiv = document.createElement('div');
            correctDiv.style.cssText = 'padding: 5px 10px; margin-top: 5px; background: #d4edda; border-radius: 4px; font-size: 0.85em; color: #155724;';
            correctDiv.textContent = `✓ Posición correcta: ${posicionCorrecta + 1}`;
            item.appendChild(correctDiv);
        }
    });
    
    // Mostrar feedback general
    const feedback = document.createElement('div');
    feedback.className = `feedback-box ${correcto ? 'correct' : 'incorrect'}`;
    feedback.style.cssText = 'margin-top: 20px; padding: 15px; border-radius: 8px;';
    feedback.style.backgroundColor = correcto ? '#d4edda' : '#f8d7da';
    feedback.style.border = correcto ? '2px solid #28a745' : '2px solid #dc3545';
    feedback.innerHTML = `
        <strong>${correcto ? '¡Correcto!' : 'Incorrecto'}</strong>
        <p>${pregunta.explicacion || ''}</p>
    `;
    
    const cont = document.getElementById('options-container');
    cont.appendChild(feedback);
    
    // Registrar respuesta
    respuestasUsuario.push(ordenUsuario);
    
    // Mostrar botón siguiente
    btnNextQuestion.classList.remove('hidden');
}

// === 13. SELECCIONAR OPCIÓN ===
function seleccionarOpcion(index, btnClickeado) {
    const isStudyMode = document.getElementById('mode-select').value === 'study';

    if (isStudyMode && seleccionTemporal !== null) {
        return;
    }
    
    seleccionTemporal = index;
    const botones = document.getElementById('options-container').querySelectorAll('button');
    botones.forEach(b => b.classList.remove('option-selected'));
    btnClickeado.classList.add('option-selected');
    
    if (isStudyMode) {
        mostrarResultadoInmediatoMultiple(index);
    } else {
        btnNextQuestion.classList.remove('hidden');
    }
}

// === 14. MOSTRAR RESULTADO INMEDIATO (MODO ESTUDIO) ===
function mostrarResultadoInmediatoMultiple(seleccionada) {
    const pregunta = preguntasExamen[indiceActual];
    const correcta = pregunta.respuesta;
    const cont = document.getElementById('options-container');
    const botones = cont.querySelectorAll('button');
    
    botones.forEach(btn => btn.disabled = true);

    botones.forEach((btn, index) => {
        btn.classList.remove('option-selected');
        
        if (index === correcta) {
            btn.classList.add('ans-correct', 'feedback-visible');
        } else if (index === seleccionada) {
            btn.classList.add('ans-wrong', 'feedback-visible');
        }
    });

    const divExplicacion = document.createElement('div');
    divExplicacion.className = 'explanation-feedback';
    divExplicacion.innerHTML = `<strong>Explicación:</strong> ${pregunta.explicacion}`;
    cont.appendChild(divExplicacion);
    
    respuestasUsuario.push(seleccionada);
    btnNextQuestion.classList.remove('hidden');
}

function mostrarResultadoInmediatoSeleccionMultiple() {
    const pregunta = preguntasExamen[indiceActual];
    const correctas = pregunta.respuestas_correctas || [];
    const cont = document.getElementById('options-container');
    const checkboxOptions = cont.querySelectorAll('.checkbox-option');
    
    // Deshabilitar todos los checkboxes
    checkboxOptions.forEach(opt => {
        const checkbox = opt.querySelector('input[type="checkbox"]');
        checkbox.disabled = true;
        opt.style.cursor = 'default';
    });

    // Aplicar feedback visual
    checkboxOptions.forEach((opt, index) => {
        const checkbox = opt.querySelector('input[type="checkbox"]');
        const esCorrecta = correctas.includes(index);
        const fueSeleccionada = checkbox.checked;
        
        opt.classList.remove('selected');
        
        if (esCorrecta && fueSeleccionada) {
            opt.classList.add('ans-correct', 'feedback-visible');
        } else if (esCorrecta && !fueSeleccionada) {
            opt.classList.add('ans-correct');
            opt.style.opacity = '0.7';
        } else if (!esCorrecta && fueSeleccionada) {
            opt.classList.add('ans-wrong', 'feedback-visible');
        }
    });

    const divExplicacion = document.createElement('div');
    divExplicacion.className = 'explanation-feedback';
    divExplicacion.innerHTML = `<strong>Explicación:</strong> ${pregunta.explicacion}`;
    cont.appendChild(divExplicacion);
    
    respuestasUsuario.push([...seleccionesTemporales]);
    btnNextQuestion.classList.remove('hidden');
}

// === 15. BOTÓN SIGUIENTE ===
btnNextQuestion.addEventListener('click', () => {
    const isStudyMode = document.getElementById('mode-select').value === 'study';
    const pregunta = preguntasExamen[indiceActual];
    
    // En modo estudio para pregunta múltiple, ya se registró la respuesta
    if (isStudyMode && pregunta.tipo === 'multiple' && seleccionTemporal !== null) {
        indiceActual++;
        cargarPregunta();
        return;
    }
    
    // En modo estudio para selección múltiple y emparejamiento, ya se registró la respuesta
    if (isStudyMode && (pregunta.tipo === 'multiple_seleccion' || pregunta.tipo === 'emparejamiento')) {
        indiceActual++;
        cargarPregunta();
        return;
    }
    
    // Modo examen - registrar respuestas
    // En la función del evento btnNextQuestion, agregar en la sección de modo examen:
    if (!isStudyMode) {
        if (pregunta.tipo === 'multiple_seleccion') {
            respuestasUsuario.push([...seleccionesTemporales]);
        } else if (pregunta.tipo === 'emparejamiento') {
            const respuestaEmparejamiento = [];
            const derechas = pregunta.pares.map(p => p.derecha);
            pregunta.pares.forEach((par, idx) => {
                const select = document.getElementById(`match-${idx}`);
                const valorTexto = select.value;
                const indiceValor = derechas.indexOf(valorTexto);
                respuestaEmparejamiento.push(indiceValor);
            });
            respuestasUsuario.push(respuestaEmparejamiento);
        } else if (pregunta.tipo === 'ordenamiento') {  // ✅ AGREGAR ESTO
            const items = document.querySelectorAll('.ordering-item');
            const ordenUsuario = Array.from(items).map(item => parseInt(item.dataset.indiceOriginal));
            respuestasUsuario.push(ordenUsuario);
        } else if (pregunta.tipo === 'multiple' && seleccionTemporal !== null) {
            respuestasUsuario.push(seleccionTemporal);
        }
    }
    
    indiceActual++;
    cargarPregunta();
});

// === 16. RELOJ ===
function iniciarReloj() {
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        let m = Math.floor(tiempoRestante / 60), s = tiempoRestante % 60;
        document.getElementById('timer-display').innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (tiempoRestante <= 0) { 
            clearInterval(intervaloTiempo); 
            terminarQuiz(); 
        }
    }, 1000);
}

// === 17. TERMINAR QUIZ ===
function terminarQuiz() {
    clearInterval(intervaloTiempo);
    let aciertos = 0;
    preguntasExamen.forEach((p, i) => {
        if (p.tipo === 'multiple') {
            if (respuestasUsuario[i] === p.respuesta) aciertos++;
        } else if (p.tipo === 'multiple_seleccion') {
            const respUsuario = respuestasUsuario[i] || [];
            const correctas = p.respuestas_correctas || [];
            if (JSON.stringify(respUsuario.sort()) === JSON.stringify(correctas.sort())) {
                aciertos++;
            }
        } else if (p.tipo === 'emparejamiento') {
            const respUsuario = respuestasUsuario[i] || [];
            let correcto = true;
            p.pares.forEach((par, idx) => {
                const derechas = p.pares.map(p => p.derecha);
                if (derechas[respUsuario[idx]] !== par.derecha) {
                    correcto = false;
                }
            });
            if (correcto) aciertos++;
        } else if (p.tipo === 'ordenamiento') {  // ✅ AGREGAR ESTO
            const respUsuario = respuestasUsuario[i] || [];
            if (JSON.stringify(respUsuario) === JSON.stringify(p.orden_correcto)) {
                aciertos++;
            }
        }
    });
    
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    document.getElementById('score-final').innerText = `${aciertos} / ${preguntasExamen.length}`;
    
    const modeSelect = document.getElementById('mode-select');
    if (modeSelect && modeSelect.value === 'study') {
        document.getElementById('btn-review').classList.add('hidden');
    } else {
        document.getElementById('btn-review').classList.remove('hidden');
    }
}

// === 18. REVISIÓN ===
document.getElementById('btn-review').addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    reviewScreen.classList.remove('hidden');
    const cont = document.getElementById('review-container');
    cont.innerHTML = '';
    
    preguntasExamen.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'review-item';
        
        const tiposTexto = {
            'multiple': '📝 Opción Múltiple',
            'multiple_seleccion': '☑️ Selección Múltiple',
            'emparejamiento': '🔗 Emparejamiento',
            'ordenamiento': '🔢 Ordenamiento'  // ✅ AGREGAR
        };
        
        let contenido = `
            <div class="review-type-badge">${tiposTexto[p.tipo]}</div>
            <div class="review-question">${i+1}. ${p.pregunta}</div>
        `;
        
        if (p.tipo === 'multiple') {
            const dada = respuestasUsuario[i];
            const ok = (dada === p.respuesta);
            let ops = '';
            p.opciones.forEach((o, x) => {
                let c = (x === p.respuesta) ? 'ans-correct' : (x === dada && !ok ? 'ans-wrong' : '');
                let ico = (x === p.respuesta) ? '✅ ' : (x === dada && !ok ? '❌ ' : '');
                let b = (x === dada) ? 'user-selected' : '';
                ops += `<div class="review-answer ${c} ${b}">${ico}${o}</div>`;
            });
            contenido += ops;
        } else if (p.tipo === 'multiple_seleccion') {
            const respUsuario = respuestasUsuario[i] || [];
            const correctas = p.respuestas_correctas || [];
            p.opciones.forEach((o, x) => {
                const esCorrecta = correctas.includes(x);
                const fueSeleccionada = respUsuario.includes(x);
                let c = '';
                let ico = '';
                let b = '';
                
                if (esCorrecta && fueSeleccionada) {
                    c = 'ans-correct';
                    ico = '✅ ';
                    b = 'user-selected';
                } else if (esCorrecta && !fueSeleccionada) {
                    c = 'ans-correct';
                    ico = '✅ ';
                } else if (!esCorrecta && fueSeleccionada) {
                    c = 'ans-wrong';
                    ico = '❌ ';
                    b = 'user-selected';
                }
                
                contenido += `<div class="review-answer ${c} ${b}">${ico}${o}</div>`;
            });
        } else if (p.tipo === 'emparejamiento') {
            const respUsuario = respuestasUsuario[i] || [];
            const derechas = p.pares.map(par => par.derecha);
            contenido += '<div class="review-matching">';
            p.pares.forEach((par, idx) => {
                const seleccionUsuario = derechas[respUsuario[idx]] || 'Sin selección';
                const esCorrecta = seleccionUsuario === par.derecha;
                const clase = esCorrecta ? 'ans-correct' : 'ans-wrong';
                const ico = esCorrecta ? '✅' : '❌';
                
                contenido += `
                    <div class="review-matching-pair ${clase}">
                        <div class="review-matching-left">${par.izquierda}</div>
                        <div class="review-matching-arrow">→</div>
                        <div class="review-matching-right">${ico} ${seleccionUsuario}</div>
                    </div>
                `;
                if (!esCorrecta) {
                    contenido += `<div style="padding: 5px 10px; font-size: 0.8rem; color: #28a745;">✓ Correcto: ${par.derecha}</div>`;
                }
            });
            contenido += '</div>';
        } else if (p.tipo === 'ordenamiento') {  // ✅ AGREGAR TODA ESTA SECCIÓN
            const respUsuario = respuestasUsuario[i] || [];
            const ordenCorrecto = p.orden_correcto;
            
            contenido += '<div class="review-ordering">';
            contenido += '<div style="font-weight: 600; margin-bottom: 10px; color: #555;">Tu orden:</div>';
            
            respUsuario.forEach((indiceItem, posicion) => {
                const texto = p.items[indiceItem];
                const posicionCorrecta = ordenCorrecto.indexOf(indiceItem);
                const esCorrecta = posicionCorrecta === posicion;
                const clase = esCorrecta ? 'ans-correct' : 'ans-wrong';
                const ico = esCorrecta ? '✅' : '❌';
                
                contenido += `
                    <div class="review-ordering-item ${clase}">
                        <div class="review-ordering-number">${posicion + 1}</div>
                        <div class="review-ordering-text">${ico} ${texto}</div>
                    </div>
                `;
                
                if (!esCorrecta) {
                    contenido += `<div style="padding: 5px 15px; font-size: 0.8rem; color: #28a745; margin-bottom: 8px;">✓ Posición correcta: ${posicionCorrecta + 1}</div>`;
                }
            });
            
            // Mostrar orden correcto
            contenido += '<div style="font-weight: 600; margin-top: 15px; margin-bottom: 10px; color: #555; border-top: 1px solid #ddd; padding-top: 15px;">Orden correcto:</div>';
            ordenCorrecto.forEach((indiceItem, posicion) => {
                const texto = p.items[indiceItem];
                contenido += `
                    <div class="review-ordering-item ans-correct" style="opacity: 0.8;">
                        <div class="review-ordering-number">${posicion + 1}</div>
                        <div class="review-ordering-text">${texto}</div>
                    </div>
                `;
            });
            
            contenido += '</div>';
        }
        
        contenido += `<div class="review-explanation"><strong>Explicación:</strong> ${p.explicacion}</div>`;
        card.innerHTML = contenido;
        cont.appendChild(card);
    });
});