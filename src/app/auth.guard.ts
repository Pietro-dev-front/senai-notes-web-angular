import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const authGuard = () => {
    const router = inject(Router);
    // Protege acesso a localStorage em ambiente SSR
    if (typeof window === 'undefined') {
        router.navigate(["/login"]);
        return false;
    }

    const token = localStorage.getItem("meuToken");
    const userId = localStorage.getItem("meuId");

    if (token != null && userId != null) {
        return true;
    }

    router.navigate(["/login"]);
    return false;

}