const db = require('./firebase');
const api = {
    createError: (message, data) => {
        return {
            success: false,
            message,
            ...data
        };
    },
    createSuccess: (data) => {
        return {
            success: true,
            ...data
        };
    },
    loadFile: async (name) => {
        let ref = db.ref(`file/${name}`);
        try {
            let result = await ref.once('value');
            if (result.exists())
                return api.createSuccess({
                    file: result.val()
                });
            else
                return api.createError(`File ${name} does not exist.`);
        } catch (e) {
            return api.createError(`Error when loading file: ${e.message}`);
        }
    },
    saveFile: async (name, string) => {
        // verify that there are no other files with the same name
        let data = await api.loadFile(name);
        if (data.success) return api.createError(`File ${name} already exists.`);

        let ref = db.ref(`file/${name}`);
        try {
            await ref.set({
                name,
                content: string
            });

            return api.createSuccess();
        } catch (e) {
            return api.createError(`Error when saving file: ${e.message}`);
        }
    },
    loadFiles: async () => {
        let ref = db.ref('files');
        let result = await ref.once('value');

        if (result.exists()) {
            let files = [];
            for (let [name, data] of Object.entries(result.val()))
                files.push(data);
            
            return api.createSuccess({
                files
            });
        } else {
            // no files found
            return api.createSuccess({
                files: []
            });
        }
    }
};

module.exports = api;