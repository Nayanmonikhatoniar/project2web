// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.navbar').classList.remove('active');
        }
    });
});

// Success Stories Slider
const stories = [
    {
        name: "Buddy",
        story: "Found injured on the streets, Buddy received medical care and found a loving forever home after 3 months at our shelter.",
        image: "buddy.jpg"
    },
    {
        name: "Mittens",
        story: "Mittens was rescued from an abusive situation. After rehabilitation, she's now living happily with a caring family.",
        image: "mittens.jpg"
    },
    {
        name: "Bruno",
        story: "Bruno was hit by a car and left to die. Our team rushed him to the vet and after months of care, he made a full recovery.",
        image: "bruno.jpg"
    }
];

const storySlider = document.querySelector('.story-slider');
let currentStory = 0;

function displayStory(index) {
    const story = stories[index];
    storySlider.innerHTML = `
        <div class="story-content">
            <h3>${story.name}'s Story</h3>
            <p>"${story.story}"</p>
            <div class="story-image">
                <img src="assets/images/gallery/${story.image}" alt="${story.name}">
            </div>
            <div class="story-nav">
                <button class="prev-story"><i class="fas fa-chevron-left"></i></button>
                <span>${index + 1} / ${stories.length}</span>
                <button class="next-story"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    
    // Add event listeners to new buttons
    document.querySelector('.prev-story').addEventListener('click', prevStory);
    document.querySelector('.next-story').addEventListener('click', nextStory);
}

function nextStory() {
    currentStory = (currentStory + 1) % stories.length;
    displayStory(currentStory);
}

function prevStory() {
    currentStory = (currentStory - 1 + stories.length) % stories.length;
    displayStory(currentStory);
}

// Initialize the slider
if (storySlider) {
    displayStory(currentStory);
    
    // Auto-rotate stories every 5 seconds
    setInterval(nextStory, 5000);
}

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Form Validation for Contact Page
if (document.querySelector('.contact-form')) {
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Form is valid, you would typically send data to server here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Donation Form Handling
if (document.querySelector('.donation-form')) {
    document.querySelectorAll('.donation-amount').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.donation-amount').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            document.getElementById('amount').value = this.dataset.amount;
        });
    });
    
    document.querySelector('.donation-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = document.getElementById('amount').value;
        const name = document.getElementById('donor-name').value.trim();
        const email = document.getElementById('donor-email').value.trim();
        
        if (!amount || !name || !email) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real implementation, you would process the payment here
        alert(`Thank you for your donation of ₹${amount}! A receipt will be sent to ${email}.`);
        this.reset();
        document.querySelectorAll('.donation-amount').forEach(btn => {
            btn.classList.remove('selected');
        });
    });
}
