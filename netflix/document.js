document.querySelector('.cta-form button').addEventListener('click', () => {
  const email = document.querySelector('.cta-form input').value;
  if (email) {
      alert('Thank you for signing up! (This is a demo)');
  } else {
      alert('Please enter a valid email address.');
  }
});

// Smooth scroll for nav links (placeholder)
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = document.querySelector(e.target.getAttribute('href'));
      if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
      }
  });
});
