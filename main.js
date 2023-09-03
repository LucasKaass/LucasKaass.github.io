const langEL = document.querySelector('.langWrap')
const link = document.querySelectorAll('a')
const titleEL1 = document.querySelector('.info_titel1')
const descrEL1 = document.querySelector('.info_content1')
const titleEL2 = document.querySelector('.info_titel2')
const descrEL2 = document.querySelector('.info_content2')

link.forEach( el => {
    el.addEventListener('click', () => {
        langEL.querySelector('.active').classList.remove('active');
        el.classList.add('active');

        const attr = el.getAttribute('taal')

        titleEL1.innerHTML = data[attr].info_titel1
        descrEL1.innerHTML = data[attr].info_content1

        titleEL2.innerHTML = data[attr].info_titel2
        descrEL2.innerHTML = data[attr].info_content2
    });
});

const data = {
    "engels":
        {
            "info_titel1": "About Me",
            "info_content1":"My name is Lucas, and I am a passionate Software Developer. <br> With 4 years of experience as a student, intern, and hobbyist, I have built knowledge in Application Development, Web Development, Databases, Scripting, and AI. <br> <br> What started as a hobby and interest has now turned into an MBO4 diploma in Software Development, and it doesn't stop there. <br> Because I aspire to expand my expertise and skills, I have recently started my Associate's degree in Software Development at the Amsterdam University of Applied Sciences.",

            "info_titel2": "And furthermore...",
            "info_content2": "Now that I have obtained my diploma, I find myself in a position where I could enter the job market. However, I have chosen to continue my studies. <br> To still make the most of my diploma and build a portfolio, I have decided to establish my own company where I offer programming services as a freelancer. <br> <br> If you need a workforce for a small project, website, or any other work requiring programming, please let me know. <br> I would be happy to help. <br> <br> Contact Information:"
        },
    "nederlands":
        {
            "info_titel1": "Over mij",
            "info_content1":
                "Mijn naam is Lucas en ik ben een gepassioneerde Software Developer. <br> Met 4 jaar ervaring als student, stagiair en hobbyist heb ik een kennis opgebouwd in Applicatie Ontwikkeling, Web Ontwikkeling, Databases, Scripting en AI. <br> <br> Wat begonnen is als hobby en interesse heb ik inmiddels omgezet in een MBO4 diploma Software Developer en daar stopt het niet. <br> Omdat ik de wens heb om mijn expertise en skills uit te breiden ben ik sinds kort begonnen aan mijn Associate's degree Software Development aan de Hogeschool van Amsterdam. ",

            "info_titel2":"En verder...",
            "info_content2":
                "Nu ik mijn diploma heb behaald, bevind ik mij in een positie waar ik de arbeidsmarkt op zou kunnen gaan, Echter heb ik er voor gekozen om verder te studeren. <br> Om alsnog wat uit mijn diploma te halen en hiermee een portfolio op te bouwen heb ik besloten een eigen bedrijf op te richten waar ik als ZZP'er programmeerdiensten aanbied.<br> <br> Heeft u een arbeidskracht nodig voor bijvoorbeeld een klein project, website of ander werk waar programmeren nodig is? <br> Ik hoor het graag. <br> <br> Contactinformatie: "
        }
}
