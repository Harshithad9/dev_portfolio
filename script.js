// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const header = document.querySelector(".header")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const contactForm = document.getElementById("contact-form")
const animateElements = document.querySelectorAll(".animate-on-scroll")
const skillBars = document.querySelectorAll(".skill-progress")
const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")
const sections = document.querySelectorAll("section")
const tabButtons = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")
const skillCards = document.querySelectorAll(".skill-card")
const certificateCards = document.querySelectorAll(".certificate-card")
const statNumbers = document.querySelectorAll(".stat-number")
const images = document.querySelectorAll("img[data-src]")

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.setTheme(this.theme)
    this.updateThemeIcon()
  }

  toggle() {
    this.theme = this.theme === "dark" ? "light" : "dark"
    this.setTheme(this.theme)
    this.updateThemeIcon()
    localStorage.setItem("theme", this.theme)
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    this.theme = theme
  }

  updateThemeIcon() {
    const icon = themeToggle.querySelector("i")
    icon.className = this.theme === "dark" ? "bx bx-sun" : "bx bx-moon"
  }
}

// Navigation Manager
class NavigationManager {
  constructor() {
    this.isMenuOpen = false
    this.init()
  }

  init() {
    this.bindEvents()
    this.updateActiveNav()
  }

  bindEvents() {
    // Mobile menu toggle
    navToggle?.addEventListener("click", () => this.toggleMobileMenu())

    // Navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e))
    })

    // Close mobile menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMobileMenu()
      }
    })

    // Close mobile menu on outside click
    document.addEventListener("click", (e) => {
      if (this.isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        this.closeMobileMenu()
      }
    })
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
    document.body.style.overflow = this.isMenuOpen ? "hidden" : ""
  }

  closeMobileMenu() {
    this.isMenuOpen = false
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
    document.body.style.overflow = ""
  }

  handleNavClick(e) {
    e.preventDefault()
    const targetId = e.target.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = header.offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Update active nav
      this.setActiveNav(e.target)

      // Close mobile menu
      if (this.isMenuOpen) {
        this.closeMobileMenu()
      }
    }
  }

  setActiveNav(activeLink) {
    navLinks.forEach((link) => link.classList.remove("active"))
    activeLink.classList.add("active")
  }

  updateActiveNav() {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (
        window.scrollY + header.offsetHeight + 50 >= sectionTop &&
        window.scrollY + header.offsetHeight + 50 < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }
}

// Scroll Manager
class ScrollManager {
  constructor() {
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => {
      this.handleScroll()
    })
  }

  handleScroll() {
    this.updateHeaderBackground()
    this.animateOnScroll()
    this.animateSkillBars()
    navManager.updateActiveNav()
  }

  updateHeaderBackground() {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        header.style.background = "rgba(15, 15, 35, 0.98)"
      }
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        header.style.background = "rgba(15, 15, 35, 0.95)"
      }
    }
  }

  animateOnScroll() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animated")
      }
    })
  }

  animateSkillBars() {
    skillBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top
      const barVisible = 150

      if (barTop < window.innerHeight - barVisible && !bar.classList.contains("animated")) {
        const width = bar.getAttribute("data-width")
        setTimeout(() => {
          bar.style.width = width
          bar.classList.add("animated")
        }, 200)
      }
    })
  }
}

// Project Filter Manager
class ProjectFilterManager {
  constructor() {
    this.init()
  }

  init() {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleFilterClick(e))
    })
  }

  handleFilterClick(e) {
    const filterValue = e.target.getAttribute("data-filter")

    // Update active filter button
    filterBtns.forEach((btn) => btn.classList.remove("active"))
    e.target.classList.add("active")

    // Filter projects
    this.filterProjects(filterValue)
  }

  filterProjects(category) {
    projectCards.forEach((card) => {
      const cardCategories = card.getAttribute("data-category")

      if (category === "all" || cardCategories.includes(category)) {
        card.classList.remove("hidden")
      } else {
        card.classList.add("hidden")
      }
    })
  }
}

// Form Manager
class FormManager {
  constructor() {
    this.init()
  }

  init() {
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    }

    const errors = this.validateForm(formData)

    if (Object.keys(errors).length === 0) {
      this.submitForm(formData)
    } else {
      this.displayErrors(errors)
    }
  }

  validateForm(data) {
    const errors = {}

    // Name validation
    if (!data.name) {
      errors.name = "Name is required"
    } else if (data.name.length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!data.email) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email address"
    }

    // Subject validation
    if (!data.subject) {
      errors.subject = "Subject is required"
    } else if (data.subject.length < 5) {
      errors.subject = "Subject must be at least 5 characters"
    }

    // Message validation
    if (!data.message) {
      errors.message = "Message is required"
    } else if (data.message.length < 10) {
      errors.message = "Message must be at least 10 characters"
    }

    return errors
  }

  displayErrors(errors) {
    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = ""
    })

    // Display new errors
    Object.keys(errors).forEach((field) => {
      const errorElement = document.getElementById(`${field}-error`)
      if (errorElement) {
        errorElement.textContent = errors[field]
      }
    })
  }

  async submitForm(data) {
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalContent = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>'
    submitBtn.disabled = true

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success feedback
      this.showSuccessMessage()
      contactForm.reset()
      this.clearErrors()
    } catch (error) {
      this.showErrorMessage()
    } finally {
      // Reset button
      submitBtn.innerHTML = originalContent
      submitBtn.disabled = false
    }
  }

  showSuccessMessage() {
    const message = document.createElement("div")
    message.className = "success-message"
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
    `
    message.innerHTML = '<i class="bx bx-check"></i> Message sent successfully!'

    document.body.appendChild(message)

    setTimeout(() => {
      message.remove()
    }, 5000)
  }

  showErrorMessage() {
    const message = document.createElement("div")
    message.className = "error-message-toast"
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
    `
    message.innerHTML = '<i class="bx bx-x"></i> Failed to send message. Please try again.'

    document.body.appendChild(message)

    setTimeout(() => {
      message.remove()
    }, 5000)
  }

  clearErrors() {
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = ""
    })
  }
}

