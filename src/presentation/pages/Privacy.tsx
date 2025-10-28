export default function Privacy(){
    return (
        <main className="min-h-screen bg-white text-slate-800">
            <section className="mx-auto w-full max-w-7xl px-6 py-12">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Política de Privacidad</h1>
                <p className="mt-2 text-sm text-slate-500">Última actualización: 28 de octubre de 2025</p>

                <p className="mt-8">
                    En <strong>Induct3D</strong> respetamos tu privacidad. Tratamos tus datos personales de manera lícita, leal y transparente,
                    conforme a la Ley N.º 29733 – Ley de Protección de Datos Personales y la NTP ISO/IEC 27701:2020.
                </p>

                <h2 className="mt-8 text-xl font-semibold">1. Responsable del Tratamiento</h2>
                <p className="mt-3">Induct3D (equipo del proyecto académico-profesional). Contacto: <a className="underline" href="mailto:induct3d2025@gmail.com">induct3d2025@gmail.com</a></p>

                <h2 className="mt-8 text-xl font-semibold">2. Datos que Recopilamos</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>Identificación: nombre y apellidos, nombre de usuario.</li>
                    <li>Contacto: correo electrónico.</li>
                    <li>Credenciales: contraseña (almacenada como hash).</li>
                    <li>Datos técnicos: IP, agente de usuario, métricas de uso, almacenamiento local.</li>
                </ul>

                <h2 className="mt-8 text-xl font-semibold">3. Finalidades</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>Gestionar tu cuenta y acceso a recorridos.</li>
                    <li>Soporte y recuperación de acceso.</li>
                    <li>Seguridad del servicio (detección de abuso/fraude).</li>
                    <li>Mejora continua de funcionalidades y experiencia.</li>
                    <li>Cumplimiento de obligaciones legales.</li>
                </ul>

                <h2 className="mt-8 text-xl font-semibold">4. Base Legal</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>Consentimiento del titular.</li>
                    <li>Ejecución de una relación contractual (prestación del servicio).</li>
                    <li>Interés legítimo en seguridad y mejora.</li>
                    <li>Cumplimiento de obligaciones legales.</li>
                </ul>

                <h2 className="mt-8 text-xl font-semibold">5. Conservación</h2>
                <p className="mt-3">Conservamos datos por el tiempo necesario para las finalidades y hasta 12 meses de inactividad; luego se eliminarán o anonimizarán.</p>

                <h2 className="mt-8 text-xl font-semibold">6. Destinatarios y Transferencias</h2>
                <p className="mt-3">
                    Podemos usar proveedores con estándares de seguridad (p.ej., TLS/AES-256, ISO/IEC 27001). Si hay transferencias internacionales, se aplicarán salvaguardas adecuadas.
                </p>

                <h2 className="mt-8 text-xl font-semibold">7. Seguridad de la Información</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>Cifrado en tránsito y en reposo cuando aplique.</li>
                    <li>Hash seguro de contraseñas y control de acceso.</li>
                    <li>Registro y monitoreo de eventos.</li>
                    <li>Backups y continuidad razonables para el contexto del proyecto.</li>
                </ul>

                <h2 className="mt-8 text-xl font-semibold">8. Derechos ARCO</h2>
                <p className="mt-3">
                    Puedes ejercer Acceso, Rectificación, Cancelación y Oposición o revocar tu consentimiento escribiendo a
                    <a className="ml-1 underline" href="mailto:privacidad@induct3d.app">privacidad@induct3d.app</a> (adjunta identificación para validar la solicitud).
                </p>

                <h2 className="mt-8 text-xl font-semibold">9. Cookies</h2>
                <p className="mt-3">
                    Usamos cookies necesarias y, opcionalmente, analíticas. Puedes gestionar preferencias desde la interfaz o navegador. Revisa el banner/centro de preferencias.
                </p>

                <h2 className="mt-8 text-xl font-semibold">10. Menores de Edad</h2>
                <p className="mt-3">El servicio no está dirigido a menores de 14 años. Eliminaremos registros sin autorización válida.</p>

                <h2 className="mt-8 text-xl font-semibold">11. Cambios</h2>
                <p className="mt-3">Publicaremos actualizaciones aquí y, si son sustanciales, lo notificaremos en la app y pediremos nuevo consentimiento cuando corresponda.</p>

                <h2 className="mt-8 text-xl font-semibold">12. Contacto</h2>
                <p className="mt-3">Privacidad: <a className="underline" href="mailto:induct3d2025@gmail.com">induct3d2025@gmail.com</a></p>
            </section>
        </main>
    );
}
