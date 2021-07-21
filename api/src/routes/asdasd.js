router.post('/', async function(req, res, next) {

    const {diet, title, resume, healthyLevel, image} = req.body;


    try {
        let newRecipe = await Recipe.create({
            title,
            resume,
            healthyLevel,
            id: uuidv4(),
            image: image
            })
            //funcion para buscar/crear Diets y relacionarlas con recipe
            async function checkDiets(array) {
                let aux= []
                for (let index = 0; index < array.length; index++) {
                    let dietX = await Diet.findOrCreate({
                                    where: { name: array[index]},
                                    defaults: { id: uuidv4()}
                                })
                                console.log("ESTOOOO es dietX[i]: " + dietX[0])
                    newRecipe.addDiets(dietX[0])
                    aux.push(dietX[0]);
                }
                return aux;
            }

       var rDiets= await checkDiets(diet)
        // console.log("ESTO ES RDIETS:::: " + rDiets)

        //concateno los objetos de recipe y diet
        var responder = Object.assign({}, newRecipe, {rDiets})

        res.send(responder)
    } catch(err) {
        next(err);
    }

})