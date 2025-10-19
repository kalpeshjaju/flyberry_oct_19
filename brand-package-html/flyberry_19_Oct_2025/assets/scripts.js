/**
 * Flyberry Brand Package - Interactive Scripts
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProgressBar();
    initSmoothScroll();
    initTableOfContents();
    initScrollSpy();
    initSearch();
    initAccordions();
    initReadingTime();
});

/**
 * Progress Bar - Shows reading progress
 */
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressBar.appendChild(progressFill);
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollY = window.scrollY;
        const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
        progressFill.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

/**
 * Smooth Scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header') ?
                    document.querySelector('.header').offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top +
                    window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Table of Contents - Active state management
 */
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');

    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Remove active class from all links
                tocLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');

                // Scroll to target
                const headerHeight = document.querySelector('.header') ?
                    document.querySelector('.header').offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top +
                    window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ScrollSpy - Highlight current section in TOC
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('.document-section');
    const tocLinks = document.querySelectorAll('.toc-link');

    if (sections.length === 0 || tocLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Remove active class from all TOC links
                tocLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding TOC link
                const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
}

/**
 * Search Functionality
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const sections = document.querySelectorAll('.document-section');

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                section.style.display = 'block';
                section.classList.add('fade-in');
            } else {
                section.style.display = 'none';
            }
        });

        // Show "no results" message if needed
        const visibleSections = document.querySelectorAll('.document-section:not([style*="display: none"])');
        const noResultsMsg = document.getElementById('noResults');

        if (visibleSections.length === 0 && searchTerm !== '') {
            if (!noResultsMsg) {
                const msg = document.createElement('div');
                msg.id = 'noResults';
                msg.className = 'no-results';
                msg.innerHTML = '<p>No documents found matching your search.</p>';
                document.querySelector('.main-content').appendChild(msg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
}

/**
 * Accordions for collapsible content
 */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.parentElement;
            const content = accordion.querySelector('.accordion-content');
            const isOpen = accordion.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion').forEach(acc => {
                acc.classList.remove('active');
                const accContent = acc.querySelector('.accordion-content');
                if (accContent) {
                    accContent.style.maxHeight = '0';
                }
            });

            // Open clicked accordion if it was closed
            if (!isOpen) {
                accordion.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Calculate and display reading time
 */
function initReadingTime() {
    const sections = document.querySelectorAll('.document-section');

    sections.forEach(section => {
        const text = section.textContent || '';
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

        const header = section.querySelector('.document-header');
        if (header && !header.querySelector('.reading-time')) {
            const readingTimeElement = document.createElement('span');
            readingTimeElement.className = 'reading-time';
            readingTimeElement.innerHTML = `📖 ${readingTime} min read`;
            header.appendChild(readingTimeElement);
        }
    });
}

/**
 * Utility: Copy to clipboard
 */
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show success message
    showNotification('Copied to clipboard!');
}

/**
 * Utility: Show notification
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animation
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    }

    // Arrow keys for navigation
    if (e.key === 'ArrowLeft') {
        const prevLink = document.querySelector('.nav-prev');
        if (prevLink) {
            prevLink.click();
        }
    } else if (e.key === 'ArrowRight') {
        const nextLink = document.querySelector('.nav-next');
        if (nextLink) {
            nextLink.click();
        }
    }
});

/**
 * Print-friendly version
 */
window.addEventListener('beforeprint', function() {
    // Expand all accordions before printing
    document.querySelectorAll('.accordion').forEach(acc => {
        acc.classList.add('active');
        const content = acc.querySelector('.accordion-content');
        if (content) {
            content.style.maxHeight = 'none';
        }
    });
});

window.addEventListener('afterprint', function() {
    // Collapse accordions after printing
    document.querySelectorAll('.accordion').forEach(acc => {
        acc.classList.remove('active');
        const content = acc.querySelector('.accordion-content');
        if (content) {
            content.style.maxHeight = '0';
        }
    });
});

// Add CSS for notifications dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background: var(--success);
        color: white;
        font-weight: 600;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        z-index: 9999;
    }

    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }

    .notification-error {
        background: var(--danger);
    }

    .notification-warning {
        background: var(--warning);
    }

    .no-results {
        text-align: center;
        padding: 60px 20px;
        color: var(--text-secondary);
        font-size: 1.1rem;
    }

    .reading-time {
        margin-left: auto;
        color: var(--text-secondary);
        font-size: 0.9rem;
        font-weight: 500;
    }

    .accordion {
        margin: 20px 0;
        border: 1px solid var(--border);
        border-radius: 8px;
        overflow: hidden;
    }

    .accordion-header {
        padding: 20px;
        background: var(--bg-light);
        cursor: pointer;
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        transition: background 0.2s;
    }

    .accordion-header:hover {
        background: var(--border);
    }

    .accordion-header::after {
        content: '+';
        font-size: 1.5rem;
        color: var(--accent);
        transition: transform 0.3s;
    }

    .accordion.active .accordion-header::after {
        transform: rotate(45deg);
    }

    .accordion-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        padding: 0 20px;
    }

    .accordion.active .accordion-content {
        padding: 20px;
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
window.brandPackageUtils = {
    copyToClipboard,
    showNotification,
    initAccordions
};