const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select("*")

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const rootKey = "Davi-Root-Key"

        const ong = await connection('ongs').where('id', id).select('id').first();

        if (!ong) {
            return response.status(404).json({ error: 'Ong inexistente!' });
        }

        if (rootKey != request.headers.authorization) {
            return response.status(401).json({ error: 'Operation not authorized.' });
        }

        await connection('incidents').where('ong_id', id).select('*').delete() 
        await connection('ongs').where('id', id).delete();

        return response.status(204).send();
    }
}