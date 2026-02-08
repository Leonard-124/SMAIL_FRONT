
//import Avon from "../images/Avon.jpg"
// import Choco from "../images/Choco.jpg"
// import Guiness from "../images/guiness.jpg"
// import pawpaw from "../images/pawpaw.jpg"
// import robot from "../images/robot.jpg"
// import tomato from "../images/tomato.jpg"
// import universe from "../images/universe.jpg"
import kamande_scaled from "./cereals/Kamande-scaled.jpg"
import kamande from "./cereals/Kamande.jpg"
import kunde_white from "./cereals/Kunde White.jpg"
import kunde_red from "./cereals/Kunde red.jpg"
import maize_white from "./cereals/Maize White.jpeg"
import maize_white1 from "./cereals/Maize White1.jpg"
import maize_yellow from "./cereals/Maize Yellow.jpg"
import makueni_ndengu from "./cereals/Makueni Ndengu.jpg"
import muthoki from "./cereals/Muthokoi.jpg"
import ndengu_special from "./cereals/Ndengu Special1.jpg"
import ndengu_special1 from "./cereals/Ndengu Special1.jpg"
import njugu_white from "./cereals/Njugu White.jpg"
import njugu_red from "./cereals/Njugu red.jpg"
import njugu_red1 from "./cereals/Njungu-Red.jpg"
import rosecoco from "./cereals/Rosecoco.jpg"
import simsim from "./cereals/SImsim.jpg"



const Items = [
    {
        id: 1,
        category: "Vegetables",
        price: "200",
        image: kamande_scaled,
        name: "Kamande",
        quantity: 21,
        description:"The best Kamande you can get"
    },
    {
        id: 2,
        category: "Sweet",
        price: "KES 290/kg",
        image: kamande,
        name: "Cowpeas(Kamande)",
        quantity: 21,
        description:"Kamande, or cowpeas, are small, tender legumes with a slightly sweet taste. They are often used in mukimo, stews, and boiled snacks. Rich in protein and easy to digest, they are a nutritious choice for all ages."
    },
    {
        id: 3,
        category: "electronics",
        price: "990",
        image: kunde_white,
        name: "White kunde",
        quantity: 14,
        description:"Honestly its very tasty"
    },
    {
        id: 4,
        category: "Drink",
        price: "20430",
        image: kunde_red,
        name: "Red Kunde",
        quantity: 26,
        description:"A beginner's kickstart kunde"
    },
    {
        id: 5,
        category: "Vegetables",
        price: "4356",
        image: maize_white,
        name: "White Maize",
        quantity: 21,
        description:"High-quality white maize, perfect for grinding into flour for ugali or boiling for fresh consumption. This staple grain is freshly sourced and stored to ensure quality and taste."
    },
    {
        id: 6,
        category: "Vegetables",
        price: "KES 65/kg",
        image: maize_white1,
        name: "White Hybrid Maize",
        quantity: 21,
        description:"High-quality white maize, perfect for grinding into flour for ugali or boiling for fresh consumption. This staple grain is freshly sourced and stored to ensure quality and taste."
    },
    {
        id: 7,
        category: "Sweet",
        price: "KES 75/kg",
        image: maize_yellow,
        name: "Yellow Maize",
        quantity: 27,
        description:"Nutritious yellow maize, rich in vitamins and commonly used for animal feed, milling, or human consumption. It’s also popular for making sweet corn dishes and traditional meals."
    },
    {
        id: 8,
        category: "Sweet",
        price: "KES 180/kg",
        image: makueni_ndengu,
        name: "Makueni Ndengu(Green Grams)",
        quantity: 27,
        description:"Sourced from Makueni, these green grams are known for their rich flavor and high nutrient content. Great for making ndengu stew, salads, or sprouting. They are light, easy to digest, and packed with protein."
    },
    {
        id: 9,
        category: "Sweet",
        price: "KES 140/kg",
        image: muthoki,
        name: "Muthokoi(Hulled Maize & Beans Mix",
        quantity: 27,
        description:"Muthokoi is a traditional mix of hulled maize and beans, ready to cook. It saves time and offers a balanced, hearty meal rich in carbohydrates and protein. Ideal for a quick, nutritious family dish."
    },
    {
        id: 10,
        category: "Sweet",
        price: "KES 190/kg",
        image: ndengu_special,
        name: "Ndengu Special",
        quantity: 27,
        description:"A premium selection of green grams, carefully sorted for size and quality. These cook faster, have a delicate texture, and are ideal for special dishes, weaning food, or health-conscious diets."
    },
    {
        id: 11,
        category: "Sweet",
        price: "KES 190/kg",
        image: ndengu_special1,
        name: "Ndengu Special brand2",
        quantity: 27,
        description:"A premium selection of green grams, carefully sorted for size and quality. These cook faster, have a delicate texture, and are ideal for special dishes, weaning food, or health-conscious diets."
    },
    {
        id: 12,
        category: "Sweet",
        price: "KES 300/kg",
        image: njugu_red,
        name: "Red Groundnuts",
        quantity: 27,
        description:"Premium groundnuts available in both white and red varieties. Perfect for roasting, boiling, or making peanut butter. They are high in healthy fats, protein, and energy, making them a great snack or cooking ingredient."
    },
    {
        id: 13,
        category: "Sweet",
        price: "KES 300/kg",
        image: njugu_red1,
        name: "Red GroundNut",
        quantity: 27,
        description:"Premium groundnuts available in both white and red varieties. Perfect for roasting, boiling, or making peanut butter. They are high in healthy fats, protein, and energy, making them a great snack or cooking ingredient."
    },
    {
        id: 14,
        category: "Sweet",
        price: "KES 300/kg",
        image: njugu_white,
        name: "White peanuts",
        quantity: 27,
        description:"Premium groundnuts available in both white and red varieties. Perfect for roasting, boiling, or making peanut butter. They are high in healthy fats, protein, and energy, making them a great snack or cooking ingredient."
    },
    {
        id: 15,
        category: "Sweet",
        price: "420",
        image: rosecoco,
        name: "Sweet Rosecoco",
        quantity: 27,
        description:"Rosecoco beans are a beatiful pinkish-purple bean variety with rich, earthy flavor. They are often used in githeri and other one-pot meals. High in protein and minerals they cook tp a soft, creamy texture and are very filling"
    },
    {
        id: 16,
        category: "Sweet",
        price: "KES 250/kg",
        image: simsim,
        name: "Simsim",
        quantity: 27,
        description:"High-quality sesame seeds, perfect for baking, garnishing, or making sesame paste (tahini). Rich in healthy oils, protein, and calcium, they add a nutty flavor and crunch to various dishes."
    },
]

export default Items;