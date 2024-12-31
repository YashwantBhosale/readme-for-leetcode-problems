async function fetchProblem(title: string) {
    try {
        const problem = await fetch(`/api/fetchproblem?title=${title}`);
        const data = await problem.json();
        return data;
    } catch (e) {
        console.error("Error:", e);
    }
}

async function fetchReadme(html: string) {
    try {
        const response = await fetch("/api/getreadme", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ html }),
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error:", e);
    }
}

export { fetchProblem, fetchReadme };