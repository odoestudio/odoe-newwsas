document.addEventListener('DOMContentLoaded', () => {
    // Mock Data Store
    const MOCK_DATA = {
        videos: [
            { id: 'vid001', title: 'Exploring the Alps: A Drone Story', creator: 'DroneScapes', views: '1.2M', age: '2 days ago', duration: '15:32', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=dronescapes', live: true, viewers: '12.5k' },
            { id: 'vid002', title: 'Ultimate Productivity Hacks for Devs', creator: 'CodeWizard', views: '890k', age: '1 week ago', duration: '22:10', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=codewizard', live: true, viewers: '8.2k' },
            { id: 'vid003', title: 'My Minimalist Desk Setup 2024', creator: 'ZenTech', views: '450k', age: '3 days ago', duration: '8:45', thumbnail: 'https://images.unsplash.com/photo-1593064622355-28243ab63db8?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=zentech', live: false },
            { id: 'vid004', title: 'How to Cook Perfect Pasta', creator: 'ChefMaster', views: '2.1M', age: '1 month ago', duration: '12:19', thumbnail: 'https://images.unsplash.com/photo-1621996346565-e326e20f5413?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=chefmaster', live: true, viewers: '4.1k' },
            { id: 'vid005', title: 'Cyberpunk City Night Drive [4K]', creator: 'VisualVibes', views: '3.5M', age: '2 weeks ago', duration: '1:20:00', thumbnail: 'https://images.unsplash.com/photo-1573335552379-444203383b31?q=80&w=1974&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=visualvibes', live: false },
            { id: 'vid006', title: 'Lo-fi Beats to Relax/Study to', creator: 'ChillHop', views: '15M', age: '1 year ago', duration: '2:30:15', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=chillhop', live: true, viewers: '25.7k' },
            { id: 'vid007', title: 'Beginner\'s Guide to Blender 3D', creator: '3D Guru', views: '675k', age: '3 weeks ago', duration: '45:50', thumbnail: 'https://images.unsplash.com/photo-1611652022417-a546755e495a?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=3dguru', live: false },
            { id: 'vid008', title: 'The Future of AI', creator: 'TechExplained', views: '998k', age: '5 days ago', duration: '18:05', thumbnail: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=techexplained', live: false },
            { id: 'vid009', title: 'Acoustic Morning Session', creator: 'GuitarGentle', views: '312k', age: '2 days ago', duration: '25:40', thumbnail: 'https://images.unsplash.com/photo-1499415479124-43c324257607?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=guitargentle', live: true, viewers: '2.1k' },
            { id: 'vid010', title: 'We Built a Cabin in the Woods', creator: 'BuildItWild', views: '4.2M', age: '2 months ago', duration: '35:12', thumbnail: 'https://images.unsplash.com/photo-1504615755583-2916b52192a3?q=80&w=1974&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=builditwild', live: false },
        ],
        categories: [
            { name: 'Gaming', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Music', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Tech', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Art', image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1935&auto=format&fit=crop' },
            { name: 'Travel', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Food', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop' },
        ]
    };

    // --- Element Selectors ---
    const liveChannelsGrid = document.getElementById('live-channels-grid');
    const recommendedVideosGrid = document.getElementById('recommended-videos-grid');
    const categoriesGrid = document.getElementById('categories-grid');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Functions ---

    const createVideoCard = (video) => {
        const liveBadge = video.live ? 
            `<div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center space-x-1">
                <i class="fas fa-circle text-xs animate-pulse"></i>
                <span>LIVE</span>
            </div>` : '';
        
        const viewerCount = video.live ?
            `<div class="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-md">${video.viewers} viewers</div>` : '';

        return `
            <a href="/watch.html?v=${video.id}" class="group video-card block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
                <div class="relative">
                    <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-40 object-cover video-card-thumbnail">
                    ${liveBadge}
                    ${viewerCount}
                    <div class="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-semibold px-1.5 py-0.5 rounded">${video.duration}</div>
                </div>
                <div class="p-4">
                    <div class="flex items-start space-x-3">
                        <img src="${video.creatorAvatar}" alt="${video.creator}" class="w-9 h-9 rounded-full flex-shrink-0">
                        <div class="flex-1">
                            <h3 class="font-bold text-sm text-white leading-tight truncate group-hover:text-purple-400">${video.title}</h3>
                            <p class="text-xs text-gray-400 mt-1">${video.creator}</p>
                            <p class="text-xs text-gray-400">${video.views} views &bull; ${video.age}</p>
                        </div>
                    </div>
                </div>
            </a>
        `;
    };

    const createCategoryCard = (category) => {
        return `
            <a href="#" class="group relative block rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
                <img src="${category.image}" alt="${category.name}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105">
                <div class="absolute inset-0 bg-black/60"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <h3 class="font-bold text-lg text-white">${category.name}</h3>
                </div>
            </a>
        `;
    };

    const populateGrids = () => {
        if (liveChannelsGrid) {
            liveChannelsGrid.innerHTML = MOCK_DATA.videos.filter(v => v.live).map(createVideoCard).join('');
        }
        if (recommendedVideosGrid) {
            recommendedVideosGrid.innerHTML = MOCK_DATA.videos.filter(v => !v.live).map(createVideoCard).join('');
        }
        if (categoriesGrid) {
            categoriesGrid.innerHTML = MOCK_DATA.categories.map(createCategoryCard).join('');
        }
    };

    // --- Event Listeners ---
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Initial Load ---
    populateGrids();
});