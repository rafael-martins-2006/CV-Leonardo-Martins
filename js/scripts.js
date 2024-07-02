document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector('nav');
  const openSidebarButton = document.getElementById('open-sidebar');
  const closeSidebarButton = document.getElementById('close-sidebar');
  const sidebar = document.getElementById('sidebar');
  let lastScrollTop = 0;
  let isSidebarOpen = false;

  function adjustNavbarAndSidebarVisibility() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 500) {
      navbar.classList.remove('navbar-visible');
      navbar.classList.add('navbar-hidden');
      if (!isSidebarOpen) {
        sidebar.classList.remove('sidebar-visible');
        sidebar.classList.add('sidebar-hidden');
      }
    } else {
      navbar.classList.remove('navbar-hidden');
      navbar.classList.add('navbar-visible');
      if (isSidebarOpen) {
        sidebar.classList.remove('sidebar-hidden');
        sidebar.classList.add('sidebar-visible');
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener('scroll', adjustNavbarAndSidebarVisibility, false);

  navbar.classList.add('navbar-visible');

  function openSidebar() {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('translate-x-0');
    isSidebarOpen = true;
  }

  function closeSidebar() {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');
    isSidebarOpen = false;
  }

  openSidebarButton.addEventListener('click', function () {
    if (sidebar.classList.contains('translate-x-0')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  closeSidebarButton.addEventListener('click', function () {
    closeSidebar();
  });

  window.addEventListener('click', function (event) {
    if (!sidebar.contains(event.target) && !openSidebarButton.contains(event.target)) {
      closeSidebar();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) {
      closeSidebar();
    }
  });
});


let currentSlide = 0;
const totalSlides = document.querySelectorAll(".carousel-item").length;
let slideInterval;

const slideDetails = [
  {
    title: "Perfis - High Play Institute",
    date: "2024",
    description:
      "Desenvolvi os perfis individuais para os funcionários Back Office da High Play Institute. Foi utilizada a informação do site para a criação da página, mantendo sempre o layout do site. A imagem mostra o perfil de Hélder Ferreira, que atua como Project Manager/Web Developer. A página inclui uma foto profissional, uma citação inspiradora sobre trabalho em equipa, e detalhes sobre as suas competências e formação académica.Desenvolvi os perfis individuais para os funcionários Back Office da High Play Institute. Foi utilizada a informação do site para a criação da página, mantendo sempre o layout do site. A imagem mostra o perfil de Hélder Ferreira, que atua como Project Manager/Web Developer. A página inclui uma foto profissional, uma citação inspiradora sobre trabalho em equipa, e detalhes sobre as suas competências e formação académica.Desenvolvi os perfis individuais para os funcionários Back Office da High Play Institute. Foi utilizada a informação do site para a criação da página, mantendo sempre o layout do site. A imagem mostra o perfil de Hélder Ferreira, que atua como Project Manager/Web Developer. A página inclui uma foto profissional, uma citação inspiradora sobre trabalho em equipa, e detalhes sobre as suas competências e formação académica.",
  },
  {
    title: "Projeto 2",
    date: "Fevereiro 2022",
    description: "Descrição do projeto 2.",
  },
  {
    title: "Projeto 3",
    date: "Março 2022",
    description: "Descrição do projeto 3.",
  },
];

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text.padEnd(maxLength, " ");
}

function moveSlide(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateCarousel();
}

function moveToSlide(slide) {
  currentSlide = slide;
  updateCarousel();
}

function updateCarousel() {
  const carouselInner = document.querySelector(".carousel-inner");
  const offset = -currentSlide * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;

  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.classList.toggle("bg-[#FFD700]", index === currentSlide);
    indicator.classList.toggle("bg-gray-400", index !== currentSlide);
  });

  updateSlideDetails();
}

function updateSlideDetails() {
  const details = slideDetails[currentSlide];
  const titleElement = document.getElementById("titulo");
  const dateElement = document.getElementById("data");
  const descriptionElement = document.getElementById("descricao");

  const truncatedDescription = truncateText(details.description, 1000);

  const detailsElement = document.getElementById("detalhes");
  detailsElement.classList.add("fade-out");

  setTimeout(() => {
    titleElement.textContent = details.title;
    dateElement.textContent = details.date;
    descriptionElement.textContent = truncatedDescription;

    detailsElement.classList.remove("fade-out");
    detailsElement.classList.add("fade-in");
  }, 250);
}

function startInterval() {
  slideInterval = setInterval(() => {
    moveSlide(1);
  }, 3500);
}

