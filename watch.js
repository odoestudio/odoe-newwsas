document.addEventListener('DOMContentLoaded', () => {
    // Mock Data Store (should be shared in a real app, but duplicated for this example)
    const MOCK_DATA = {
        videos: [
            { id: 'vid001', title: 'Exploring the Alps: A Drone Story', creator: 'DroneScapes', views: '1.2M', age: '2 days ago', duration: '15:32', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=dronescapes', subs: '150k', likes: '32k', dislikes: '1.1k', description: 'Soaring through the majestic Alps. This is some of the most beautiful footage I\'ve ever captured. Shot on DJI Mavic 3 Pro.' },
            { id: 'vid002', title: 'Ultimate Productivity Hacks for Devs', creator: 'CodeWizard', views: '890k', age: '1 week ago', duration: '22:10', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=codewizard', subs: '450k', likes: '45k', dislikes: '800', description: 'Boost your coding speed with these 10 essential productivity hacks.' },
            { id: 'vid003', title: 'My Minimalist Desk Setup 2024', creator: 'ZenTech', views: '450k', age: '3 days ago', duration: '8:45', thumbnail: 'https://images.unsplash.com/photo-1593064622355-28243ab63db8?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=zentech', subs: '210k', likes: '18k', dislikes: '250', description: 'A look at my clean and minimal desk setup for maximum focus and creativity.' },
            { id: 'vid004', title: 'How to Cook Perfect Pasta', creator: 'ChefMaster', views: '2.1M', age: '1 month ago', duration: '12:19', thumbnail: 'https://images.unsplash.com/photo-1621996346565-e326e20f5413?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=chefmaster', subs: '1.2M', likes: '95k', dislikes: '2.3k', description: 'Never have mushy pasta again! My secret family recipe.' },
            { id: 'vid005', title: 'Cyberpunk City Night Drive [4K]', creator: 'VisualVibes', views: '3.5M', age: '2 weeks ago', duration: '1:20:00', thumbnail: 'https://images.unsplash.com/photo-1573335552379-444203383b31?q=80&w=1974&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=visualvibes', subs: '800k', likes: '150k', dislikes: '1.2k', description: 'Immerse yourself in the neon-drenched streets of a futuristic city.' },
            { id: 'vid006', title: 'Lo-fi Beats to Relax/Study to', creator: 'ChillHop', views: '15M', age: '1 year ago', duration: '2:30:15', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=chillhop', subs: '5M', likes: '500k', dislikes: '5k', description: '24/7 stream of chill lo-fi hip hop beats.' },
            { id: 'vid007', title: 'Beginner\'s Guide to Blender 3D', creator: '3D Guru', views: '675k', age: '3 weeks ago', duration: '45:50', thumbnail: 'https://images.unsplash.com/photo-1611652022417-a546755e495a?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=3dguru', subs: '320k', likes: '25k', dislikes: '400', description: 'Start your 3D journey today with this comprehensive guide to Blender.' },
            { id: 'vid008', title: 'The Future of AI', creator: 'TechExplained', views: '998k', age: '5 days ago', duration: '18:05', thumbnail: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=techexplained', subs: '650k', likes: '60k', dislikes: '900', description: 'Exploring the latest breakthroughs in AI and what they mean for humanity.' },
            { id: 'vid009', title: 'Acoustic Morning Session', creator: 'GuitarGentle', views: '312k', age: '2 days ago', duration: '25:40', thumbnail: 'https://images.unsplash.com/photo-1499415479124-43c324257607?q=80&w=2070&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=guitargentle', subs: '80k', likes: '12k', dislikes: '150', description: 'A calm, relaxing acoustic guitar session to start your day.' },
            { id: 'vid010', title: 'We Built a Cabin in the Woods', creator: 'BuildItWild', views: '4.2M', age: '2 months ago', duration: '35:12', thumbnail: 'https://images.unsplash.com/photo-1504615755583-2916b52192a3?q=80&w=1974&auto=format&fit=crop', creatorAvatar: 'https://i.pravatar.cc/150?u=builditwild', subs: '2.5M', likes: '250k', dislikes: '4k', description: 'Watch us build our dream off-grid cabin from scratch.' },
        ],
        comments: [
            { user: 'Alex', avatar: 'https://i.pravatar.cc/150?u=alex', text: 'This is absolutely breathtaking! Amazing work.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
            { user: 'Maria', avatar: 'https://i.pravatar.cc/150?u=maria', text: 'I learned so much from this video. Thank you!', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
            { user: 'TechHead', avatar: 'https://i.pravatar.cc/150?u=techhead', text: 'Great content, but the audio could be a bit better.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            { user: 'GamerGirl99', avatar: 'https://i.pravatar.cc/150?u=gamergirl', text: 'LOL that part at 5:23 was hilarious!', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        ]
    };

    // --- Element Selectors ---
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoDetailsContainer = document.getElementById('video-details-container');
    const commentsList = document.getElementById('comments-list');
    const commentCount = document.getElementById('comment-count');
    const recommendedVideosSidebar = document.getElementById('recommended-videos-sidebar');

    // --- Functions ---

    const getVideoIdFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('v') || 'vid001'; // Default to vid001 if no param
    };

    const renderVideoPlayer = (video) => {
        videoPlayerContainer.innerHTML = `
            <video class="w-full h-full" controls autoplay poster="${video.thumbnail}">
                <source src="#" type="video/mp4"> <!-- Add actual video source here -->
                Your browser does not support the video tag.
            </video>
        `;
    };

    const renderVideoDetails = (video) => {
        videoDetailsContainer.innerHTML = `
            <h1 class="text-2xl md:text-3xl font-extrabold text-white mb-2">${video.title}</h1>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between text-gray-400">
                <p class="text-sm mb-2 sm:mb-0">${video.views} views &bull; ${video.age}</p>
                <div class="flex items-center space-x-4">
                    <button class="flex items-center space-x-2 hover:text-white"><i class="fas fa-thumbs-up"></i> <span>${video.likes}</span></button>
                    <button class="flex items-center space-x-2 hover:text-white"><i class="fas fa-thumbs-down"></i> <span>${video.dislikes}</span></button>
                    <button class="flex items-center space-x-2 hover:text-white"><i class="fas fa-share"></i> <span>Share</span></button>
                    <button class="flex items-center space-x-2 hover:text-white"><i class="fas fa-plus"></i> <span>Save</span></button>
                </div>
            </div>
            <hr class="border-gray-700 my-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="/profile.html?user=${video.creator}" class="flex-shrink-0">
                        <img src="${video.creatorAvatar}" alt="${video.creator}" class="w-12 h-12 rounded-full">
                    </a>
                    <div>
                        <a href="/profile.html?user=${video.creator}" class="font-bold text-white hover:text-purple-400">${video.creator}</a>
                        <p class="text-sm text-gray-400">${video.subs} subscribers</p>
                    </div>
                </div>
                <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded-lg transition-colors">Subscribe</button>
            </div>
            <div class="bg-gray-800 p-4 rounded-lg mt-4">
                <p class="text-sm text-gray-300">${video.description}</p>
            </div>
        `;
    };

    const renderComments = () => {
        commentCount.textContent = MOCK_DATA.comments.length;
        commentsList.innerHTML = MOCK_DATA.comments.map(comment => `
            <div class="flex items-start space-x-4">
                <img src="${comment.avatar}" alt="${comment.user}" class="w-10 h-10 rounded-full">
                <div>
                    <div class="flex items-center space-x-2">
                        <p class="font-semibold text-sm text-white">${comment.user}</p>
                        <p class="text-xs text-gray-400">${dayjs(comment.timestamp).fromNow()}</p>
                    </div>
                    <p class="text-sm text-gray-300 mt-1">${comment.text}</p>
                    <div class="flex items-center space-x-4 text-xs text-gray-400 mt-2">
                        <button class="hover:text-white"><i class="fas fa-thumbs-up"></i></button>
                        <button class="hover:text-white"><i class="fas fa-thumbs-down"></i></button>
                        <button class="hover:text-white font-semibold">Reply</button>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderRecommendedVideos = (currentVideoId) => {
        const recommended = MOCK_DATA.videos.filter(v => v.id !== currentVideoId).slice(0, 8);
        recommendedVideosSidebar.innerHTML = recommended.map(video => `
            <a href="/watch.html?v=${video.id}" class="flex space-x-3 group">
                <div class="w-2/5 flex-shrink-0">
                    <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-24 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
                </div>
                <div class="w-3/5">
                    <h4 class="font-bold text-sm text-white leading-tight group-hover:text-purple-400">${video.title}</h4>
                    <p class="text-xs text-gray-400 mt-1">${video.creator}</p>
                    <p class="text-xs text-gray-400">${video.views} views</p>
                </div>
            </a>
        `).join('');
    };

    // --- Initial Load ---
    const videoId = getVideoIdFromURL();
    const currentVideo = MOCK_DATA.videos.find(v => v.id === videoId);

    if (currentVideo) {
        document.title = `${currentVideo.title} - V-Stream`;
        renderVideoPlayer(currentVideo);
        renderVideoDetails(currentVideo);
        renderComments();
        renderRecommendedVideos(videoId);
    } else {
        // Handle video not found
        videoPlayerContainer.innerHTML = `<div class="text-center p-8 text-xl">Video not found.</div>`;
    }
});