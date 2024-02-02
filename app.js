class SuperheroSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.resultsContainer = document.getElementById('results');

        this.searchButton.addEventListener('click', this.search.bind(this));
    }

    search() {
        const searchTerm = this.searchInput.value.trim();
        if (searchTerm === '') {
            alert('Por favor, introduce un término de búsqueda.');
            return;
        }

        const apiUrl = `https://superheroapi.com/api.php/1780618432381243/search/${searchTerm}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error de red.');
                }
                return response.json();
            })
            .then(data => {
                this.displayResults(data.results);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al procesar tu solicitud.');
            });
    }

    displayResults(results) {
        this.resultsContainer.innerHTML = '';

        if (results.length === 0) {
            this.resultsContainer.textContent = 'No se encontraron resultados.';
            return;
        }

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${result.name}</h3>
                <p>Inteligencia: ${result.powerstats.intelligence}</p>
                <p>Fuerza: ${result.powerstats.strength}</p>
                <p>Velocidad: ${result.powerstats.speed}</p>
                <p>Publicado por: ${result.biography.publisher}</p>
            `;
            this.resultsContainer.appendChild(resultItem);
        });
    }
}

const superheroSearch = new SuperheroSearch();