document
  .querySelector(".carousel-button.left")
  .addEventListener("click", () => {
    clearInterval(slideInterval);
    moveSlide(-1);
  });

document
  .querySelector(".carousel-button.right")
  .addEventListener("click", () => {
    clearInterval(slideInterval);
    moveSlide(1);
  });

document.querySelectorAll(".indicator").forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    clearInterval(slideInterval);
    moveToSlide(index);
  });
});

startInterval();
updateCarousel();

let isPaused = false;

function toggleAnimation() {
  const pauseBtn = document.getElementById("pause-btn");
  if (isPaused) {
    startInterval();
    pauseBtn.innerHTML =
      '<i class="fa-solid fa-pause fa-xl" style="color: #ffffff;"></i>';
    pauseBtn.setAttribute("title", "Parar a animação");
  } else {
    clearInterval(slideInterval);
    pauseBtn.innerHTML =
      '<i class="fa-solid fa-play fa-lg" style="color: #ffffff;"></i>';
    pauseBtn.setAttribute("title", "Continuar a animação");
  }
  isPaused = !isPaused;
}

document.getElementById("pause-btn").addEventListener("click", toggleAnimation);

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownMenu = document.getElementById("dropdown-menu");

  dropdownButton.addEventListener("click", function () {
    dropdownMenu.classList.toggle("hidden");
  });

  window.addEventListener("click", function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.querySelectorAll(".link a");

  navbarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: "smooth",
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal");
  const closeModalButtons = document.querySelectorAll(".close-modal");
  const openModalButtons = document.querySelectorAll("[data-modal]");
  const body = document.body;

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      modal.classList.add("active");
      body.style.overflow = "hidden";
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModals();
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModals();
    }
  });

  function closeModals() {
    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
    body.style.overflow = "auto";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const showMoreBtn = document.getElementById("show-more-btn");
  const contentContainer = document.getElementById("content-container");
  const extraQuotes = document.getElementById("extra-quotes");
  const gradientOverlay = document.querySelector(".gradient-overlay");

  showMoreBtn.addEventListener("click", () => {
    extraQuotes.classList.toggle("hidden");
    if (extraQuotes.classList.contains("hidden")) {
      showMoreBtn.textContent = "Ver mais";
      contentContainer.classList.remove("expanded");
      contentContainer.style.maxHeight = "";
      gradientOverlay.style.display = "block";
    } else {
      showMoreBtn.textContent = "Ver menos";
      contentContainer.classList.add("expanded");
      contentContainer.style.maxHeight = "none";
      gradientOverlay.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const ratingElement = entry.target;
        const rating = parseFloat(ratingElement.getAttribute("data-rating"));
        const stars = ratingElement.querySelectorAll(".star");

        stars.forEach((star, index) => {
          if (index < Math.floor(rating)) {
            setTimeout(() => {
              star.classList.add("filled");
            }, index * 200);
          } else if (index < Math.ceil(rating)) {
            setTimeout(() => {
              star.classList.add("filled");
              star.style.setProperty(
                "--filled-width",
                `${(rating - Math.floor(rating)) * 100}%`
              );
            }, index * 200);
          }
        });

        observer.unobserve(ratingElement);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".star-rating").forEach((starRating) => {
    observer.observe(starRating);
  });
});

const chartConfig = {
  series: [30, 40, 15, 55],
  chart: {
      type: "pie",
      width: 350,
      height: 350,
      animations: {
          enabled: false,
      },
      toolbar: {
          show: false,
      },
      events: {
          dataPointSelection: (event, chartContext, config) => {
              const skillKeys = ["illustrator", "xd", "max", "vscode"];
              const selectedSkill = skillKeys[config.dataPointIndex];
              toggleSkillDescription(selectedSkill, config.dataPointIndex);
          },
      },
  },
  title: {
      show: false,
  },
  dataLabels: {
      enabled: false,
  },
  colors: ["#343C3E", "#343C3E", "#343C3E", "#343C3E"],
  legend: {
      show: false,
  },
  tooltip: {
      enabled: false,
  },
  plotOptions: {
      pie: {
          expandOnClick: false,
          donut: {
              labels: {
                  show: false,
              },
          },
          dataLabels: {
              show: false,
          },
          customScale: 1,
      },
  },
};

const chart = new ApexCharts(document.querySelector("#pie-chart"), chartConfig);
chart.render();

const skills = {
  illustrator: {
      title: "Adobe Illustrator",
      description: "Uma das primeiras áreas que explorei na multimédia foi a edição vetorial. Durante o meu percurso académico, iniciei com exercícios simples, como a construção de uma casa, para me familiarizar com os diversos utensílios do Adobe Illustrator. À medida que ganhava conhecimento nas ferramentas, avancei para outros projetos, recriando logotipos icónicos como os da Nike, Instagram, Ferrari e TikTok, entre outros. Este processo permitiu-me aprofundar as minhas competências no Illustrator, aprimorando a precisão no meu design vetorial.Todos os trabalhos que estão na imagem foram realizados por mim, uns para aprendizagem, outros para trabalhos escolares ou profissionais.",
      img: "img/ai_img.png",
  },
  xd: {
      title: "Adobe XD",
      description: "O Adobe XD foi uma das últimas ferramentas que comecei a utilizar, porém é uma das que tenho mais conhecimentos. É um aplicativo muito fácil de entender e de aprender, principalmente. Na imagem abaixo, mostro o protótipo de um website/aplicação mobile, onde escolhi desenvolver um site de venda de discos. Além do design do site, também criei o logotipo.",
      img: "img/xd_img.png",
  },
  max: {
      title: "Autodesk 3Ds Max",
      description: "A modelação 3D sempre foi um dos meus principais interesses, começando por trabalhos simples e evoluindo para objetos mais complexos ao longo do tempo. No último ano do meu curso, expandi os meus conhecimentos para incluir animação no 3Ds Max. Iniciei com projetos simples, como um loop onde uma bola inicialmente parada ganha movimento após ser atingida por outra. Este processo permitiu-me desenvolver habilidades sólidas em animação 3D. Destaco particularmente um projeto onde criei uma animação envolvendo um acidente entre um carro e um comboio. Esta animação demonstra não apenas a minha habilidade técnica com o 3Ds Max, mas também a capacidade de contar histórias visualmente complexas através da animação 3D.",
      video: "3ds_max_video.mp4",
  },
  vscode: {
      title: "Visual Studio Code",
      description: "A minha primeira interação com o Visual Studio Code foi durante o meu curso de Técnico de Multimédia (nível 4) no IPTA, onde escrevi minhas primeiras linhas de código em HTML e CSS. Ao longo do meu curso, aprendi novas linguagens de programação, como PHP, JavaScript e XML, entre outras. Também adquiri conhecimentos em bases de dados, embora prefira focar no desenvolvimento front-end. Atualmente, as linguagens que mais utilizo são HTML, CSS e JavaScript. Em particular, utilizo o Tailwind CSS, que facilita muito o processo de estilização comparado ao uso separado de HTML e CSS. Na imagem, é possível ver o meu projeto de final de estágio, no qual utilizei HTML, CSS, PHP e JavaScript.",
      img: "img/vscode_img.png",
  }
};

function toggleSkillDescription(skillKey, dataPointIndex) {
  const descriptionContainer = document.getElementById("skill-description");
  const skillMediaContainer = document.getElementById("skill-media");
  const skillImage = skillMediaContainer.querySelector("img");
  const skillVideo = skillMediaContainer.querySelector("video");
  const skill = skills[skillKey];

  const isActive = descriptionContainer.querySelector("h2").innerText === skill.title;

  if (isActive) {
      descriptionContainer.classList.add("hidden");
      skillMediaContainer.classList.add("hidden");
      descriptionContainer.querySelector("h2").innerText = "";
      descriptionContainer.querySelector("p").innerText = "";
      skillImage.src = "";
      skillVideo.src = "";
      skillImage.classList.add("hidden");
      skillVideo.classList.add("hidden");

      const newColors = chartConfig.series.map(() => "#343C3E");
      chart.updateOptions({
          colors: newColors
      });
  } else {
      descriptionContainer.querySelector("h2").innerText = skill.title;
      descriptionContainer.querySelector("p").innerText = skill.description;
      descriptionContainer.classList.remove("hidden");
      skillMediaContainer.classList.remove("hidden");

      if (skill.img) {
          skillImage.src = skill.img;
          skillImage.classList.remove("hidden");
          skillVideo.classList.add("hidden");
      } else if (skill.video) {
          skillVideo.src = skill.video;
          skillVideo.classList.remove("hidden");
          skillImage.classList.add("hidden");
      }

      const newColors = chartConfig.series.map((_, index) => index === dataPointIndex ? "#FFD700" : "#343C3E");
      chart.updateOptions({
          colors: newColors
      });
  }
}

document.querySelectorAll("#chart-container img").forEach(img => {
  img.addEventListener("click", (event) => {
      const skill = img.getAttribute("data-skill");
      const skillKeys = ["illustrator", "xd", "max", "vscode"];
      const dataPointIndex = skillKeys.indexOf(skill);
      toggleSkillDescription(skill, dataPointIndex);
  });
});