// Utility Functions
const utils = {
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },
}

// Initialize Managers
let themeManager, navManager, scrollManager, filterManager, formManager

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize managers
  themeManager = new ThemeManager()
  navManager = new NavigationManager()
  scrollManager = new ScrollManager()
  filterManager = new ProjectFilterManager()
  formManager = new FormManager()

  // Theme toggle event
  themeToggle?.addEventListener("click", () => {
    themeManager.toggle()
  })

  // Tab functionality for skills
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
      setTimeout(
        () => {
          fill.style.width = width + "%"
        },
        index * 100 + 200,
      ) // Stagger animation
    })
  }

  // Initialize progress bars for the active tab
  setTimeout(() => {
    animateProgressBars("programming")
  }, 500)

  // Intersection Observer for skill cards animation
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

  // Enhanced mobile touch handling
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device")

    // Improve touch interactions for skill cards
    skillCards.forEach((card) => {
      card.addEventListener(
        "touchstart",
        (e) => {
          card.style.transform = "scale(0.98)"
        },
        { passive: true },
      )

      card.addEventListener(
        "touchend",
        (e) => {
          setTimeout(() => {
            card.style.transform = ""
          }, 150)
        },
        { passive: true },
      )
    })

    // Improve touch interactions for certificate cards
    certificateCards.forEach((card) => {
      card.addEventListener(
        "touchstart",
        (e) => {
          card.style.transform = "scale(0.98)"
        },
        { passive: true },
      )

      card.addEventListener(
        "touchend",
        (e) => {
          setTimeout(() => {
            card.style.transform = ""
          }, 150)
        },
        { passive: true },
      )
    })
  }

  // Optimize animations for mobile
  const isMobile = window.innerWidth <= 800
  if (isMobile) {
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

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
  })

  // Enhanced form validation
  const inputs = contactForm.querySelectorAll("input, textarea")

  inputs.forEach((input) => {
    input.addEventListener("blur", validateField)
    input.addEventListener("input", clearErrors)
  })

  contactForm.addEventListener("submit", handleFormSubmit)

  function validateField(e) {
    const field = e.target
    const value = field.value.trim()

    // Remove existing error styling
    field.classList.remove("error")

    // Basic validation
    if (field.hasAttribute("required") && !value) {
      showFieldError(field, "This field is required")
      return false
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        showFieldError(field, "Please enter a valid email address")
        return false
      }
    }

    if (field.type === "tel" && value) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(value.replace(/\s/g, ""))) {
        showFieldError(field, "Please enter a valid phone number")
        return false
      }
    }

    return true
  }

  function showFieldError(field, message) {
    field.classList.add("error")

    // Create or update error message
    let errorElement = field.parentNode.querySelector(".error-message")
    if (!errorElement) {
      errorElement = document.createElement("span")
      errorElement.className = "error-message"
      field.parentNode.appendChild(errorElement)
    }
    errorElement.textContent = message
  }

  function clearErrors(e) {
    const field = e.target
    field.classList.remove("error")
    const errorElement = field.parentNode.querySelector(".error-message")
    if (errorElement) {
      errorElement.remove()
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    const inputs = contactForm.querySelectorAll("input, textarea")
    let isValid = true

    inputs.forEach((input) => {
      if (!validateField({ target: input })) {
        isValid = false
      }
    })

    if (isValid) {
      // Show success message
      showNotification("Message sent successfully! I'll get back to you soon.", "success")
      contactForm.reset()
    } else {
      showNotification("Please fix the errors above.", "error")
    }
  }

  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      color: white;
      font-weight: 600;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      ${type === "success" ? "background: #10b981;" : "background: #ef4444;"}
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 5000)
  }

  // Performance optimization: Lazy load images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Performance optimization
window.addEventListener(
  "scroll",
  utils.throttle(() => {
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

      header.classList.toggle("sticky", window.scrollY > 100)

      menuIcon.classList.remove("bx-x")
      navbar.classList.remove("active")
    }
  }, 16),
) // ~60fps

// Service Worker Registration (for PWA functionality)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

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
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .bx-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`
document.head.appendChild(style)

// Add CSS for enhanced form validation
const validationStyles = document.createElement("style")
validationStyles.textContent = `
  .error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
  
  .error-message {
    display: block;
    color: #ef4444;
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
  
  .keyboard-navigation *:focus {
    outline: 2px solid var(--main-color);
    outline-offset: 2px;
  }
  
  .notification {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`
document.head.appendChild(validationStyles)
