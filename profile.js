document.addEventListener('DOMContentLoaded', () => {
    // Mock Data Store
    const MOCK_DATA = {
        users: {
            'DroneScapes': {
                name: 'DroneScapes',
                avatar: 'https://i.pravatar.cc/150?u=dronescapes',
                banner: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
                subs: '150k',
                joinDate: 'Joined Mar 2020',
                description: 'Capturing the world from a different perspective. Join me on my aerial adventures as we explore stunning landscapes, epic cityscapes, and everything in between. All footage is shot in glorious 4K.',
                social: { twitter: '#', instagram: '#', website: '#' }
            },
            'CodeWizard': {
                name: 'CodeWizard',
                avatar: 'https://i.pravatar.cc/150?u=codewizard',
                banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
                subs: '450k',
                joinDate: 'Joined Jan 2019',
                description: 'Your friendly neighborhood developer, demystifying code one video at a time. Tutorials on JavaScript, Python, Web Development, and more. Let\'s build something awesome together!',
                social: { twitter: '#', github: '#', website: '#' }
            }
        },
        videos: [
            { id: 'vid001', title: 'Exploring the Alps: A Drone Story', creator: 'DroneScapes', views: '1.2M', age: '2 days ago', duration: '15:32', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop' },
            { id: 'vid002', title: 'Ultimate Productivity Hacks for Devs', creator: 'CodeWizard', views: '890k', age: '1 week ago', duration: '22:10', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop' },
            { id: 'vid005', title: 'Cyberpunk City Night Drive [4K]', creator: 'DroneScapes', views: '3.5M', age: '2 weeks ago', duration: '1:20:00', thumbnail: 'https://images.unsplash.com/photo-1573335552379-444203383b31?q=80&w=1974&auto=format&fit=crop' },
            { id: 'vid008', title: 'The Future of AI', creator: 'CodeWizard', views: '998k', age: '5 days ago', duration: '18:05', thumbnail: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop' },
        ]
    };

    // --- Element Selectors ---
    const profileHeaderContainer = document.getElementById('profile-header-container');
    const profileTabsContainer = document.getElementById('profile-tabs');
    const tabContentContainer = document.getElementById('tab-content-container');

    // --- Functions ---

    const getUsernameFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('user') || 'DroneScapes'; // Default user
    };

    const createVideoCard = (video) => {
        return `
            <a href="/watch.html?v=${video.id}" class="group video-card block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
                <div class="relative">
                    <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-40 object-cover video-card-thumbnail">
                    <div class="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-semibold px-1.5 py-0.5 rounded">${video.duration}</div>
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-sm text-white leading-tight truncate group-hover:text-purple-400">${video.title}</h3>
                    <p class="text-xs text-gray-400 mt-1">${video.views} views &bull; ${video.age}</p>
                </div>
            </a>
        `;
    };

    const renderProfileHeader = (user) => {
        profileHeaderContainer.innerHTML = `
            <div class="relative h-48 md:h-64 rounded-lg overflow-hidden">
                <img src="${user.banner}" class="w-full h-full object-cover" alt="Channel Banner">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
            <div class="-mt-16 px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
                    <div class="flex-shrink-0">
                        <img class="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-gray-900" src="${user.avatar}" alt="${user.name}">
                    </div>
                    <div class="mt-4 sm:mt-0 sm:pb-4 flex-1 flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-white truncate">${user.name}</h1>
                            <p class="text-sm font-medium text-gray-400">${user.subs} subscribers</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded-lg transition-colors">Subscribe</button>
                            <button class="bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 rounded-lg transition-colors"><i class="fas fa-bell"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const renderTabs = () => {
        const tabs = ['Home', 'Videos', 'About'];
        profileTabsContainer.innerHTML = tabs.map((tab, index) => `
            <button data-tab="${tab.toLowerCase()}" class="profile-tab ${index === 0 ? 'text-purple-400 border-purple-400' : 'text-gray-400 border-transparent'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm hover:text-purple-300 hover:border-purple-300">
                ${tab}
            </button>
        `).join('');
    };

    const renderTabContent = (tabName, user, userVideos) => {
        let content = '';
        switch (tabName) {
            case 'videos':
                content = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">${userVideos.map(createVideoCard).join('')}</div>`;
                break;
            case 'about':
                content = `
                    <div class="max-w-2xl bg-gray-800 p-6 rounded-lg">
                        <h3 class="font-bold text-lg mb-2">Description</h3>
                        <p class="text-gray-300 whitespace-pre-wrap">${user.description}</p>
                        <hr class="border-gray-700 my-6">
                        <h3 class="font-bold text-lg mb-2">Details</h3>
                        <p class="text-sm text-gray-400">${user.joinDate}</p>
                    </div>
                `;
                break;
            case 'home':
            default:
                const featuredVideo = userVideos[0];
                content = `
                    <h3 class="font-bold text-xl mb-4">Featured Video</h3>
                    ${featuredVideo ? createVideoCard(featuredVideo) : '<p>No videos yet.</p>'}
                    <h3 class="font-bold text-xl mt-8 mb-4">Recent Uploads</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">${userVideos.slice(0, 5).map(createVideoCard).join('')}</div>
                `;
                break;
        }
        tabContentContainer.innerHTML = content;
    };

    const handleTabClick = (e, user, userVideos) => {
        const clickedTab = e.target.closest('.profile-tab');
        if (!clickedTab) return;

        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.classList.remove('text-purple-400', 'border-purple-400');
            tab.classList.add('text-gray-400', 'border-transparent');
        });

        clickedTab.classList.add('text-purple-400', 'border-purple-400');
        clickedTab.classList.remove('text-gray-400', 'border-transparent');

        const tabName = clickedTab.dataset.tab;
        renderTabContent(tabName, user, userVideos);
    };

    // --- Initial Load ---
    const username = getUsernameFromURL();
    const currentUser = MOCK_DATA.users[username];
    const currentUserVideos = MOCK_DATA.videos.filter(v => v.creator === username);

    if (currentUser) {
        document.title = `${currentUser.name} - V-Stream`;
        renderProfileHeader(currentUser);
        renderTabs();
        renderTabContent('home', currentUser, currentUserVideos); // Default to home tab

        profileTabsContainer.addEventListener('click', (e) => handleTabClick(e, currentUser, currentUserVideos));
    } else {
        profileHeaderContainer.innerHTML = `<div class="text-center p-8 text-xl">User not found.</div>`;
    }
});