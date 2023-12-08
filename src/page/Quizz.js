import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import "../components/quizz/QuizzButton.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faCircleXmark} from "@fortawesome/free-solid-svg-icons";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const QuestionArray = [
    {
        question: "Quelle est la principale cause du réchauffement climatique ?",
        answers: [
            {answer: true, text: "Les émissions de gaz à effet de serre"},
            {answer: false, text: "La pollution plastique"},
            {answer: false, text: "La déforestation"},
            {answer: false, text: "Les éruptions volcaniques"},
        ],
    },
    {
        question: "Quelle est la conséquence directe du changement climatique sur les océans ?",
        answers: [
            {answer: false, text: "Diminution du niveau de la mer"},
            {answer: false, text: "Augmentation de la biodiversité marine"},
            {answer: true, text: "Augmentation de l'acidité des océans"},
            {answer: false, text: "Réduction des ouragans"},
        ],
    },
    {
        question: "Quel gaz contribue le plus au changement climatique ?",
        answers: [
            {answer: true, text: "Dioxyde de carbone (CO2)"},
            {answer: false, text: "Méthane (CH4)"},
            {answer: false, text: "Protoxyde d'azote (N2O)"},
            {answer: false, text: "Ozone (O3)"},
        ],
    },
    {
        question: "Qu'est-ce que l'effet de serre ?",
        answers: [
            {answer: true, text: "Un phénomène qui retient la chaleur dans l'atmosphère"},
            {answer: false, text: "Un gaz toxique dans l'air"},
            {answer: false, text: "Un processus de refroidissement naturel"},
            {answer: false, text: "Une technique agricole durable"},
        ],
    },
    {
        question: "Quel pourcentage des émissions mondiales de gaz à effet de serre est dû à l'activité humaine ?",
        answers: [
            {answer: true, text: "Environ 75%"},
            {answer: false, text: "Environ 25%"},
            {answer: false, text: "Environ 50%"},
            {answer: false, text: "Moins de 10%"},
        ],
    },
    {
        question: "Quelle est la principale source d'émissions de méthane d'origine humaine ?",
        answers: [
            {answer: true, text: "L'élevage du bétail"},
            {answer: false, text: "Les décharges"},
            {answer: false, text: "Les rizières"},
            {answer: false, text: "L'exploitation minière"},
        ],
    },
    {
        question: "Quelle action individuelle contribue le plus à la réduction de l'empreinte carbone ?",
        answers: [
            {answer: true, text: "Réduire la consommation de viande"},
            {answer: false, text: "Utiliser des ampoules LED"},
            {answer: false, text: "Recycler plus"},
            {answer: false, text: "Utiliser les transports publics"},
        ],
    },
    {
        question: "Quel est l'objectif principal de l'Accord de Paris sur le climat ?",
        answers: [
            {answer: true, text: "Limiter le réchauffement climatique à moins de 2 degrés Celsius"},
            {answer: false, text: "Éliminer complètement les émissions de gaz à effet de serre"},
            {answer: false, text: "Promouvoir l'utilisation des énergies fossiles"},
            {answer: false, text: "Augmenter la production industrielle sans limites"},
        ],
    },
    {
        question: "Quel est le terme utilisé pour décrire le changement climatique à long terme ?",
        answers: [
            {answer: true, text: "Réchauffement climatique"},
            {answer: false, text: "Saison des pluies"},
            {answer: false, text: "Période glaciaire"},
            {answer: false, text: "Éclipse solaire"},
        ],
    },
    {
        question: "Quel est le principal obstacle à la transition vers les énergies renouvelables ?",
        answers: [
            {answer: true, text: "Dépendance continue aux énergies fossiles"},
            {answer: false, text: "Manque de technologie solaire"},
            {answer: false, text: "Résistance des gouvernements"},
            {answer: false, text: "Coût élevé des énergies renouvelables"},
        ],
    },
    {
        question: "Quel est le principal impact de la déforestation sur la biodiversité ?",
        answers: [
            {answer: true, text: "Perte d'habitats naturels et extinction d'espèces"},
            {answer: false, text: "Augmentation de la diversité des espèces"},
            {answer: false, text: "Renforcement des écosystèmes forestiers"},
            {answer: false, text: "Réduction des émissions de gaz à effet de serre"},
        ],
    },
    {
        question: "Quelle est la principale source de pollution de l'air dans les zones urbaines ?",
        answers: [
            {answer: true, text: "Les émissions des véhicules à combustion"},
            {answer: false, text: "Les cheminées industrielles"},
            {answer: false, text: "Les feux de forêt naturels"},
            {answer: false, text: "Les activités agricoles"},
        ],
    },
    {
        question: "Comment les océans absorbent-ils le dioxyde de carbone atmosphérique ?",
        answers: [
            {answer: true, text: "À travers le processus d'absorption marine"},
            {answer: false, text: "Par la photosynthèse des algues marines"},
            {answer: false, text: "Par l'évaporation de l'eau de mer"},
            {answer: false, text: "À travers les éruptions volcaniques sous-marines"},
        ],
    },
    {
        question: "Qu'est-ce que l'agriculture biologique vise à minimiser ?",
        answers: [
            {answer: true, text: "L'utilisation de pesticides et d'engrais chimiques"},
            {answer: false, text: "La diversité des cultures"},
            {answer: false, text: "La durée de vie des sols agricoles"},
            {answer: false, text: "L'utilisation de techniques d'irrigation économes en eau"},
        ],
    },
    {
        question: "Comment les marées noires affectent-elles la faune marine ?",
        answers: [
            {answer: true, text: "Elles provoquent des dommages graves en tuant et en contaminant la vie marine"},
            {answer: false, text: "Elles favorisent la croissance des récifs coralliens"},
            {answer: false, text: "Elles améliorent la qualité de l'eau de mer"},
            {answer: false, text: "Elles n'ont aucun impact sur la faune marine"},
        ],
    },
    {
        question: "Quel est l'effet de l'acidification des océans sur les coquillages et les coraux ?",
        answers: [
            {answer: true, text: "Ils ont du mal à former et à maintenir leurs coquilles et leurs squelettes"},
            {answer: false, text: "Ils prospèrent et se reproduisent davantage"},
            {answer: false, text: "Ils deviennent plus résistants aux changements environnementaux"},
            {answer: false, text: "Ils absorbent davantage de CO2 atmosphérique"},
        ],
    },
    {
        question: "Quel est l'impact de la pollution plastique sur la vie marine ?",
        answers: [
            {answer: true, text: "L'ingestion de déchets plastiques peut entraîner la mort des animaux marins"},
            {answer: false, text: "Elle favorise la diversité des espèces marines"},
            {answer: false, text: "Elle améliore la qualité des habitats marins"},
            {answer: false, text: "Elle n'a aucun impact sur la vie marine"},
        ],
    },
    {
        question: "Qu'est-ce que l'effet d'albédo dans le contexte du changement climatique ?",
        answers: [
            {answer: true, text: "La capacité de certaines surfaces à réfléchir la lumière solaire"},
            {answer: false, text: "L'absorption de chaleur par les océans"},
            {answer: false, text: "L'accumulation de neige sur les montagnes"},
            {answer: false, text: "L'augmentation des émissions de gaz à effet de serre"},
        ],
    },
    {
        question: "Quelle est la principale source de pollution de l'eau douce par les nutriments ?",
        answers: [
            {answer: true, text: "Les activités agricoles et le ruissellement des engrais"},
            {answer: false, text: "Les rejets industriels"},
            {answer: false, text: "Les déchets municipaux"},
            {answer: false, text: "Les déversements pétroliers"},
        ],
    },
    {
        question: "Quelle est la principale cause de la perte de la couche d'ozone stratosphérique ?",
        answers: [
            {answer: true, text: "Les chlorofluorocarbures (CFC) libérés dans l'atmosphère"},
            {answer: false, text: "Les éruptions volcaniques"},
            {answer: false, text: "Les émissions de gaz naturel"},
            {answer: false, text: "Les activités agricoles intensives"},
        ],
    },
    {
        question: "Qu'est-ce que l'agriculture intensive ?",
        answers: [
            {
                answer: true,
                text: "Une méthode agricole caractérisée par l'utilisation intensive de machines et de produits chimiques"
            },
            {answer: false, text: "Une approche durable basée sur l'utilisation de techniques traditionnelles"},
            {answer: false, text: "Une méthode qui favorise la diversité des cultures"},
            {answer: false, text: "Une pratique qui n'a aucun impact sur l'environnement"},
        ],
    },
    {
        question: "Comment le changement climatique affecte-t-il les modèles migratoires des espèces animales ?",
        answers: [
            {
                answer: true,
                text: "Il perturbe les schémas traditionnels en raison des variations de température et des habitats"
            },
            {answer: false, text: "Il favorise la migration en créant des conditions plus propices"},
            {answer: false, text: "Il n'a aucun impact sur les modèles migratoires"},
            {answer: false, text: "Il renforce les comportements migratoires existants"},
        ],
    },
    {
        question: "Quel est le rôle des mangroves dans les écosystèmes côtiers ?",
        answers: [
            {answer: true, text: "Elles protègent les côtes contre l'érosion et fournissent des habitats essentiels"},
            {answer: false, text: "Elles accélèrent le processus d'érosion côtière"},
            {answer: false, text: "Elles favorisent l'expansion des zones urbaines côtières"},
            {answer: false, text: "Elles n'ont aucun rôle dans les écosystèmes côtiers"},
        ],
    },
    {
        question: "Qu'est-ce que l'effet de halo écologique ?",
        answers: [
            {
                answer: true,
                text: "Une perception positive d'une entreprise ou d'un produit en raison de ses actions environnementales, masquant d'autres impacts négatifs"
            },
            {answer: false, text: "Un phénomène météorologique lié aux changements climatiques"},
            {answer: false, text: "Une technique de restauration des écosystèmes"},
            {answer: false, text: "Un concept sans pertinence dans le contexte environnemental"},
        ],
    },
    {
        question: "Quel est l'impact de la pollution lumineuse sur les écosystèmes nocturnes ?",
        answers: [
            {
                answer: true,
                text: "Elle perturbe les cycles de vie naturels des espèces nocturnes et nuit à l'observation des étoiles"
            },
            {answer: false, text: "Elle améliore la visibilité nocturne pour les animaux"},
            {answer: false, text: "Elle n'a aucun effet sur les écosystèmes nocturnes"},
            {answer: false, text: "Elle favorise l'activité nocturne des espèces diurnes"},
        ],
    },
    {
        question: "Quelle est l'importance des corridors écologiques dans la préservation de la biodiversité ?",
        answers: [
            {
                answer: true,
                text: "Ils facilitent le déplacement des espèces, contribuant ainsi à la diversité génétique et à la survie des populations"
            },
            {answer: false, text: "Ils n'ont aucun impact sur la biodiversité"},
            {answer: false, text: "Ils perturbent les écosystèmes naturels"},
            {answer: false, text: "Ils favorisent la fragmentation des habitats"},
        ],
    },
    {
        question: "Quel est l'effet de la surpêche sur les écosystèmes marins ?",
        answers: [
            {
                answer: true,
                text: "Elle perturbe les équilibres des chaînes alimentaires marines et entraîne la diminution des populations de poissons"
            },
            {answer: false, text: "Elle renforce les populations de poissons et améliore la santé des océans"},
            {answer: false, text: "Elle favorise la biodiversité marine"},
            {answer: false, text: "Elle n'a aucun impact sur les écosystèmes marins"},
        ],
    },
    {
        question: "Quel est l'impact de l'utilisation excessive d'engrais chimiques sur les sols agricoles ?",
        answers: [
            {answer: true, text: "Elle peut entraîner l'épuisement et la dégradation des sols"},
            {answer: false, text: "Elle améliore la fertilité des sols à long terme"},
            {answer: false, text: "Elle n'a aucun impact sur les sols agricoles"},
            {answer: false, text: "Elle favorise la croissance des cultures"},
        ],
    },
    {
        question: "Quel est l'objectif principal de la permaculture ?",
        answers: [
            {
                answer: true,
                text: "Créer des systèmes agricoles durables en imitant les modèles et les relations observés dans la nature"
            },
            {answer: false, text: "Promouvoir l'utilisation intensive de pesticides"},
            {answer: false, text: "Augmenter la production agricole sans se soucier de la durabilité"},
            {answer: false, text: "Ignorer les principes écologiques dans l'agriculture"},
        ],
    },
];
const Quizz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [oldAnswer, setoldAnswer] = useState(null);
    let Index = 0;
    let tab = [""];
    useEffect(() => {
        // Mélanges et initialise les questions lors du montage du composant
        setQuestions(shuffleArray(QuestionArray));
    }, []);

    const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

    const quizzGame = (userAnswer) => {
        if (!currentQuestion) {
            return;
        }

        const correctAnswer = currentQuestion.answers.find((it) => it.answer);

        if (correctAnswer.text === userAnswer) {
            setScore(score + 2);
            setoldAnswer(userAnswer);
            setCorrectAnswer(true);
        } else {
            setScore(score - 1);
            setoldAnswer(correctAnswer.text);
            setCorrectAnswer(false);
        }

        // Exclure la question actuelle des questions disponibles
        const remainingQuestions = questions.filter((q, index) => index !== currentQuestionIndex);

        if (remainingQuestions.length > 0) {
            // Passer à une question aléatoire parmi les questions restantes
            const nextQuestionIndex = Math.floor(Math.random() * remainingQuestions.length);
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            alert(`Félicitations, vous avez terminé le quizz ! Votre score final est ${score}`);
            // Réinitialiser le quizz ou effectuer d'autres actions si nécessaire
            setCurrentQuestionIndex(0);
            setScore(0);
            // Remélanger les questions pour la prochaine partie
            setQuestions(shuffleArray(QuestionArray));
        }
    };

    const shuffledAnswers = currentQuestion ? shuffleArray(currentQuestion.answers) : [];
    const element = <FontAwesomeIcon icon={faAngleLeft}/>
    const error = <FontAwesomeIcon icon={faCircleXmark} fontSize={"3em"} color={"white"}/>

    const modalStyles = {
        overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0",
            width: "20%",
        }
    };
    document.addEventListener("keydown", function(event) {
        //ester egg
        switch (event.key) {
            case "e":
                tab[Index] = "e";
                Index++;
                break;
            case "n":
                tab[Index] = "n";
                Index++;
                break;
            case "s":
                tab[Index] = "s";
                Index++;
                break;
            case "i":
                tab[Index] = "i";
                Index++;
                break;
            case "g":
                tab[Index] = "g";
                Index++;
                break;
            case "h":
                tab[Index] = "h";
                Index++;
                break;
            case "t":
                tab[Index] = "t";
                Index++;
                break;
            default:
                // Réinitialise le tableau si une touche incorrecte est pressée
                tab = [""];
                Index = 0;
                break;
        }
        if (Index === 9 && tab.join("") === "ensinight") {
            // Redirige vers la page Internet souhaitée
            window.location.href = 'https://www.ensisa.uha.fr/';
        }
        if (Index > 9) {
            tab = [""];
            Index = 0;
        }
    });
    return (
        <>
            <div className={"quiz-score"}>
                <span>Score: {score}</span>
            </div>
            <Modal isOpen={correctAnswer === false} onRequestClose={() => setCorrectAnswer(null)} style={{
                overlay: {
                    zIndex: 1000,
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                },
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    padding: "0",
                    width: "80%",
                }
            }}>
                    <div className={"error-div"}>
                        {error}
                    </div>
                    <div>
                        <h5 style={{textAlign: "center", color: "#e54646"}}>la bonne réponse était :</h5>
                        <p style={{textAlign:"center"}}>{oldAnswer}</p>
                    </div>
            </Modal>
            {currentQuestion && (
                <div className={"question-card"}>
                    <div>
                        <h5>
                            {currentQuestion.question}
                        </h5>
                    </div>
                    <div className={"container"}>
                        {shuffledAnswers.map((it, index) => (
                            <div className={"question-button"} key={index} onClick={() => quizzGame(it.text)}>
                                {it.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Link to={"/"} className={"back-button"}>
                {element}
            </Link>
        </>
    );
};

export default Quizz;