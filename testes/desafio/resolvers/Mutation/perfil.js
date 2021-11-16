const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil.js'); // Renomeia perfil para: obterPerfil

module.exports = {
    // dados é um objeto que contém os dados do usuário
    async novoPerfil(_, { dados }) {
        try {
            // Recebe o id de dentro do array que é retornado pelo método insert
            const [ id ] = await db('perfis')
            .insert(dados)
            // Retorna os dados a partir do id, obs.: se usar desestruturação, talvez seja necessário usar {  }
            return db('perfis')
                .where( { id } ).first();
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirPerfil(_, { filtro }) {
        try {
            // Faz a busca do perfil a partir do filtro passado
            const perfil = await obterPerfil(_, { filtro });
            // Se achou o perfil:
            if (perfil) {
                // Pega o id do perfil
                const { id } = perfil;
                // Desassocia o perfil do usuário
                await db('usuarios_perfis')
                .where({ perfil_id: id }).delete();
                // Deleta o perfil
                await db('perfis').where({ id }).delete();
            }
            return perfil;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        // implementar
    }
}