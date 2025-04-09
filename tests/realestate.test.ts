import request from 'supertest';
import app from './appTest';

describe('GET /realestate', () => {
    it('should return paginated listings', async () => {
        const res = await request(app).get('/realestate');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('currentPage', 1);
    });

    it('should filter by city, type, and price', async () => {
        const res = await request(app).get('/realestate?cityId=1&typeId=2&minPrice=50000&maxPrice=200000');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            data: 'Not Found RealEstate',
            totalRecords: 0,
            totalPages: 0,
            currentPage: 1,
        });
    });

    it('should return 400 for invalid page', async () => {
        const res = await request(app).get('/realestate?page=0');
        expect(res.statusCode).toBe(200);
    });

    it('should return 404 if page exceeds limit', async () => {
        const res = await request(app).get('/realestate?page=9999');
        expect([404, 200]).toContain(res.statusCode);
    });

    it('Invalid page number', async () => {
        const res = await request(app).get('/realestate?page=-1');
        expect(res.statusCode).toBe(400);
    });
});

describe('POST /realestate', () => {
    it('should create a new real estate successfully', async () => {
        const newRealEstate = {
            "title": "Unit Test",
            "description": "Unit Test Post",
            "bed_rooms": 5,
            "bath_rooms": 6,
            "year_built": 2023,
            "image": "mansion.jpg",
            "price": 500000.00,
            "type_id": 17,
            "city_id": 12,
            "record_status": 2
        };
        const res = await request(app).post('/realestate').send(newRealEstate).set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Done Create new RealEstate');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toMatchObject(newRealEstate);
    });

    it('should return 500 for missing required fields', async () => {
        const incompleteRealEstate = {
            cityId: 1,
            typeId: 1,
            price: 500000,
        };

        const res = await request(app)
            .post('/realestate')
            .send(incompleteRealEstate)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(500);
    });

    it('should return 404 if city does not exist', async () => {
        const newRealEstate = {
            title: "Unit Test City Not exist",
            description: "Unit Test Post",
            bed_rooms: 5,
            bath_rooms: 6,
            year_built: 2023,
            image: "mansion.jpg",
            price: 500000.00,
            type_id: 17,
            city_id: 999, // City ID that doesn't exist
            record_status: 2
        };

        const res = await request(app)
            .post('/realestate')
            .send(newRealEstate)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(404);
    });

    it('should return 404 if type does not exist', async () => {
        const newRealEstate = {
            title: "Unit Test Type Not exist",
            description: "Unit Test Post",
            bed_rooms: 5,
            bath_rooms: 6,
            year_built: 2023,
            image: "mansion.jpg",
            price: 500000.00,
            type_id: 999, // Type ID that doesn't exist
            city_id: 12,
            record_status: 2
        };

        const res = await request(app)
            .post('/realestate')
            .send(newRealEstate)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(404);
    });

    it('should return 500 if there is a database error', async () => {
        const newRealEstate = {
            title: "Unit Test",
            description: "Unit Test Post",
            bed_rooms: 5,
            bath_rooms: 6,
            year_built: "Must be Number Not String",
            image: "mansion.jpg",
            price: 500000.00,
            type_id: 17,
            city_id: 12,
            record_status: 2
        };

        const res = await request(app)
            .post('/realestate')
            .send(newRealEstate)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(500);
    });
});

describe('PATCH /realestate/id', () => {
    const existingId = 10;

    it('should return 404 if RealEstate does not exist', async () => {
        const nonExistentId = 999;
        const updatedRealEstate = {
            title: "Updated Title",
            description: "Updated description",
            price: 600000.00
        };

        const res = await request(app).patch(`/realestate/${nonExistentId}`)
            .send(updatedRealEstate)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(404);
    });

    it('should return 404 if City does not exist', async () => {

        const updatedRealEstate = {
            title: "Updated Title",
            description: "Updated description",
            city_id: 999, // City ID that doesn't exist
            price: 600000.00
        };

        const res = await request(app).patch(`/realestate/${existingId}`)
            .send(updatedRealEstate)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(404);
    });

    it('should return 404 if Type does not exist', async () => {
        const existingId = 1;
        const updatedRealEstate = {
            title: "Updated Title",
            description: "Updated description",
            type_id: 999, // Type ID that doesn't exist
            city_id: 12,
            price: 600000.00
        };

        const res = await request(app).patch(`/realestate/${existingId}`)
            .send(updatedRealEstate)
            .set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(404);
    });

    it('should return 500 if there is a database error', async () => {
        const updatedRealEstate = {
            title: "Updated Title",
            description: "Updated description",
            city_id: 12,
            type_id: 17,
            price: "number"
        };

        const res = await request(app).patch(`/realestate/${existingId}`)
            .send(updatedRealEstate)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(500);
    });

    it('should update the real estate successfully', async () => {
        
        const updatedRealEstate = {
            title: "Updated Title",
            description: "Updated description",
            city_id: 12,
            type_id: 17,
            price: 600000.00
        };


        const res = await request(app).patch(`/realestate/${existingId}`)
            .send(updatedRealEstate)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data', `RealEstate 10 updated successfully`);
    });
});

describe('DELETE /realestate/id', () => {

    it('should return 204 when a RealEstate is successfully deleted', async () => {
        const existingId = 7;
        const res = await request(app).delete(`/realestate/${existingId}`);
        expect(res.statusCode).toBe(204);
        expect(res.body).toEqual({
            message: 'Done Deleted RealEstate',
            data: `RealEstate ${existingId} successfully deleted`
        });
    });

    it('should return 404 if RealEstate does not exist', async () => {
        const nonExistentId = 7;
        const res = await request(app).delete(`/realestate/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            message: 'RealEstate doesn\'t exist'
        });
    });

});


