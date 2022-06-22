var axios = require('axios');
const { Breed, Temperament } = require('../db');
const { MY_API_KEY } = process.env;
const API_URL = `https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`;
const BREEDS_URL = "https://api.thedogapi.com/v1/breeds/search?q={raza_perro}"


const prueba = (req, res) => {
    return res.send('Hola');
};

// Obtener un listado de las razas de perro
const getInfo = async (req, res, next) => {
    try {
        const PedidoApi = await axios.get(API_URL);
        const dbInfo = await Breed.findAll({include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes:[]
            }
        }});
        if(PedidoApi || dbInfo){
            let apiInfo =  PedidoApi.data?.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    height: e.height.metric,
                    weight: e.weight.metric,
                    life_span: e.life_span,
                    temperament: e.temperament,
                    image: e.image.url
                }
            })
            let info = [...dbInfo, ...apiInfo];
            return res.json(info)
        }
    } catch (error) {
        return res.json({message: "Mensaje creado desde getInfo"})
    }
}

// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
const getByName = async(req, res, next) => {
    try {
        const { name } = req.query;
        const allDogs = await getInfo();
        if(name){
            const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
            dog.length ? 
            res.status(200).json(dog) : 
            res.status(404).send('No hay nada perri');
        }else{
            return res.status(200).json(allDogs);
        }
    } catch (error) {
        return res.json({message: "Mensaje creado desde getByName"})
    }
}

// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
const getById = async(req, res, next) => {

}


const postDogs = async (req, res, next) => {
    try {
        const { dog } = req.body;
        let newDog = await Breed.create(dog);
        let temperamentDb = await Temperament.findAll({
            where: {name: dog.temperament}
        })
        await newDog.addTemperament(temperamentDb)
        if(!newDog) return res.send({message: "No se pudo"})
        return res.json({message: "Creado", data: newDog})
    } catch (error) {
        next(error);
    }
}

const getTemperaments = async (req, res, next) => {
    try {
        const apiTemperament = await axios.get(API_URL);
        let temperaments = apiTemperament.data.map(e => e.temperament);
        temperaments = temperaments.join(', ').split(', ').filter((e) => e).forEach((e) => {
            Temperament.findOrCreate({
                where: {name: e}
            });
        });
        const allTemperaments = await Temperament.findAll();
        return res.send(allTemperaments);
    } catch (error) {
        next(error);
    }
}



module.exports = { prueba, getInfo, getByName, getTemperaments, postDogs, getById };
