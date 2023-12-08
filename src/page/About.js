import react from "react";
import "./about.css"

function About() {
    return (
        <div className="maDiv" >
            <div className={"about-main-div"}>
                <div className="fade"></div>

                <section className="star-wars">
                    <div className="crawl">
                        <div className="title">
                            <p>ENSI'NIGHT V3</p>
                        </div>

                        <p>Bienvenue dans l'univers captivant de la Nuit de l'Info, où l'innovation rencontre la passion
                            pour le changement. Au cœur de cet événement palpitant, notre équipe a plongé dans le défi
                            excitant de créer une application exceptionnelle, fusionnant technologie et conscience
                            environnementale.
                        </p>


                        <p><a href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} style={{color: "inherit"}}> Notre motivation </a>
                            découle de notre conviction commune que chaque geste compte dans la
                            préservation de notre planète. Face aux défis écologiques actuels, nous avons uni nos
                            compétences diverses pour concevoir une application axée sur la sensibilisation
                            environnementale et les gestes concrets que chacun peut poser au quotidien.
                        </p>

                        <p>Nous croyons fermement que l'éducation est le socle de tout changement significatif. C'est
                            pourquoi notre application vise à informer et à inspirer. Explorez avec nous les gestes
                            simples mais puissants qui peuvent contribuer à la préservation de notre environnement. De
                            la réduction des déchets à la promotion des énergies renouvelables, notre application offre
                            des conseils pratiques adaptés à votre quotidien.
                        </p>

                        <p>Lors de cette Nuit de l'Info, notre équipe a transcendé les frontières de la technologie pour
                            créer une plateforme engageante et éducative. Chacune de nos lignes de code témoigne de
                            notre engagement envers un avenir plus durable. Nous sommes fiers de présenter une
                            application qui va au-delà de la simple fonctionnalité, en intégrant une dimension éducative
                            pour catalyser le changement environnemental.
                        </p>

                        <p>Rejoignez-nous dans cette aventure où la technologie et la conscience se rejoignent pour
                            créer un impact significatif. Ensemble, cultivons un monde où chaque individu, informé et
                            inspiré, peut contribuer à préserver la beauté fragile de notre planète.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default About;