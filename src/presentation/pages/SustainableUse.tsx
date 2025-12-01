export default function SustainableUse() {
    return (
        <main className="min-h-screen bg-white text-slate-800">
            <section className="mx-auto w-full max-w-7xl px-6 py-12">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Prácticas de Uso Sostenible
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Última actualización: 12 de noviembre de 2025
                </p>

                <p className="mt-8">
                    En <strong>Induct3D</strong> desarrollamos tecnología enfocada en la
                    eficiencia energética y el respeto por el medio ambiente. Esta página
                    describe nuestras prácticas de software verde, implementadas en todas
                    las fases del ciclo de vida del producto: planificación, desarrollo,
                    pruebas, despliegue, mantenimiento y educación al usuario.
                </p>

                {/* 1 */}
                <h2 className="mt-8 text-xl font-semibold">1. Planificación y Diseño Sostenible</h2>
                <p className="mt-3">
                    Toda la arquitectura de Induct3D fue diseñada considerando su impacto
                    ambiental. Se definieron objetivos de sostenibilidad, se priorizaron
                    principios de diseño energéticamente eficiente y se eligieron
                    tecnologías, frameworks e infraestructura con criterios de bajo consumo
                    y escalabilidad responsable. Asimismo, se documentaron las prácticas
                    ecológicas que guían el desarrollo y crecimiento de la plataforma.
                </p>

                {/* 2 */}
                <h2 className="mt-8 text-xl font-semibold">2. Desarrollo Eficiente</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>Uso de algoritmos y estructuras de datos eficientes.</li>
                    <li>Optimización de cálculos, bucles y consultas para reducir CPU y memoria.</li>
                    <li>Prevención de procesamiento y almacenamiento redundante.</li>
                    <li>Aplicación de técnicas como paginación, compresión y carga diferida.</li>
                    <li>Obtención de datos bajo demanda para evitar transferencias innecesarias.</li>
                    <li>Deshabilitación de tareas y notificaciones no esenciales.</li>
                    <li>Aprovechamiento óptimo de aceleración por hardware cuando corresponde.</li>
                </ul>

                {/* 3 */}
                <h2 className="mt-8 text-xl font-semibold">3. Pruebas y Optimización del Consumo</h2>
                <p className="mt-3">
                    Durante las pruebas se monitorea el rendimiento energético del código,
                    utilizando herramientas de perfilado para identificar procesos costosos.
                    Se refactoriza cuando es necesario y se realizan simulaciones de carga
                    para asegurar que la plataforma mantenga un consumo estable incluso en
                    escenarios de alta demanda.
                </p>

                {/* 4 */}
                <h2 className="mt-8 text-xl font-semibold">4. Implementación Responsable en la Nube</h2>
                <p className="mt-3">
                    Induct3D se despliega en proveedores comprometidos con energías
                    renovables. Se optimizan configuraciones para evitar asignación excesiva
                    de recursos, se reduce la transferencia de datos entre servicios y se
                    seleccionan arquitecturas que minimizan el uso de servidores. Estas
                    decisiones reducen la huella de carbono asociada al funcionamiento del
                    software.
                </p>

                {/* 5 */}
                <h2 className="mt-8 text-xl font-semibold">5. Mantenimiento y Supervisión Continua</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>Monitoreo periódico de consumo energético en frontend y backend.</li>
                    <li>Uso de métricas del proveedor cloud para evaluar impacto ambiental.</li>
                    <li>Actualización y optimización continua del código según datos reales.</li>
                    <li>Extensión de la vida útil de dispositivos gracias a prácticas de eficiencia.</li>
                    <li>Mantenimiento de documentación sobre mejoras y estrategias verdes.</li>
                </ul>

                {/* 6 */}
                <h2 className="mt-8 text-xl font-semibold">6. Educación y Participación del Usuario</h2>
                <p className="mt-3">
                    Induct3D promueve un uso consciente informando a los usuarios sobre las
                    prácticas sostenibles aplicadas, diseñando interfaces que fomentan
                    comportamientos eficientes y habilitando la posibilidad de brindar
                    retroalimentación. La plataforma también comunica su impacto ambiental
                    en alineación con normas internacionales de sostenibilidad digital.
                </p>

                {/* 7 */}
                <h2 className="mt-8 text-xl font-semibold">7. Nuestro Compromiso</h2>
                <p className="mt-3">
                    Creemos que la innovación debe ser compatible con la responsabilidad
                    ambiental. Induct3D seguirá fortaleciendo sus prácticas de software
                    verde y adoptando nuevas estrategias que permitan reducir aún más el
                    consumo energético y las emisiones asociadas a la operación del
                    sistema.
                </p>

                {/* Contacto */}
                <h2 className="mt-8 text-xl font-semibold">8. Contacto</h2>
                <p className="mt-3">
                    Si tienes consultas sobre nuestras prácticas de sostenibilidad, puedes
                    escribirnos a:{" "}
                    <a className="underline" href="mailto:induct3d2025@gmail.com">
                        induct3d2025@gmail.com
                    </a>
                </p>
            </section>
        </main>
    );
}
