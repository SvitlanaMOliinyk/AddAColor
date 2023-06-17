
export async function logout() {
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, { method: "POST" });
            onLogout();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
