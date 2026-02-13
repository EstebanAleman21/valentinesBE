"use client";

import { motion } from "framer-motion";
import { TimelineItem } from "./timeline-item";

const milestones = [
  {
    date: "19 de Julio, 2023",
    title: "El dia que nos conocimos",
    description:
      "Un dia que ninguno de los dos debimos de haber estado en el antro, fue el dia que cambio nuestras vidas para siempre, y el dia que empezo esta hermosa historia de amor.",
  },
  {
    date: "21 de Julio, 2023",
    title: "Nuestra Primera Cita",
    description:
      "Ni 48hrs despues de conocernos y te invite a salir. Y aunque la situacion fue mas complicada de lo que esperaba fue el dia en el que supe que eras una persona especial, y que ibas a cambiar mi vida para siempre.",
  },
  {
    date: "31 de Octubre, 2023",
    title: "Despues de mucho, esta ya era la buena",
    description:
      "Aunque hablamos y dejamos de hablar varias veces, y aunque hubo momentos en los que pense que ya no ibamos a estar juntos, el 1 de noviembre fue el dia en el que supe que esta vez si era la buena, y que ibamos a estar juntos por mucho tiempo.",
  },
  {
    date: "28 de Noviembre, 2023",
    title: "Oficialmente Novios",
    description:
      "Nuestro dia, el dia en el que me diste el primer si de muchos. El dia que oficialmente fuimos novios y el dia que empezo nuestra vida juntos. ",
  },
  {
    date: "Diciembre 2023",
    title: "Nuestras Primeras fiestas juntos",
    description:
      "Aunque fue a distancia, para mi fue muy especial poder compartir nuestras primeras fiestas juntos, y aunque no fue lo mismo que estar juntos en persona, fue un recordatorio de que a pesar de la distancia, nuestro amor seguia creciendo cada dia mas.",
  },
  {
    date: "Febrero 2024",
    title: "Nuestro primer viaje juntos",
    description:
      "Nuestro primer viaje juntos, aunque fue un viaje corto a parras, fue un viaje donde me la pase muy bien contigo y un viaje que siempre voy a recordar con mucho cariño por que fue el primero.",
  },
  {
    date: "Noviembre 2024",
    title: "1 Año de novios",
    description:
      "Cada dia de ese año, el primero juntos lo atesoro, empezamos a vivir juntos, a compartir momentos juntos, a crecar como personas, a apoyarnos mutuamente, a amarnos cada dia mas y mas, y aunque se que va a haber muchos años mas, el primer año siempre va a tener un lugar especial en mi corazon por que fue el año en el que empezo todo.",
  },
  {
    date: "Mayo 2025",
    title: "A muchos Kms pero juntos",
    description:
      "Fue el mes en el que me fui a Nueva York a perseguir un sueño que aunque me emociona muchisimo, en ese momento me dio un poco de miedo por que es un cambio muy grande e iba a ser la primera vez lejos por varios meses, me demostraste que a pesar de la distancia, a pesar de los cambios, a pesar de todo lo que venga, se que vamos a estar juntos y que vamos a seguir amandonos cada dia mas y mas.",
  },
  {
    date: "Noviembre 2025",
    title: "2 Años de novios",
    description:
      "Como pasa el tiempo a tu lado, cada dia de ese año, el segundo juntos lo atesoro aun mas que el primero, a pesar de la distancia, a pesar de los cambios, a pesar de todo lo que vino, seguimos creciendo como personas, seguimos apoyandonos mutuamente, seguimos amandonos cada dia mas y mas, y aunque se que va a haber muchos años mas, el segundo año siempre va a tener un lugar especial en mi corazon por que fue el año en el que a pesar de todo lo que paso, nuestro amor siguio creciendo y fortaleciendose cada dia mas.",
  },
  {
    date: "Febrero 2026",
    title: "Seguimos juntos y más enamorados que nunca",
    description:
      "Llegamos al dia de hoy y aunque va a ser un año tremendamente movido en todos los sentidos, yo se dentro de mi que seguiremos creciendo como individuos y como pareja. Que no hay nada en este mundo que pueda cambiar lo que siento por ti, y que a pesar de los cambios, a pesar de las vueltas que de la vida, a pesar de todo lo que venga, vamos a seguir juntos y mas enamorados que nunca.",
  },
    {
    date: "2026",
    title: "Veremos que nos depara el futuro",
    description:
      "No te gustan planear las cosas pero yo se dentro de mi que este año 2026, sera un año lleno de cambios nuevas etapas y momentos inolvidables. Te amo y no hay nadie en este mundo con quien quiera pasar mi vida.",
  },
];

export function TimelineSection() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            ¿Como vamos en esta historia?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Cada capitulo importante de nuestra historia juntos, desde el primer dia hasta hoy.
          </p>
        </motion.div>
        <div className="flex flex-col items-center">
          {milestones.map((milestone, i) => (
            <TimelineItem
              key={milestone.date}
              date={milestone.date}
              title={milestone.title}
              description={milestone.description}
              index={i}
              isLast={i === milestones.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
