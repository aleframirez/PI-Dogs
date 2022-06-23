var axios = require('axios');
const { Breed, Temperament } = require('../db');
const { MY_API_KEY } = process.env;
const API_URL = `https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`;


const prueba = (req, res) => {
    return res.send('Hola');
};

const getInfoFromApi = async (req, res, next) => {
        const dataFromApi = await axios.get(API_URL);
        const infoFromApi = await dataFromApi.data.map(e => {
            let allTemperaments = [];
            if(e.temperament) allTemperaments = e.temperament.split(', ');
            let allHeight = [];
            if(e.height.metric) allHeight = e.height.metric.split(' - ');
            let allWeight = [];
            if(e.weight.metric) allWeight = e.weight.metric.split(' - ');
            return {
                id: e.id,
                name: e.name,
                heigh: allHeight,
                weight: allWeight,
                temperament: allTemperaments,
                life_span: e.life_span,
                image: e.image.url
            }
        })
        // console.log('Listoooooooo!!')
        return infoFromApi
};

const getInfoFromDb = async(req, res, next) => {
    const aaa = await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    // console.log(aaa)
    return aaa.map(e => {
        return {
            id: e.ID,
            name: e.name,
            heigh: e.height,
            weight: e.weight,
            temperament: e.temperaments.map(e => e.name),
            life_span: e.life_span,
            image: e.image
        }
    })
};

const getAllInfo = async(req, res, next) => {
    const dataFromApi = await getInfoFromApi();
    const dataFromDb = await getInfoFromDb();
    const allTheData = [...dataFromDb, ...dataFromApi];
    return allTheData;
};

const allInfo = async(req, res, next) => {
    const { name } = req.query;
    const allDogs = await getAllInfo();
    if(name){
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dog.length ? res.status(200).send(dog) : res.status(404).send('Dog Not Found');
    }else{
        res.status(200).send(allDogs);
    }
}

const getFromId = async(req, res, next) => {
    const { id } = req.params;
    const allDogs = await getAllInfo();
    // console.log(allDogs);
    if(id){
        const dog = allDogs.filter(e => e.id == id);
        dog.length ? res.status(200).json(dog) : res.status(404).send('No hay nada');
    }
};

const postNewDog = async(req, res, next) => {
    let { name, min_height, max_height, min_weight, max_weight, life_span, temperaments, image } = req.body;

    const orderedHeight = [];
    const minHeight = min_height;
    const maxHeight = max_height;
    orderedHeight.push(minHeight, maxHeight);

    const orderedWeight = [];
    const minWeight = min_weight;
    const maxWeight = max_weight;
    orderedWeight.push(minWeight, maxWeight);

    let newDog = await Breed.create({
        name,
        height: orderedHeight,
        weight: orderedWeight,
        life_span,
        image
    });

    let tempForDog = await Temperament.findAll({
        where: {name: temperaments}
    });

    newDog.addTemperament(tempForDog);

    res.status(200).send('Your dog has been created!')
};

const getAllTemperaments = async(req, res, next) => {
    const temperamentsFromApi = await axios.get(API_URL);
    const allTemperaments = temperamentsFromApi.data.map(t => t.temperament);
    const temperaments = allTemperaments.toString().split(',');
    temperaments.forEach(e => {
        let i = e.trim()
        Temperament.findOrCreate({
            where: {name: i}
        })
    })
    const allTemp = await Temperament.findAll();
    res.send(allTemp);
};

module.exports = { prueba, allInfo, getFromId, postNewDog, getAllTemperaments };
