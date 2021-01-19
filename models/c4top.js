const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: { type: String, required: true },
    difficulty: { type: String, default: 'medium' },
    perdidas: { type: Number, default: 0 },
    ganadas: { type: Number, default: 0 },
	empates: {type: Number, default: 0},
	cacheName: {type: String, default: '?'}
});

module.exports = model('c4top', Guild);