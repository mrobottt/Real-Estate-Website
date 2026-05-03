document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.card2');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, {
    threshold: 0.05, // triggers much earlier (5% visible)
    rootMargin: "0px 0px -50px 0px" // triggers slightly before reaching view
  });

  cards.forEach((card) => {
    card.style.transitionDelay = `0s`; // remove stagger delay
    observer.observe(card);
  });
});







document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.review-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px"
  });

  cards.forEach((card) => {
    card.style.transitionDelay = `0.05s`;
    observer.observe(card);
  });
});












document.querySelectorAll('.details-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card2');

    // OPTIONAL: close others (clean UX)
    document.querySelectorAll('.card2').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });

    // toggle clicked one
    card.classList.toggle('active');





setTimeout(() => {
  const yOffset = 200;

  const y = card.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
}, 200);






  });
});















const addBtn = document.querySelector(".review-btn");
const form = document.querySelector(".review-form");
const submitBtn = document.getElementById("submitReview");
const container = document.querySelector(".review-container");

let userHasReview = false;

// OPEN FORM
addBtn.addEventListener("click", () => {
  if (userHasReview) return;

  form.classList.add("active");

  setTimeout(() => {
    form.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    document.getElementById("username").focus();
  }, 150);
});

// SUBMIT REVIEW
submitBtn.addEventListener("click", () => {
  const name = document.getElementById("username").value;
  const text = document.getElementById("reviewText").value;
  const rating = document.getElementById("rating").value;

  if (name === "" || text === "") {
    alert("Fill everything bro");
    return;
  }

  const card = document.createElement("div");
  card.classList.add("review-card", "show");

  let stars =
    "★★★★★".slice(0, rating) +
    "☆☆☆☆☆".slice(0, 5 - rating);

  card.innerHTML = `
    <div class="stars">${stars}</div>
    <p>"${text}"</p>
    <div class="user">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmtdDVMR9NS61_HtfCwR9cftvbIkgciBYLQ&s">
      <h4>${name}</h4>
    </div>

    <button class="delete-review-btn">Delete review</button>
  `;

  container.appendChild(card);

  userHasReview = true;

  form.classList.remove("active");
  addBtn.style.display = "none";

  form.reset();
});

// ✅ FIXED DELETE (EVENT DELEGATION - THIS IS THE IMPORTANT PART)
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-review-btn")) {
    const card = e.target.closest(".review-card");

    if (!card) return;

    card.remove();

    userHasReview = false;
    addBtn.style.display = "inline-block";
  }
});