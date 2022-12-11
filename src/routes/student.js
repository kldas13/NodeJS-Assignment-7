const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const bodyparser = require("body-parser");
const { query } = require("express");
const data = require('../InitialData');


router.use(bodyparser.json());

let registrations=data.length;

router.get('/api/student', async (req,res)=> {
    try {

        const finder = await Student.find();

        if(finder.length==0){
            const initial = await Student.create(data);
            // console.log(initial);
           return res.json({
                status:"Success",
                initial
            });
        }



        const initial = await Student.find();
        res.json({
            status:"Success",
            CurrentStudents: initial
        })
    } catch (error) {
        res.status(404).json({
            status:"404 Failed",
            message: error.message
        })
    }
});


router.get('/api/student/:id', async (req,res)=> {
    try {

        const initial = await Student.find({id:req.params.id});
        if(initial.length==0) {
            return res.status(404).json({
                status:"404 Failed",
                message: 'Invalid Id'
            })
        }
        res.json({
            status:"Success",
            initial
        })
    } catch (error) {
        res.status(404).json({
            status:"404 Failed",
            message: error.message
        })
    }
});

// router.delete('/api/student/:division', async (req,res)=> {
//     try {
//         const initial = await Student.deleteMany({division:req.params.division});
//         res.json({
//             status:"Success",
//             initial
//         })
//     } catch (error) {
//         res.status(404).json({
//             status:"404 Failed",
//             message: error.message
//         })
//     }
// });


router.delete('/api/student/:id', async (req,res)=> {
    try {
        const initial = await Student.deleteMany({id:req.params.id});
        // console.log(initial);
        if(initial.deletedCount==0) {
           return res.status(404).json({
                status:"404 Failed",
                message: 'Invalid Id'
            })
        }
        res.json({
            status:"Success",
            initial
        })
    } catch (error) {
        res.status(404).json({
            status:"404 Failed",
            message: error.message
        })
    }
});

router.put('/api/student/:id', async (req,res)=> {
    try {
        const initial = await Student.updateOne(
            {id:req.params.id},
            {name: req.body.name}
        );
        if(initial.matchedCount==0) {
            return res.status(404).json({
                status:"400 Failed",
                message: 'Invalid Id'
            })
        }
        if(!req.body.name) {
            return res.status(404).json({
                status:"400 Failed",
                message: 'Invalid Parameter, Only name can be updated'
            })
        }
        res.set('Content-type','application/x-www-form-urlencoded'
        );
        res.json({
            status:"Success",
            initial
        })
    } catch (error) {
        res.status(404).json({
            status:"400 Failed",
            message: error.message
        })
    }
});



// router.post('/api/student', async (req,res)=> {
//     try {
//         const initial = await Student.create(data);
//         console.log(initial);
//         res.json({
//             status:"Success",
//             initial
//         })
//     } catch (error) {
//         res.status(404).json({
//             status:"Failed",
//             message: error.message
//         })
//     }
// });

router.post('/api/student/', async (req,res)=>{
    try {
        // const finder = await Student.find();

        // if(finder.length==0){
        //     const initial = await Student.create(data);
        //     // console.log(initial);
        //    return res.json({
        //         status:"Success",
        //         initial
        //     });
        // }

        // if(!req.body.name ||
        //     !req.body.currentClass ||
        //     !req.body.division) {
        //         return res.status(404).json({
        //             status:"400 Failed",
        //             message: 'Three fields are mandatory(Name,class,division)'
        //         })
        //     }
        registrations+=1;
        // console.log(registrations);


        const initial = await Student.create({
            id : registrations,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        });
        // console.log(initial);
        res.set('Content-type','application/x-www-form-urlencoded'
        );
        res.json({
            status:"Success",
            id:registrations
        })
        // res.status(200).json({
        //     status:"Success",
        //     initial
        // })
    } catch (error) {
        res.status(400).json({
            status:"400 Failed",
            message: error.message
        })
    }
})



module.exports = router;