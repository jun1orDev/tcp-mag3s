import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenha o diretório atual do módulo
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const json = path.join(
	__dirname,
	'../../server/mag3s-magi-4e7e669aa404.json'
);

export const googleCloudStorage = new Storage({
	keyFilename: json,
	projectId: '108424754156283872127',
});
