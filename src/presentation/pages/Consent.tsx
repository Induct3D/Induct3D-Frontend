export default function Consent(){
    return (
        <main className="min-h-screen bg-white text-slate-800">
            <section className="mx-auto w-full max-w-7xl px-6 py-12">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Consentimiento Informado</h1>
                <p className="mt-2 text-sm text-slate-500">Última actualización: 28 de octubre de 2025</p>

                <p className="mt-8">
                    Antes de registrarte en <strong>Induct3D</strong>, deberás aceptar expresamente el siguiente consentimiento para el tratamiento de tus datos personales:
                </p>

                <blockquote className="mt-4 rounded-2xl border-l-4 border-slate-300 bg-slate-50 p-4 text-slate-700">
                    <p>
                        «Autorizo el tratamiento de mis datos personales (nombre, apellidos, nombre de usuario, correo electrónico y contraseña) por parte de Induct3D
                        con la finalidad de gestionar mi cuenta, facilitar el acceso a recorridos de inducción en entornos 3D y mantener la seguridad del servicio.
                        Declaro haber leído y acepto la Política de Privacidad y los Términos y Condiciones, de acuerdo con la Ley N.º 29733 y la NTP ISO/IEC 27701:2020.
                        Podré revocar este consentimiento en cualquier momento.»
                    </p>
                </blockquote>

                <h2 className="mt-8 text-xl font-semibold">Cómo se Recaba el Consentimiento</h2>
                <ul className="mt-3 list-disc pl-6 space-y-1">
                    <li>Casilla de verificación obligatoria en el formulario de registro (no pre‑marcada).</li>
                    <li>Registro de marca de tiempo (timestamp), IP y versión del texto aceptado.</li>
                    <li>Opción para descargar el comprobante de aceptación.</li>
                </ul>

                <h2 className="mt-8 text-xl font-semibold">Retiro del Consentimiento</h2>
                <p className="mt-3">
                    Puedes retirar tu consentimiento desde el perfil de usuario o escribiendo a <a className="underline" href="mailto:privacidad@induct3d.app">privacidad@induct3d.app</a>.
                    El retiro no afecta la licitud del tratamiento previo.
                </p>

                <h2 className="mt-8 text-xl font-semibold">Contacto</h2>
                <p className="mt-3">Soporte: <a className="underline" href="mailto:induct3d2025@gmail.com">induct3d2025@gmail.com</a></p>
            </section>
        </main>
    );
}