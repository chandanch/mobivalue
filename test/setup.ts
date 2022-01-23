import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
    try {
        await rm(join(__dirname, '..', 'testdb.sqlite'));
    } catch (error) {
        console.log('File Not found');
    }
});

global.afterEach(async () => {
    const connection = getConnection();
    connection.close();
});
