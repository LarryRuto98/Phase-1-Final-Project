document.addEventListener("DOMContentLoaded", () => {
    const carCardsContainer = document.getElementById("car-cards-container");
    const navLinks = document.querySelectorAll(".nav-link");

    
    function displayCarCards(cars) {
        carCardsContainer.innerHTML = ""; 

        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            carCard.innerHTML = `
                <img src="${car.image_url}" alt="${car.brand} ${car.model}">
                <h3>${car.brand} ${car.model}</h3>
                <p>Year: ${car.year}</p>
                <p>Engine Size: ${car.engine_size}</p>
                <p>Type: ${car.type}</p>
                <p>Price: Ksh${car.price.toLocaleString()}</p>
            `;
            carCardsContainer.appendChild(carCard);
        });
    }

    function fetchCars(type) {
        fetch("http://localhost:3000/cars")
            .then(response => response.json())
            .then(data => {
                const filteredCars = data.filter(car => car.type.toUpperCase() === type.toUpperCase());
                displayCarCards(filteredCars);
            })
        }
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const type = link.getAttribute("data-type"); 
                fetchCars(type);
                e.stopPropagation();
            });
        });
    
        document.addEventListener("click", (e) => {
            if (!carCardsContainer.contains(e.target) && !e.target.classList.contains("nav-link")) {
                carCardsContainer.style.display = "none";
            }
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        const carCardsContainer = document.getElementById("car-cards-container");
        const navLinks = document.querySelectorAll(".nav-link");
        const buyCarButton = document.querySelector(".button[href='#buy']");
        const rentCarButton = document.querySelector(".button[href='#rent']");
    
        
        function displayCarCards(cars) {
            carCardsContainer.innerHTML = ""; 
    
            cars.forEach(car => {
                const carCard = document.createElement("div");
                carCard.classList.add("car-card");
    
                const actionButtonText = car.availability.toLowerCase() === "purchase" ? "Buy Now" : "Rent Now";
    
                carCard.innerHTML = `
                    <img src="${car.image_url}" alt="${car.brand} ${car.model}">
                    <h3>${car.brand} ${car.model}</h3>
                    <p>Year: ${car.year}</p>
                    <p>Engine Size: ${car.engine_size}</p>
                    <p>Type: ${car.type}</p>
                    <p>Price: Ksh${car.price.toLocaleString()}</p>
                    <button class="action-button">${actionButtonText} : Get Quotation</button>
                `;
                carCardsContainer.appendChild(carCard);
            });
    
            
            carCardsContainer.style.display = "grid";
        }
    
        
        function fetchCarsByAvailability(availability) {
            fetch("http://localhost:3000/cars")
                .then(response => response.json())
                .then(data => {
                    const filteredCars = data.filter(car => car.availability.toLowerCase() === availability.toLowerCase());
                    displayCarCards(filteredCars);
                })
                .catch(error => console.error("Error fetching cars:", error));
        }
    
        
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const type = link.getAttribute("data-type");
                fetchCarsByType(type);
                e.stopPropagation(); 
            });
        });
    

        buyCarButton.addEventListener("click", (e) => {
            e.preventDefault();
            fetchCarsByAvailability("purchase");
            e.stopPropagation();
        });
    
        rentCarButton.addEventListener("click", (e) => {
            e.preventDefault();
            fetchCarsByAvailability("rent");
            e.stopPropagation();
        });
    
        document.addEventListener("click", (e) => {
            if (!carCardsContainer.contains(e.target) && !e.target.classList.contains("nav-link") && e.target !== buyCarButton && e.target !== rentCarButton) {
                carCardsContainer.style.display = "none";
            }
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        const searchForm = document.getElementById("search-form");
        const searchInput = document.getElementById("vehicle-search");
        const searchCarsContainer = document.getElementById("search-cars-container");
    

    
        function displayCarCards(cars, container) {
            container.innerHTML = ""; 
    
            cars.forEach(car => {
                const carCard = document.createElement("div");
                carCard.classList.add("car-card");
    
                
    
                carCard.innerHTML = `
                    <img src="${car.image_url}" alt="${car.brand} ${car.model}">
                    <h3>${car.brand} ${car.model}</h3>
                    <p>Year: ${car.year}</p>
                    <p>Engine Size: ${car.engine_size}</p>
                    <p>Type: ${car.type}</p>
                    <p>Price: Ksh${car.price.toLocaleString()}</p>
            
                `;
                container.appendChild(carCard);
            });
    
            container.style.display = "grid"; 
        }
    
        
        function fetchCarsBySearch(query) {
            fetch("http://localhost:3000/cars")
                .then(response => response.json())
                .then(data => {
                    const filteredCars = data.filter(car => 
                        car.brand.toLowerCase().includes(query.toLowerCase()) ||
                        car.model.toLowerCase().includes(query.toLowerCase())
                    );
                    
                    if (filteredCars.length > 0) {
                        displayCarCards(filteredCars, searchCarsContainer);
                    } else {
                        searchCarsContainer.innerHTML = "<p>No cars found matching your search.</p>";
                        searchCarsContainer.style.display = "block";
                    }
                })
                .catch(error => console.error("Error fetching cars:", error));
        }
    
        // Event listener for the form submit
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            const query = searchInput.value.trim();
            if (query) {
                fetchCarsBySearch(query);
            }
        });
    
        
        document.addEventListener("click", (e) => {
            if (!searchCarsContainer.contains(e.target) && !searchForm.contains(e.target)) {
                searchCarsContainer.style.display = "none";
            }
        });
    });
   document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const filteredCarsContainer = document.getElementById("filtered-cars-container");

    // Function to display car cards in the container
    function displayCarCards(cars) {
        filteredCarsContainer.innerHTML = ""; 
        filteredCarsContainer.style.display = "grid";
        filteredCarsContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
        filteredCarsContainer.style.gap = "20px";
        filteredCarsContainer.style.margin = "20px auto";

        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");


            carCard.innerHTML = `
                <img src="${car.image_url}" alt="${car.brand} ${car.model}">
                <h3>${car.brand} ${car.model}</h3>
                <p>Year: ${car.year}</p>
                <p>Engine Size: ${car.engine_size} CC</p>
                <p>Type: ${car.type}</p>
                <p>Price: Ksh${car.price.toLocaleString()}</p>
            `;
            filteredCarsContainer.appendChild(carCard);
        });
    }

    
    function fetchAndFilterCars(minRange, maxRange) {
        fetch("http://localhost:3000/cars")
            .then(response => response.json())
            .then(data => {
               const filteredCars =data.filter(car =>{
                const engineSize = Number(car.engine_size);
                return engineSize >= minRange && engineSize <= maxRange;
               })

                if (filteredCars.length > 0) {
                    displayCarCards(filteredCars);
                } else {
                    filteredCarsContainer.innerHTML = "<p>No cars found for the selected engine capacity range.</p>";
                }
            })
            .catch(error => console.error("Error fetching cars:", error));
    }

    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedEngineRange = button.textContent.trim().replace(" CC", "");
            const [minRange, maxRange] = selectedEngineRange.split("-").map(Number);

            fetchAndFilterCars(minRange, maxRange);
        });
    });

    
    document.addEventListener("click", (e) => {
        if (!filteredCarsContainer.contains(e.target) && 
            !e.target.classList.contains("filter-btn")) {
            filteredCarsContainer.style.display = "none";
        }
    });
});
