export const getClientes = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes`, {
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
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
}