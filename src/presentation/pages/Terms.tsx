export default function Terms(){
    return (
        <main className="min-h-screen bg-white text-slate-800">
            <section className="mx-auto w-full max-w-7xl px-6 py-12">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Términos y Condiciones</h1>
                <p className="mt-2 text-sm text-slate-500">Última actualización: 28 de octubre de 2025</p>

                <p className="mt-8">
                    Bienvenido(a) a <strong>Induct3D</strong>, una aplicación web que permite crear y visualizar
                    recorridos de inducción en entornos 3D gamificados. Al usar el servicio aceptas íntegramente estos
                    Términos y Condiciones. Si no estás de acuerdo, por favor no utilices la plataforma.
                </p>

                <h2 className="mt-8 text-xl font-semibold">1. Objeto del Servicio</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>Creación y administración de recorridos de inducción en 3D.</li>
                    <li>Personalización de contenido educativo/corporativo.</li>
                    <li>Compartición y visualización de recorridos públicos o protegidos.</li>
                </ul>

                <h2 className="mt-8 text-xl font-semibold">2. Registro y Cuenta</h2>
                <p className="mt-3">
                    Para funciones completas se requiere registro con datos verídicos (nombre, apellidos, correo y contraseña).
                    Eres responsable de mantener la confidencialidad de tus credenciales. Induct3D puede suspender cuentas que
                    infrinjan estos términos o la legislación vigente.
                </p>

                <h2 className="mt-8 text-xl font-semibold">3. Uso Aceptable</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>No utilizar el servicio con fines ilícitos o que vulneren derechos de terceros.</li>
                    <li>No intentar vulnerar la seguridad, integridad o disponibilidad del sistema.</li>
                    <li>No cargar contenidos que infrinjan derechos de autor, marcas o privacidad.</li>
                </ul>

                <h2 className="mt-8 text-xl font-semibold">4. Propiedad Intelectual</h2>
                <p className="mt-3">
                    El software, diseño, interfaces y contenidos propios de Induct3D son titularidad de sus autores o están licenciados para su uso.
                    Mantienes los derechos sobre tus contenidos; otorgas a Induct3D una licencia limitada para alojarlos y mostrarlos dentro de la plataforma
                    según la visibilidad que elijas.
                </p>

                <h2 className="mt-8 text-xl font-semibold">5. Disponibilidad y Modificaciones</h2>
                <p className="mt-3">
                    Induct3D puede introducir mejoras, cambios o suspender funcionalidades. Cuando haya cambios sustanciales, se notificará y se solicitará
                    aceptación de nuevos términos.
                </p>

                <h2 className="mt-8 text-xl font-semibold">6. Privacidad y Datos Personales</h2>
                <p className="mt-3">
                    El uso del servicio implica la aceptación de la <a href="/privacy" className="underline">Política de Privacidad</a> y del
                    <a href="/consent" className="ml-1 underline">Consentimiento Informado</a>, conforme a la Ley N.º 29733 (Perú) y la NTP ISO/IEC 27701:2020.
                </p>

                <h2 className="mt-8 text-xl font-semibold">7. Limitación de Responsabilidad</h2>
                <p className="mt-3">
                    En la medida permitida por la ley, Induct3D no será responsable por daños indirectos, lucro cesante, pérdida de datos o interrupciones del servicio
                    ocasionadas por terceros, fuerza mayor o uso indebido del sistema.
                </p>

                <h2 className="mt-8 text-xl font-semibold">8. Contacto</h2>
                <p className="mt-3">Consultas sobre estos Términos: <a className="underline" href="mailto:soporte@induct3d.app">soporte@induct3d.app</a></p>

                <h2 className="mt-8 text-xl font-semibold">9. Ley Aplicable y Jurisdicción</h2>
                <p className="mt-3">Estos términos se rigen por la legislación peruana. Jurisdicción: tribunales de Trujillo, Perú.</p>
            </section>
        </main>
    );
}