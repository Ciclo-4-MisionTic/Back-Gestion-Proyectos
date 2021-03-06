import { ModeloAvance } from "./avance.js"


const resolversAvance = {
    Query:{
        Avances: async(parent, args) =>{
            const avances = await ModeloAvance.find().populate("proyecto").populate("creadoPor");
            return avances;
        },
        filtrarAvance: async(parent,args)=>{
            const avanceFiltrado = await ModeloAvance.find({proyecto: args.idProyecto})
                .populate("proyecto")
                .populate("creadoPor")
            return avanceFiltrado;
        }
    },
    Mutation: {
        crearAvance: async(parent, args) =>{
            const avanceCreado = ModeloAvance.create({
                fecha: args.fecha,
                descripcion: args.descripcion,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor,
                observaciones: args.observaciones,
            })

            return avanceCreado;
        },
        
        editarAvance: async(parent,args) => {
            const avanceEditado = await ModeloAvance.findByIdAndUpdate(args._id,{
                descripcion: args.descripcion,
            },
            {new:true}
            );
            return avanceEditado;
        },
        
        eliminarAvance: async(parent, args) =>{
            if(Object.keys(args).includes("_id")){
                const avanceEliminado = await ModeloAvance.findOneAndDelete({_id: args._id});
                return avanceEliminado;
            } else if(Object.keys(args).includes("descripcion")){
                const avanceEliminado = await ModeloAvance.findOneAndDelete({ descripcion: args.descripcion});
                return avanceEliminado;
            }
        },
        
        crearObservacion: async (parent,args)=>{
            const avanceConObservaciones = await ModeloAvance.findByIdAndUpdate(args.idAvance,{
                $addToSet:{
                    observaciones:{... args.campos},
                },
            }, {new:true});

            return avanceConObservaciones;
        },

    },
};

export { resolversAvance };