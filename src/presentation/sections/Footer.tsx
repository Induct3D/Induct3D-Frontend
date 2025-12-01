export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-200 px-6 py-10 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo / Nombre */}
                <div className="text-xl font-bold">
                    Induct<span className="text-[#A71C20]">3D</span>
                </div>

                {/* Enlaces legales */}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                    <a
                        href="/terms"
                        className="hover:text-[#A71C20] transition-colors duration-200"
                    >
                        Términos y Condiciones
                    </a>
                    <span className="hidden md:inline text-gray-500">|</span>
                    <a
                        href="/privacy"
                        className="hover:text-[#A71C20] transition-colors duration-200"
                    >
                        Política de Privacidad
                    </a>
                    <span className="hidden md:inline text-gray-500">|</span>
                    <a
                        href="/consent"
                        className="hover:text-[#A71C20] transition-colors duration-200"
                    >
                        Consentimiento Informado
                    </a>
                    <span className="hidden md:inline text-gray-500">|</span>
                    <a
                        href="/sostenibilidad"
                        className="hover:text-[#A71C20] transition-colors duration-200"
                    >
                        Prácticas de Uso Sostenible
                    </a>
                </div>

                {/* Información final */}
                <div className="text-xs text-gray-500 text-center md:text-right">
                    © {new Date().getFullYear()} Induct3D. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}