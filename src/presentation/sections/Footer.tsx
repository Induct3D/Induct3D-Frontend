export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-200 px-6 py-10 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo / Nombre */}
                <div className="text-xl font-bold">
                    Induct<span className="text-[#A71C20]">3D</span>
                </div>

                {/* Enlaces */}
                <div className="flex flex-col md:flex-row gap-4 text-sm">
                    <a href="/about" className="hover:text-white transition">Acerca de</a>
                    <a href="/terms" className="hover:text-white transition">Términos</a>
                    <a href="/contact" className="hover:text-white transition">Contacto</a>
                </div>

                {/* Información final */}
                <div className="text-xs text-gray-400 text-center md:text-right">
                    © {new Date().getFullYear()} Induct3D. Todos los derechos reservados.
                </div>
            </div>
        </footer>

    )
}