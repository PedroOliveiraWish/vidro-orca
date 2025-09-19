export const getOrcamentos = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orcamentos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response;
    } catch (error) {
        console.error("Erro ao buscar orcamentos:", error);
        throw error;
    }
}