// src/infrastructure/routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRefreshMutation, useLazyValidateTokenQuery } from "../api/authApi.ts";

// ---- Utils JWT ----
function decodeExp(token: string): number | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return typeof payload.exp === 'number' ? payload.exp : null
    } catch { return null }
}
function isExpired(expSeconds: number, skewSec = 15): boolean {
    const now = Math.floor(Date.now() / 1000)
    return expSeconds - skewSec <= now
}

type UserRole = "ADMIN" | "CREATOR";

export default function PrivateRoute({ roles }: { roles?: UserRole[] }) {
    const [status, setStatus] = useState<'checking'|'ok'|'fail'>('checking')
    const role = (localStorage.getItem("role") as UserRole | null) || null

    const token = useMemo(() => localStorage.getItem("token"), [])
    const [refresh] = useRefreshMutation()
    const [triggerValidate] = useLazyValidateTokenQuery()
    const lastValidatedAt = useRef<number>(0)

    useEffect(() => {
        const goLogin = () => {
            localStorage.removeItem('token')
            setStatus('fail')
        }

        if (!token) return goLogin()

        const exp = decodeExp(token)
        if (!exp) return goLogin()
        if (isExpired(exp)) return goLogin()

        const secondsLeft = exp - Math.floor(Date.now()/1000)

        const doValidateOnce = async () => {
            // Evita spam: máx 1 vez / 5 min
            if (Date.now() - lastValidatedAt.current < 5 * 60 * 1000) return
            lastValidatedAt.current = Date.now()
            try {
                const res = await triggerValidate().unwrap()
                if (res.data.status !== 'OK') throw new Error('invalid')
            } catch {
                goLogin()
                throw new Error('invalid')
            }
        }

        const run = async () => {
            // Si faltan <120s, intenta refresh; si falla, valida 1 vez; si falla → login
            if (secondsLeft < 120) {
                try {
                    await refresh().unwrap()
                    setStatus('ok')
                } catch {
                    try {
                        await doValidateOnce()
                        setStatus('ok')
                    } catch {
                        /* goLogin ya se llamó dentro */
                    }
                }
            } else {
                setStatus('ok')
            }
        }

        run()
    }, [token, refresh, triggerValidate])

    // Validar al volver al tab (sin sobrecargar)
    useEffect(() => {
        const onVis = async () => {
            if (document.visibilityState !== 'visible') return
            const t = localStorage.getItem('token')
            if (!t) return
            const exp = decodeExp(t)
            if (!exp) return
            if (isExpired(exp)) {
                localStorage.removeItem('token')
                setStatus('fail')
            } else if (exp - Math.floor(Date.now()/1000) < 120) {
                try { await refresh().unwrap() } catch { /* el guard lo resolverá */ }
            }
        }
        document.addEventListener('visibilitychange', onVis)
        return () => document.removeEventListener('visibilitychange', onVis)
    }, [refresh])

    if (status === 'checking') return <div>Cargando…</div>
    if (status === 'fail') return <Navigate to="/iniciar-sesion" replace />

    // Control de roles (solo si ya pasó auth)
    if (roles && roles.length > 0) {
        if (!role || !roles.includes(role)) return <Navigate to="/403" replace />
    }

    return <Outlet />
}
