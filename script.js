// Data for attractions — ОСТАВЛЕНЫ ТОЛЬКО 3 ОБЪЕКТА
let places = [
    {
        id: 1,
        name: "Соборная площадь",
        category: "Архитектурный памятник",
        price: 300,
        address: "ул. Соборная, 1",
        description: "Исторический центр города с главными памятниками.",
        image: "5.jpg",
        detailLink: "detaili.html"
    },
    {
        id: 2,
        name: "Исторический музей",
        category: "Культурные",
        price: 150,
        address: "ул. Большая Московская, 1",
        description: "Один из старейших музеев с богатой коллекцией.",
        image: "Muzei01.jpg",
        detailLink: "place-detail.html"
    },
    {
        id: 3,
        name: "Успенский собор",
        category: "Храм",
        price: 200,
        address: "Соборная площадь",
        description: "Один из главных храмов Владимира, памятник ЮНЕСКО.",
        image: "00_Vladimir_Sobor.jpg",
        detailLink: "detaili.html"
    }
];

const itemsPerPage = 6;
let currentPage = 1;
let filteredPlaces = [...places];

function renderPlaces(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedPlaces = filteredPlaces.slice(start, end);

    const container = document.getElementById('places-list');
    container.innerHTML = '';

    paginatedPlaces.forEach(place => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(place.name)}'">
            <h3>${place.name}</h3>
            <p><strong>Категория:</strong> ${place.category}</p>
            <p><strong>Цена:</strong> ${place.price === 0 ? 'Бесплатно' : place.price + ' руб.'}</p>
            <p>${place.description.substring(0, 100)}...</p>
            <a href="${place.detailLink}" class="btn">Подробнее</a>
        `;
        container.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.onclick = () => {
            currentPage = i;
            renderPlaces(currentPage);
        };
        pagination.appendChild(btn);
    }
}

function filterPlaces() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filteredPlaces = places.filter(place =>
        place.name.toLowerCase().includes(searchTerm) ||
        place.description.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderPlaces(currentPage);
}

function sortPlaces() {
    const sortValue = document.getElementById('sort-select').value;
    filteredPlaces.sort((a, b) => {
        if (sortValue === 'name-asc') {
            return a.name.localeCompare(b.name);
        } else if (sortValue === 'name-desc') {
            return b.name.localeCompare(a.name);
        } else if (sortValue === 'price-asc') {
            return a.price - b.price;
        } else if (sortValue === 'price-desc') {
            return b.price - a.price;
        }
        return 0;
    });
    currentPage = 1;
    renderPlaces(currentPage);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderPlaces(currentPage);
});