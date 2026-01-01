// js/portfolio.js

document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Project data for modal content
    const projectData = {
        'downtown-sanctuary': {
            title: 'Downtown Sanctuary',
            location: 'Urban Garden • City Center',
            description: 'Transformed a compact 800 sq ft urban space into a lush, multi-level garden with integrated seating and water feature. The design maximizes vertical space with green walls and carefully selected dwarf tree varieties.',
            features: [
                'Custom water feature with recirculating system',
                'Built-in seating with hidden storage',
                'Vertical green walls for maximum planting',
                'Drought-tolerant plant selection',
                'Integrated LED lighting for evening ambiance',
                'Smart irrigation system'
            ],
            services: ['Garden Design', 'Hardscaping', 'Lighting', 'Irrigation']
        },
        'modern-courtyard': {
            title: 'Modern Courtyard',
            location: 'Urban Garden • Downtown',
            description: 'Clean lines and minimalist planting create a serene escape in the heart of the city. The design focuses on texture and form rather than color, creating a timeless aesthetic.',
            features: [
                'Geometric stone paving pattern',
                'Architectural plant selection',
                'Minimalist water feature',
                'Custom corten steel planters',
                'Integrated bench seating',
                'Low-voltage landscape lighting'
            ],
            services: ['Design', 'Hardscaping', 'Planting']
        },
        'suburban-family-haven': {
            title: 'Suburban Family Haven',
            location: 'Family Backyard • Greenville',
            description: 'Created multiple zones for entertainment, play, and relaxation in a spacious 1/4 acre suburban yard. The design balances adult entertainment areas with safe, imaginative spaces for children.',
            features: [
                'Multi-level deck with dining area',
                'Children\'s play zone with natural materials',
                'Fire pit seating area',
                'Lawn space for games and activities',
                'Vegetable garden beds',
                'Storage shed disguised as garden cottage'
            ],
            services: ['Full Renovation', 'Decking', 'Planting', 'Lighting']
        },
        'poolside-paradise': {
            title: 'Poolside Paradise',
            location: 'Family Backyard • Lakeside',
            description: 'Integrated pool area with natural stone patio and tropical planting for year-round enjoyment. The design creates a resort-like atmosphere while maintaining functionality for family use.',
            features: [
                'Natural stone pool coping and patio',
                'Tropical planting scheme',
                'Outdoor shower and changing area',
                'Pool house with kitchenette',
                'Safety fencing integrated with landscaping',
                'Heated pool with automated cover'
            ],
            services: ['Pool Landscaping', 'Hardscaping', 'Planting']
        }
        // Additional project data would be added here
    };

    // Filter portfolio items
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Modal functionality
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3').textContent;
            const projectKey = projectTitle.toLowerCase().replace(/\s+/g, '-');
            
            // Get the image from the clicked portfolio item
            const portfolioImage = this.querySelector('.portfolio-image img');
            const imageSrc = portfolioImage ? portfolioImage.src : '';
            const imageAlt = portfolioImage ? portfolioImage.alt : 'Project image';
            
            // For demo purposes, we'll use the first project data
            // In a real implementation, you would match the clicked project with its data
            const data = projectData['downtown-sanctuary'];
            
            if (data) {
                // Update modal image
                const modalImagesContainer = document.querySelector('.modal-images');
                modalImagesContainer.innerHTML = '';
                if (imageSrc) {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = imageAlt;
                    img.className = 'modal-main-image';
                    modalImagesContainer.appendChild(img);
                } else {
                    modalImagesContainer.innerHTML = '<div class="image-placeholder">Project Gallery</div>';
                }
                
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-location').textContent = data.location;
                document.getElementById('modal-description').textContent = data.description;
                
                // Populate features
                const featuresList = document.getElementById('modal-features');
                featuresList.innerHTML = '';
                data.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                // Populate services
                const servicesContainer = document.getElementById('modal-services');
                servicesContainer.innerHTML = '';
                data.services.forEach(service => {
                    const tag = document.createElement('span');
                    tag.className = 'service-tag';
                    tag.textContent = service;
                    servicesContainer.appendChild(tag);
                });
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});