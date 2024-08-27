
document.addEventListener('DOMContentLoaded', async () => {
    const servicesList = document.getElementById('services-list');

    try {
        const response = await fetch('/api/services');
        const services = await response.json();

        services.forEach(service => {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item';
            serviceItem.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <p><strong>Price:</strong> $${service.price}</p>
            `;
            servicesList.appendChild(serviceItem);
        });
    } catch (error) {
        console.error('Error fetching services:', error);
    }
});app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch services' });
    }
});