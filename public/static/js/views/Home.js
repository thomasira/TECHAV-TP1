import AbstractView from "./AbstractView.js";

export default class extends AbstractView{

    constructor() {
        super();
        this.countries = ["ca", "fr", "us"];
        this.init();
    }

    init() {
        this.setTitle('Home');
    }

    async getHTML() {
        const countriesData = await this.getData();
        
        const resHome = await fetch('/static/views/home.html');
        let homeTemplate = await resHome.text();
        const resArticle = await fetch('/static/views/templates/article-item.html')
        let articleTemplate = await resArticle.text();

        for(const country in countriesData) {
            let elCountry = "";
            countriesData[country].forEach(article => {
                let elArticle = articleTemplate;
                elArticle = elArticle.replaceAll("{{ title }}", article.title);
                elArticle = elArticle.replaceAll("{{ description }}", article.description);
                elArticle = elArticle.replaceAll("{{ url }}", article.url);
                elArticle = elArticle.replaceAll("{{ urlToImage }}", article.urlToImage);
                
                elCountry += elArticle;
            });
            console.log(country, countriesData[country]);
            homeTemplate = homeTemplate.replace(`{{ list-${country} }}`, elCountry);
        }
        return homeTemplate;
    }

    async getData() {
        const countriesData = {};
        this.countries.forEach(async country => {
            const res = await fetch(`/static/results/${country}.json`);
            const data = await res.json();
            countriesData[country] = data.articles;
        });
        console.log(countriesData)
        return countriesData;
    }
} 