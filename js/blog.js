// js/blog.js

document.addEventListener('DOMContentLoaded', function() {
    // Blog filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const blogModal = document.getElementById('blog-modal');
    const closeBlogModal = document.querySelector('.close-blog-modal');
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    // Blog post data with full content
    const blogPostData = {
        'post-1': {
            title: 'Summer Garden Trends 2025',
            date: 'June 15, 2025',
            category: 'Trends',
            image: './assets/images/demo_img1.jpg',
            content: `
                <p>As we move into 2025, sustainable garden design continues to evolve with exciting new trends that blend aesthetics, functionality, and environmental responsibility. This year, we're seeing a strong emphasis on native plant gardens, smart irrigation systems, and multi-functional outdoor spaces.</p>
                
                <h3>Native Plant Gardens</h3>
                <p>One of the most significant trends is the shift toward native plant gardens. These gardens not only require less water and maintenance but also support local ecosystems and wildlife. Native plants are naturally adapted to local climate conditions, making them more resilient and sustainable.</p>
                
                <h3>Smart Irrigation Systems</h3>
                <p>Technology is revolutionizing how we water our gardens. Smart irrigation systems use sensors and weather data to optimize watering schedules, reducing water waste by up to 50%. These systems can be controlled via smartphone apps, making garden maintenance more convenient than ever.</p>
                
                <h3>Multi-Functional Outdoor Spaces</h3>
                <p>Modern gardens are being designed to serve multiple purposes. From outdoor kitchens and dining areas to play spaces and relaxation zones, today's gardens are true extensions of the home. This trend reflects our desire to maximize the use of outdoor spaces throughout the year.</p>
                
                <h3>Vertical Gardens and Green Walls</h3>
                <p>For urban gardeners with limited space, vertical gardens and green walls offer innovative solutions. These installations not only maximize planting area but also improve air quality and provide natural insulation for buildings.</p>
                
                <p>These trends represent a shift toward more sustainable, functional, and beautiful outdoor spaces that enhance both our quality of life and the environment.</p>
            `
        },
        'post-2': {
            title: 'Native Plants for Urban Gardens',
            date: 'May 22, 2025',
            category: 'Design Tips',
            image: './assets/images/demo_img2.jpg',
            content: `
                <p>Urban gardening presents unique challenges, but incorporating native species can transform small city spaces into thriving, low-maintenance gardens that support local biodiversity.</p>
                
                <h3>Why Choose Native Plants?</h3>
                <p>Native plants are naturally adapted to your local climate, soil conditions, and rainfall patterns. This means they require less water, fertilizer, and maintenance than non-native species. They also provide essential habitat and food sources for local birds, butterflies, and beneficial insects.</p>
                
                <h3>Best Native Plants for Small Spaces</h3>
                <p>When selecting native plants for urban gardens, consider compact varieties that work well in containers or small beds:</p>
                <ul>
                    <li><strong>Compact shrubs:</strong> Look for dwarf varieties of native shrubs that stay small but provide structure</li>
                    <li><strong>Perennial flowers:</strong> Choose native perennials that bloom throughout the season</li>
                    <li><strong>Ground covers:</strong> Native ground covers can replace traditional lawns in small spaces</li>
                    <li><strong>Climbing plants:</strong> Use native vines to add vertical interest without taking up ground space</li>
                </ul>
                
                <h3>Design Tips</h3>
                <p>When designing with native plants, consider layering different heights and textures. Mix taller plants in the back with lower-growing species in front. Use native grasses for movement and texture, and include plants with varying bloom times to ensure year-round interest.</p>
                
                <h3>Maintenance Benefits</h3>
                <p>Once established, native plant gardens require significantly less maintenance than traditional gardens. They're naturally resistant to local pests and diseases, reducing the need for chemical treatments. Regular watering is only needed during the first growing season while plants establish their root systems.</p>
                
                <p>By incorporating native species into your urban garden, you're creating a beautiful, sustainable space that benefits both you and the local ecosystem.</p>
            `
        },
        'post-3': {
            title: 'Seasonal Garden Maintenance Guide',
            date: 'April 10, 2025',
            category: 'Maintenance',
            image: './assets/images/demo_img3.jpg',
            content: `
                <p>Maintaining a healthy garden requires attention throughout the year. This comprehensive guide covers essential maintenance practices for each season to keep your garden thriving.</p>
                
                <h3>Spring: Preparation and Planting</h3>
                <p>Spring is the time for renewal and preparation. Start by cleaning up winter debris, pruning dead branches, and preparing soil for new plantings. Test your soil pH and amend as needed. Early spring is ideal for planting trees, shrubs, and perennials.</p>
                <ul>
                    <li>Remove winter mulch and debris</li>
                    <li>Prune summer-flowering shrubs</li>
                    <li>Divide and transplant perennials</li>
                    <li>Start seeds indoors for warm-season vegetables</li>
                    <li>Apply slow-release fertilizer</li>
                </ul>
                
                <h3>Summer: Active Growth and Care</h3>
                <p>Summer requires consistent watering and monitoring. Mulch around plants to retain moisture and suppress weeds. Deadhead flowers regularly to encourage continued blooming. Watch for pests and diseases, addressing issues early.</p>
                <ul>
                    <li>Water deeply and consistently, preferably in the morning</li>
                    <li>Mulch to retain soil moisture</li>
                    <li>Deadhead spent flowers</li>
                    <li>Monitor for pests and diseases</li>
                    <li>Harvest vegetables regularly</li>
                </ul>
                
                <h3>Fall: Preparation for Winter</h3>
                <p>Fall is the time to prepare your garden for winter while also planting for next year. Clean up spent annuals, but leave some seed heads for birds. Plant spring-blooming bulbs and apply winter mulch after the ground freezes.</p>
                <ul>
                    <li>Plant spring-blooming bulbs</li>
                    <li>Clean up diseased plant material</li>
                    <li>Leave seed heads for wildlife</li>
                    <li>Apply winter mulch after ground freezes</li>
                    <li>Protect tender plants from frost</li>
                </ul>
                
                <h3>Winter: Planning and Protection</h3>
                <p>Winter is a time for planning and protecting. Prune dormant trees and shrubs, but avoid heavy pruning. Plan next year's garden and order seeds. Protect plants from harsh weather and check on stored bulbs and tubers.</p>
                <ul>
                    <li>Prune dormant trees and shrubs</li>
                    <li>Plan next year's garden layout</li>
                    <li>Order seeds and plants</li>
                    <li>Protect plants from winter damage</li>
                    <li>Maintain tools and equipment</li>
                </ul>
                
                <p>Following this seasonal maintenance schedule will help ensure your garden remains healthy and beautiful throughout the year.</p>
            `
        },
        'post-4': {
            title: 'Creating Outdoor Living Spaces',
            date: 'March 28, 2025',
            category: 'Design Tips',
            image: './assets/images/demo_img4.jpg',
            content: `
                <p>Transform your backyard into a functional extension of your home with thoughtful design that maximizes both beauty and usability.</p>
                
                <h3>Define Your Zones</h3>
                <p>Start by identifying how you want to use your outdoor space. Common zones include dining areas, lounging spaces, cooking areas, and play spaces. Use different materials, levels, or plantings to define each zone while maintaining visual flow.</p>
                
                <h3>Choose the Right Materials</h3>
                <p>Select materials that complement your home's architecture and can withstand your local climate. Consider durability, maintenance requirements, and how materials feel underfoot. Natural stone, composite decking, and weather-resistant furniture are excellent choices for outdoor living spaces.</p>
                
                <h3>Provide Comfort and Shelter</h3>
                <p>Extend the usability of your outdoor space by providing protection from sun, wind, and rain. Pergolas, awnings, or covered patios create comfortable spaces that can be used in various weather conditions. Strategic placement of trees or shrubs can also provide natural shade and privacy.</p>
                
                <h3>Lighting for Ambiance</h3>
                <p>Proper lighting extends the use of outdoor spaces into the evening. Combine task lighting for cooking and dining areas with ambient lighting for atmosphere. String lights, lanterns, and path lighting create a warm, inviting environment.</p>
                
                <h3>Integrate Nature</h3>
                <p>Don't forget to incorporate plants and natural elements. Container gardens, raised beds, or integrated planting areas add life and color to outdoor living spaces. Choose plants that provide seasonal interest and complement your design aesthetic.</p>
                
                <p>With careful planning and design, your outdoor living space can become your favorite room in the house, used throughout the seasons.</p>
            `
        },
        'post-5': {
            title: 'Urban Oasis Project Case Study',
            date: 'February 15, 2025',
            category: 'Projects',
            image: './assets/images/portfolio_img1.jpg',
            content: `
                <p>This case study explores how we transformed a compact 800-square-foot downtown space into a lush, multi-level garden that serves as both a private retreat and an extension of the home.</p>
                
                <h3>The Challenge</h3>
                <p>The space presented several challenges: limited square footage, minimal natural light due to surrounding buildings, and the need to create privacy in an urban setting. The client wanted a garden that felt spacious despite its small size.</p>
                
                <h3>Design Solution</h3>
                <p>We addressed these challenges through vertical design and strategic plant selection. Multi-level platforms created distinct zones while maximizing usable space. Vertical green walls provided additional planting area and enhanced privacy.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Custom water feature:</strong> A recirculating fountain creates soothing sounds and masks urban noise</li>
                    <li><strong>Built-in seating:</strong> Integrated benches with hidden storage maximize functionality</li>
                    <li><strong>Vertical gardens:</strong> Green walls provide privacy and maximize planting space</li>
                    <li><strong>Drought-tolerant plants:</strong> Selected species thrive in the urban microclimate</li>
                    <li><strong>Integrated lighting:</strong> LED lighting extends usability into evening hours</li>
                    <li><strong>Smart irrigation:</strong> Automated system ensures optimal watering with minimal maintenance</li>
                </ul>
                
                <h3>Results</h3>
                <p>The completed garden exceeded the client's expectations. The space now feels much larger than its actual size, provides complete privacy, and requires minimal maintenance. The client reports using the space daily, year-round, for relaxation and entertaining.</p>
                
                <p>This project demonstrates that thoughtful design can transform even the smallest urban spaces into beautiful, functional gardens.</p>
            `
        },
        'post-6': {
            title: 'Sustainable Landscape Design Principles',
            date: 'January 20, 2025',
            category: 'Trends',
            image: './assets/images/portfolio_img2.jpg',
            content: `
                <p>Sustainable landscape design creates beautiful spaces that benefit both people and the environment. These principles guide our approach to creating eco-friendly gardens.</p>
                
                <h3>Water Conservation</h3>
                <p>Water-wise design reduces consumption through plant selection, efficient irrigation, and water-harvesting techniques. Choose drought-tolerant plants, group plants with similar water needs, and use mulch to retain soil moisture.</p>
                
                <h3>Supporting Local Ecosystems</h3>
                <p>Native plants support local wildlife and require fewer resources. They provide food and habitat for birds, butterflies, and beneficial insects, creating a balanced ecosystem that reduces the need for chemical interventions.</p>
                
                <h3>Soil Health</h3>
                <p>Healthy soil is the foundation of sustainable gardens. Improve soil with organic matter, avoid chemical fertilizers that harm beneficial organisms, and use compost to build soil fertility naturally.</p>
                
                <h3>Reducing Waste</h3>
                <p>Design with materials that last and can be recycled. Choose durable hardscaping materials, compost garden waste, and select plants that don't require frequent replacement.</p>
                
                <h3>Energy Efficiency</h3>
                <p>Strategic tree and shrub placement can reduce heating and cooling costs. Deciduous trees provide summer shade while allowing winter sun, and evergreen windbreaks protect from cold winter winds.</p>
                
                <p>By following these principles, we create landscapes that are not only beautiful but also contribute positively to the environment.</p>
            `
        },
        'post-7': {
            title: 'Water-Wise Gardening Tips',
            date: 'December 5, 2024',
            category: 'Maintenance',
            image: './assets/images/portfolio_img3.jpeg',
            content: `
                <p>Creating a beautiful garden that conserves water is both environmentally responsible and cost-effective. These tips will help you maintain a stunning landscape while minimizing water use.</p>
                
                <h3>Choose Drought-Tolerant Plants</h3>
                <p>Select plants that are naturally adapted to your climate. Native plants and Mediterranean species typically require less water once established. Look for plants with small, thick leaves or gray foliage, which are often more drought-resistant.</p>
                
                <h3>Improve Soil Quality</h3>
                <p>Well-amended soil retains moisture better. Add organic matter like compost to improve water retention. Mulch around plants to reduce evaporation and keep roots cool.</p>
                
                <h3>Efficient Irrigation</h3>
                <p>Use drip irrigation or soaker hoses to deliver water directly to plant roots, minimizing waste. Water deeply but less frequently to encourage deep root growth. Water in the early morning to reduce evaporation.</p>
                
                <h3>Group Plants by Water Needs</h3>
                <p>Create hydrozones by grouping plants with similar water requirements together. This allows you to water efficiently without overwatering some plants while underwatering others.</p>
                
                <h3>Smart Watering Practices</h3>
                <ul>
                    <li>Water only when needed - check soil moisture before watering</li>
                    <li>Use rain barrels to collect and reuse rainwater</li>
                    <li>Install a rain sensor on irrigation systems</li>
                    <li>Adjust watering schedules seasonally</li>
                    <li>Consider replacing high-water-use lawns with alternatives</li>
                </ul>
                
                <p>With these strategies, you can maintain a beautiful garden while significantly reducing water consumption.</p>
            `
        },
        'post-8': {
            title: 'Lighting Your Outdoor Space',
            date: 'November 18, 2024',
            category: 'Design Tips',
            image: './assets/images/demo_img1.jpg',
            content: `
                <p>The right lighting transforms outdoor spaces, extending their usability into the evening while creating ambiance and enhancing safety.</p>
                
                <h3>Layered Lighting Approach</h3>
                <p>Effective outdoor lighting uses multiple layers: ambient lighting for overall illumination, task lighting for specific activities, and accent lighting to highlight features. This creates depth and visual interest.</p>
                
                <h3>Ambient Lighting</h3>
                <p>Ambient lighting provides general illumination. Use overhead fixtures, wall-mounted lights, or string lights to create a warm, inviting atmosphere. Soft, diffused light is more comfortable than harsh, direct lighting.</p>
                
                <h3>Task Lighting</h3>
                <p>Task lighting illuminates specific areas for activities like cooking, dining, or reading. Install focused lights over grills, dining tables, or seating areas where you need clear visibility.</p>
                
                <h3>Accent Lighting</h3>
                <p>Accent lighting highlights architectural features, plants, or water features. Use spotlights, uplights, or path lights to draw attention to specific elements and create visual interest.</p>
                
                <h3>Safety Considerations</h3>
                <p>Ensure pathways, steps, and changes in elevation are well-lit to prevent accidents. Low-voltage path lighting is both functional and decorative, guiding movement through the space safely.</p>
                
                <h3>Energy Efficiency</h3>
                <p>LED lighting offers excellent energy efficiency and long lifespan. Solar-powered lights are ideal for areas without electrical access. Use timers or motion sensors to ensure lights are only on when needed.</p>
                
                <p>Thoughtful lighting design enhances both the beauty and functionality of your outdoor space, making it usable and enjoyable well into the evening.</p>
            `
        },
        'post-9': {
            title: 'Family Backyard Transformation',
            date: 'October 12, 2024',
            category: 'Projects',
            image: './assets/images/demo_img2.jpg',
            content: `
                <p>This project transformed a standard suburban backyard into a multi-functional space that accommodates both children's play areas and adult relaxation zones.</p>
                
                <h3>Client Needs</h3>
                <p>The family needed a backyard that worked for everyone: safe play areas for young children, space for entertaining, and quiet zones for adults. The design needed to be low-maintenance and durable enough to withstand active use.</p>
                
                <h3>Design Approach</h3>
                <p>We created distinct zones separated by plantings and level changes. The design uses natural materials and soft landscaping to create boundaries while maintaining visual flow. Each zone serves a specific purpose while contributing to the overall design.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Multi-level deck:</strong> Elevated dining area provides separation from play zone</li>
                    <li><strong>Children's play zone:</strong> Soft-surface play area with natural materials</li>
                    <li><strong>Fire pit area:</strong> Cozy seating area for evening gatherings</li>
                    <li><strong>Lawn space:</strong> Open area for games and activities</li>
                    <li><strong>Vegetable garden:</strong> Raised beds for family gardening</li>
                    <li><strong>Storage solution:</strong> Attractive shed disguised as garden cottage</li>
                </ul>
                
                <h3>Plant Selection</h3>
                <p>We selected durable, low-maintenance plants that can withstand active play. Soft, non-toxic ground covers replace traditional grass in play areas. Strategic tree placement provides shade for both play and relaxation zones.</p>
                
                <h3>Results</h3>
                <p>The completed backyard has become the family's favorite space. Children have safe areas to play while adults can relax nearby. The design successfully balances functionality with aesthetics, creating a space the whole family enjoys year-round.</p>
                
                <p>This project demonstrates how thoughtful design can create spaces that serve multiple generations simultaneously.</p>
            `
        }
    };
    
    // Filter blog posts
    if (filterButtons.length > 0 && blogPosts.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                blogPosts.forEach(post => {
                    const category = post.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        post.style.display = 'flex';
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        post.style.opacity = '0';
                        post.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            post.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Blog modal functionality
    if (readMoreLinks.length > 0) {
        readMoreLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = this.getAttribute('data-post-id');
                const postData = blogPostData[postId];
                
                if (postData && blogModal) {
                    // Populate modal with blog post data
                    document.getElementById('modal-blog-image').src = postData.image;
                    document.getElementById('modal-blog-image').alt = postData.title;
                    document.getElementById('modal-blog-date').textContent = postData.date;
                    document.getElementById('modal-blog-category').textContent = postData.category;
                    document.getElementById('modal-blog-title').textContent = postData.title;
                    document.getElementById('modal-blog-content').innerHTML = postData.content;
                    
                    // Show modal
                    blogModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    // Close blog modal
    if (closeBlogModal) {
        closeBlogModal.addEventListener('click', function() {
            blogModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside content
    if (blogModal) {
        blogModal.addEventListener('click', function(e) {
            if (e.target === blogModal) {
                blogModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && blogModal && blogModal.classList.contains('active')) {
            blogModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Load more functionality (for future implementation)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more posts via AJAX
            // For now, we'll just show an alert
            alert('Load more functionality will be implemented with backend integration.');
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // This would typically send to a backend
            alert('Thank you for subscribing! You will receive updates at ' + email);
            this.querySelector('input[type="email"]').value = '';
        });
    }
});
