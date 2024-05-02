const langEL = document.querySelector('.langWrap')
const link = document.querySelectorAll('.langswitch')
const titleEL1 = document.querySelector('.text-about-me-title')
const descrEL1 = document.querySelector('.text-about-me')
const titleEL2 = document.querySelector('.text-furthermore-title')
const descrEL2 = document.querySelector('.text-furthermore')

link.forEach(el => {
    el.addEventListener('click', () => {
        langEL.querySelector('.active').classList.remove('active');
        el.classList.add('active');

        const attr = el.getAttribute('id')

        titleEL1.innerHTML = data[attr].info_titel1
        descrEL1.innerHTML = data[attr].info_content1

        titleEL2.innerHTML = data[attr].info_titel2
        descrEL2.innerHTML = data[attr].info_content2
    });
});

const data = {
    "engels":
        {
            "info_titel1": "About me <i class=\"fa-solid fa-circle-info\" style=\"font-size: 25px\"></i>",
            "info_content1":
                "My name is Lucas, and I am a passionate Software Developer. <br> With 4 years of experience as a student, intern, and hobbyist, I have built knowledge in Application Development, Web Development, Databases and scripting. <br> <br> What started as a hobby and interest has now turned into an MBO4 diploma in Software Development, and it doesn't stop there. <br> Because I aspire to expand my expertise and skills, I have recently started my Associate's degree in Software Development at the Amsterdam University of Applied Sciences.",

            "info_titel2": "And furthermore...",
            "info_content2": "Now that I have obtained my diploma, I find myself in a position where I could enter the job market. <br> However, I have chosen to continue my studies. <br> To still make the most of my diploma and build a portfolio, I have decided to establish my own company where I offer programming services as a freelancer. <br> <br> If you need a workforce for a small project, website, or any other work requiring programming, please let me know. <br> I would be happy to help. <br> <br> Contact Information:"
        },
    "nederlands":
        {
            "info_titel1": "Over mij <i class=\"fa-solid fa-circle-info\" style=\"font-size: 25px\"></i>",
            "info_content1":
                "Mijn naam is Lucas, ik ben een gepassioneerde Software Developer. <br> Met 4 jaar ervaring als student, stagiair en hobbyist heb ik een kennis opgebouwd in Applicatie Ontwikkeling, Web Ontwikkeling, Databases en scripting. <br> <br> Wat begonnen is als hobby en interesse heb ik inmiddels omgezet in een MBO4 diploma Software Developer en daar stopt het niet. <br> Omdat ik de wens heb om mijn expertise en skills uit te breiden ben ik sinds kort begonnen aan mijn Associate's degree Software Development aan de Hogeschool van Amsterdam. ",

            "info_titel2": "En verder...",
            "info_content2":
                "Nu ik mijn diploma heb behaald, bevind ik mij in een positie waar ik de arbeidsmarkt op zou kunnen gaan, echter heb ik er voor gekozen om verder te studeren. <br> Om alsnog wat uit mijn diploma te halen en hiermee een portfolio op te bouwen heb ik besloten een eigen bedrijf op te richten waar ik als ZZP'er programmeerdiensten aanbied.<br> <br> Heeft u een arbeidskracht nodig voor bijvoorbeeld een klein project, website of ander werk waar programmeren nodig is? <br> Ik hoor het graag. <br> <br> Contactinformatie: "
        }
}
//Langswitch^

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            // entry.target.classList.remove('show')
        }
    })
});

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el))

//Fade in elements^


function scrollToId(id) {
    console.log("RAN");

    const yOffset = -68;
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
}

//button scroll^

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
}

//slideshow^

/**
 * On the button click, takes the users message and subject, and opens their default mail client and puts the subject and message in the right mail fields.
 */
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the values from the form
    const subject = document.getElementById('subject').value;
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value
    const message = document.getElementById('message').value;

    if (checkEmail(subject, name, company, message) === false) {
        window.alert('Please fill in all required form data.')
    } else {
        const emailContent = `Name: ${name}\n${company}\n\n${message}`;
        // Open the user's default email client and Create a mailto link with the subject and message
        window.location.href = `mailto:lucaskaas2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
    }
});

function checkEmail(subject, name, company, message) {
    if (subject === null || subject === " " || subject === undefined) {
        return false;
    }
    if (name === null || name === " " || name === undefined) {
        return false;
    }
    if (message === null || name === " " || name === undefined) {
        return false;
    }
}

