const router = require('express').Router()
const Person = require('../models/Person')


router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body
    const person = {
        name, salary, approved
    }
    if (!name) {
        return res.status(500).json({ message: "Name is necessary" })
    }
    if (!salary) {
        return res.status(500).json({ message: "Salary is necessary" })
    }

    try {
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people)

    } catch (error) {
        res.status(500).json({ error: error })

    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const people = await Person.findById(id);
        if (!people) {
            return res.status(500).json({ message: "User not Found" })
        }
        res.json(people)

    } catch (error) {
        res.status(500).json({ error: error })

    }
})

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { name, salary, approved } = req.body
        const updatePeople = {
            name, salary, approved
        }
        await Person.findByIdAndUpdate(id, updatePeople);
        res.json(updatePeople)

    } catch (error) {
        res.status(500).json({ error: error })

    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Person.deleteOne({ _id: id });
        res.status(200).json({ message: "Usuário deletado" })

    } catch (error) {
        res.status(500).json({ error: error })

    }
})

module.exports = router