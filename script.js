const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll("header nav a")

// Mobile menu functionality
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x")
  navbar.classList.toggle("active")
}

// Scroll functionality
window.onscroll = () => {
  sections.forEach((sec) => {
    const top = window.scrollY
    const offset = sec.offsetTop - 100
    const height = sec.offsetHeight
    const id = sec.getAttribute("id")

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active")
        const activeLink = document.querySelector("header nav a[href*=" + id + "]")
        if (activeLink) {
          activeLink.classList.add("active")
        }
      })
      sec.classList.add("show-animate")
    } else {
      sec.classList.remove("show-animate")
    }
  })

  const header = document.querySelector("header")
  header.classList.toggle("sticky", window.scrollY > 100)

  menuIcon.classList.remove("bx-x")
  navbar.classList.remove("active")
}

// Enhanced Skills Section JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality for skills
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.classList.add("active")
        // Animate progress bars when tab becomes active
        animateProgressBars(targetTab)
      }
    })
  })

  // Function to animate progress bars
  function animateProgressBars(tabId) {
    const activeTab = document.getElementById(tabId)
    if (!activeTab) return

    const progressFills = activeTab.querySelectorAll(".progress-fill")

    progressFills.forEach((fill, index) => {
      const width = fill.getAttribute("data-width")
      // Reset width first
      fill.style.width = "0%"
      setTimeout(
        () => {
          fill.style.width = width + "%"
        },
        index * 100 + 200,
      )
    })
  }

  // Initialize progress bars for the first tab
  setTimeout(() => {
    animateProgressBars("programming")
  }, 500)

  // Intersection Observer for skill cards animation
  const skillCards = document.querySelectorAll(".skill-card")
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  )

  skillCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    skillObserver.observe(card)
  })

  // Certificate cards animation
  const certificateCards = document.querySelectorAll(".certificate-card")
  const certificateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 150)
        }
      })
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  )

  certificateCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    certificateObserver.observe(card)
  })

  // Counter animation for achievement summary
  const statNumbers = document.querySelectorAll(".stat-number")
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
          const target = Number.parseInt(entry.target.textContent)
          animateCounter(entry.target, target)
          entry.target.classList.add("animated")
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })

  function animateCounter(element, target) {
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 30)
  }

  // Mobile touch handling for better UX
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device")

    // Improve touch interactions for skill cards
    skillCards.forEach((card) => {
      card.addEventListener("touchstart", () => {
        card.style.transform = "scale(0.98)"
      })

      card.addEventListener("touchend", () => {
        setTimeout(() => {
          card.style.transform = ""
        }, 150)
      })
    })

    // Improve touch interactions for certificate cards
    certificateCards.forEach((card) => {
      card.addEventListener("touchstart", () => {
        card.style.transform = "scale(0.98)"
      })

      card.addEventListener("touchend", () => {
        setTimeout(() => {
          card.style.transform = ""
        }, 150)
      })
    })
  }

  // Handle orientation changes
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      const activeTab = document.querySelector(".tab-content.active")
      if (activeTab) {
        const progressFills = activeTab.querySelectorAll(".progress-fill")
        progressFills.forEach((fill) => {
          const width = fill.getAttribute("data-width")
          fill.style.width = width + "%"
        })
      }
    }, 100)
  })

  // Contact form handling
  const contactForm = document.querySelector("form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show success message
      const message = document.createElement("div")
      message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-size: 1.4rem;
      `
      message.innerHTML = '<i class="bx bx-check"></i> Message sent successfully!'

      document.body.appendChild(message)

      setTimeout(() => {
        message.remove()
      }, 3000)

      // Reset form
      contactForm.reset()
    })
  }
})

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .bx-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Touch device optimizations */
  .touch-device .skill-card:hover {
    transform: none;
    box-shadow: none;
  }
  
  .touch-device .certificate-card:hover {
    transform: none;
    box-shadow: none;
  }
  
  .touch-device .skill-card:active {
    transform: scale(0.98);
  }
  
  .touch-device .certificate-card:active {
    transform: scale(0.98);
  }
`
document.head.appendChild(style)
