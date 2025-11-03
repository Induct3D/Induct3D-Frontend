// src/infrastructure/utils/jwt.ts
export function decodeExp(token: string): number | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return typeof payload.exp === 'number' ? payload.exp : null
    } catch { return null }
}

export function isExpired(expSeconds: number, skewSec = 15): boolean {
    const now = Math.floor(Date.now() / 1000)
    return expSeconds - skewSec <= now
}
