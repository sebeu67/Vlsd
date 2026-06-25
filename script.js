// Data for attractions
let places = [
    {
        id: 1,
        name: "Соборная площадь",
        category: "Архитектурный ансамбль",
        price: 0,
        address: "ул. Соборная, Владимир",
        description: "Историческое сердце Владимира с белокаменными соборами — объект ЮНЕСКО.",
        image: "images/5.jpg",
        detailLink: "sobornaya-ploshad.html"
    },
    {
        id: 2,
        name: "Исторический музей",
        category: "Культурные",
        price: 150,
        address: "ул. Большая Московская, 1, Владимир",
        description: "Один из старейших музеев города с богатой коллекцией экспонатов.",
        image: "images/Muzei01.jpg",
        detailLink: "place-detail.html"
    },
    {
        id: 3,
        name: "Успенский собор",
        category: "Храм, памятник ЮНЕСКО",
        price: 150,
        address: "Соборная площадь, Владимир",
        description: "Главный храм Владимиро-Суздальского княжества, шедевр древнерусской архитектуры.",
        image: "images/успен 2.jpg",
        detailLink: "uspensky-sobor.html"
    },
    {
        id: 4,
        name: "Музей ложки",
        category: "Культурные",
        price: 200,
        address: "ул. Октябрьская, 4, Владимир",
        description: "Уникальный музей с коллекцией более 15 000 ложек из разных стран и эпох...",
        image: "images/ложка 1.jpg",
        detailLink: "muzei-lozhki.html"
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
    if (!container) return;

    container.innerHTML = '';

    paginatedPlaces.forEach(place => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
            <img src="${place.image}" 
                 alt="${place.name}" 
                 onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(place.name)}'">
            <h3>${place.name}</h3>
            <p><strong>Категория:</strong> ${place.category}</p>
            <p><strong>Цена:</strong> ${place.price === 0 ? 'Бесплатно' : place.price + ' руб.'}</p>
            <p>${place.description.substring(0, 110)}...</p>
            <a href="${place.detailLink}" class="btn">Подробнее →</a>
        `;
        container.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

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
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    filteredPlaces = places.filter(place =>
        place.name.toLowerCase().includes(searchTerm) ||
        place.description.toLowerCase().includes(searchTerm) ||
        place.category.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderPlaces(currentPage);
}

function sortPlaces() {
    const sortValue = document.getElementById('sort-select').value;
    filteredPlaces.sort((a, b) => {
        if (sortValue === 'name-asc') return a.name.localeCompare(b.name, 'ru');
        if (sortValue === 'name-desc') return b.name.localeCompare(a.name, 'ru');
        if (sortValue === 'price-asc') return a.price - b.price;
        if (sortValue === 'price-desc') return b.price - a.price;
        return 0;
    });
    currentPage = 1;
    renderPlaces(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    renderPlaces(currentPage);
});