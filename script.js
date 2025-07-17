const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x")
  navbar.classList.toggle("active")
}

const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll("header nav a")

window.onscroll = () => {
  sections.forEach((sec) => {
    const top = window.scrollY
    const offset = sec.offsetTop - 100
    const height = sec.offsetHeight
    const id = sec.getAttribute("id")

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active")
        document.querySelector("header nav a[href*=" + id + "]").classList.add("active")
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
      document.getElementById(targetTab).classList.add("active")

      // Animate progress bars when tab becomes active
      animateProgressBars(targetTab)
    })
  })

  // Function to animate progress bars
  function animateProgressBars(tabId) {
    const activeTab = document.getElementById(tabId)
    const progressFills = activeTab.querySelectorAll(".progress-fill")

    progressFills.forEach((fill) => {
      const width = fill.getAttribute("data-width")
      setTimeout(() => {
        fill.style.width = width + "%"
      }, 100)
    })
  }

  // Initialize progress bars for the active tab
  animateProgressBars("technical")

  // Intersection Observer for skill cards animation
  const skillCards = document.querySelectorAll(".skill-card")
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  skillCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
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
          }, index * 100)
        }
      })
    },
    { threshold: 0.1 },
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
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.textContent)
          animateCounter(entry.target, target)
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
    // Add touch class to body for CSS targeting
    document.body.classList.add("touch-device")

    // Improve touch interactions for skill cards
    const skillCards = document.querySelectorAll(".skill-card")
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
    const certificateCards = document.querySelectorAll(".certificate-card")
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

  // Optimize animations for mobile
  const isMobile = window.innerWidth <= 800
  if (isMobile) {
    // Reduce animation duration for better mobile performance
    const style = document.createElement("style")
    style.textContent = `
      .skill-card, .certificate-card {
        transition: all 0.2s ease !important;
      }
      .progress-fill {
        transition: width 1s ease-in-out !important;
      }
    `
    document.head.appendChild(style)
  }

  // Handle orientation changes
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      // Recalculate progress bars after orientation change
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
})
