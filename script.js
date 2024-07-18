document.addEventListener('DOMContentLoaded', function() {
    const jobTitles = [
        "Software Developer",
        "Web Developer",
        "Mobile App Developer",
        "Data Scientist",
        "Network Engineer",
        "UI/UX Designer",
        "DevOps Engineer",
        "Cybersecurity Analyst",
        "Machine Learning Engineer",
        "Game Developer"
    ];

    const positionElement = document.getElementById('position');
    let currentIndex = 0;
    let isAnimating = false;

    function scrambleText(element, text) {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            let scrambledText = '';
            for (let i = 0; i < text.length; i++) {
                const randomChar = String.fromCharCode(33 + Math.random() * 94); // Random ASCII character
                scrambledText += randomChar;
            }
            element.textContent = scrambledText;
            element.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
            element.style.filter = `blur(${Math.random() * 5}px)`; // Random blur
            currentIndex++;
        }, 100); // Adjust the interval as needed
        setTimeout(() => {
            clearInterval(intervalId);
            animateText(element, text);
        }, 2000); // Duration for displaying the scrambled text
    }

    function animateText(element, text) {
        let currentIndex = 0;
        element.style.filter = 'blur(0)'; // Remove blur
        const intervalId = setInterval(() => {
            if (currentIndex >= text.length) {
                clearInterval(intervalId);
                setTimeout(() => {
                    isAnimating = false;
                    element.style.color = '#ffffff'; // Ensure the final color is white
                }, 2000);
            } else {
                element.textContent = text.slice(0, currentIndex + 1);
                currentIndex++;
            }
        }, 150);
    }

    function updateJobTitle() {
        if (!isAnimating) {
            isAnimating = true;
            const jobTitle = jobTitles[currentIndex];
            scrambleText(positionElement, jobTitle);
            currentIndex = (currentIndex + 1) % jobTitles.length;
        }
    }

    // Initial update
    updateJobTitle();

    // Update job title every 6.5 seconds (2s scramble + 2s animate + 2.5s hold)
    setInterval(updateJobTitle, 6500);

    const logos = document.querySelectorAll('.logo');

    function fadeInLogos() {
        logos.forEach(logo => {
            const logoTop = logo.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (logoTop < windowHeight) {
                logo.classList.add('fade-in');
            } else {
                logo.classList.remove('fade-in');
            }
        });
    }

    function handleScroll() {
        fadeInLogos();
    }

    window.addEventListener('scroll', handleScroll);

    // Initialize Slick Carousel
    $('.gallery').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        centerMode: true,
        variableWidth: false,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev">&lt;</button>',
        nextArrow: '<button type="button" class="slick-next">&gt;</button>'
    });

    $('.gallery img').click(function() {
        var src = $(this).attr('src');
        var lightbox = '<div class="lightbox">' +
                        '<img src="' + src + '" class="lightbox-img">' +
                        '</div>';
        $('body').append(lightbox);
    });

    $('body').on('click', '.lightbox', function() {
        $('.lightbox').remove();
    });

    // Navbar scrambling animation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
        setTimeout(() => {
            scrambleText(link, link.textContent);
        }, index * 500); // Stagger the animations
    });

    // Text conversation animation
    const messages = document.querySelectorAll('.conversation .message, .conversation .reply');
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.style.display = 'block';
            message.style.animation = 'fadeInMessage 1s ease';
        }, index * 2000); // Stagger the messages
    });

    // Hamburger menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // Skill descriptions
    const skillDescriptions = {
        "Python": "Python is a high-level programming language for general-purpose programming. It's known for its readability and support for multiple programming paradigms.",
        "Cisco": "Cisco is a technology company known for its networking hardware, telecommunications equipment, and high-tech services and products.",
        "HTML": "HTML (HyperText Markup Language) is the standard markup language used for creating web pages and web applications.",
        "CSS": "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML or XML.",
        "Mac OS": "Mac OS is the operating system for Apple's Macintosh computers, known for its intuitive user interface and robust performance.",
        "Ubuntu": "Ubuntu is a Linux distribution based on Debian, known for its ease of use, regular releases, and community support.",
        "Windows 11": "Windows 11 is the latest version of Microsoft's Windows operating system, featuring a new interface and enhanced performance."
    };

    $('.skill-item').on('click', function() {
        const skill = $(this).data('skill');
        const description = skillDescriptions[skill];
        $('#skillDescription').text(description);
        $('#skillModal').modal('show');
    });
});
