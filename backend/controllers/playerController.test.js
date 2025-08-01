const playerController = require('../controllers/playerController');
const player = require('../models/users');

jest.mock('../models/users');

describe('Player Controller', () => {

    let req;
    let res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    // ---- Test searchAll ----
    describe('searchAll', () => {
        it('should return all players', async () => {
            const mockPlayers = [{ email: 'a@example.com' }, { email: 'b@example.com' }];
            player.find.mockResolvedValue(mockPlayers);

            await playerController.searchAll(req, res);

            expect(res.json).toHaveBeenCalledWith(mockPlayers);
        });

        it('should handle errors', async () => {
            player.find.mockRejectedValue(new Error('DB error'));

            await playerController.searchAll(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
        });
    });

    // ---- Test searchOne ----
    describe('searchOne', () => {
        it('should return the player with specified email', async () => {
            req.body = { email: 'test@dlsu.edu.ph' };
            const mockPlayer = { email: 'test@dlsu.edu.ph' };
            player.findOne.mockResolvedValue(mockPlayer);

            await playerController.searchOne(req, res);

            expect(res.json).toHaveBeenCalledWith(mockPlayer);
        });
    });

    // ---- Test addPlayer ----
    describe('addPlayer', () => {
        it('should return existing user if found', async () => {
            req.body = { email: 'exist@example.com' };
            player.findOne.mockResolvedValue({ email: 'exist@example.com' });

            await playerController.addPlayer(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('User already exists');
        });

        it('should create and return a new user if not exists', async () => {
            req.body = { email: 'new@example.com' };
            player.findOne.mockResolvedValue(null);
            player.create.mockResolvedValue({ email: 'new@example.com' });

            await playerController.addPlayer(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ email: 'new@example.com' });
        });

        it('should handle creation error', async () => {
            req.body = { email: 'fail@example.com' };
            player.findOne.mockResolvedValue(null);
            player.create.mockRejectedValue(new Error('Create fail'));

            await playerController.addPlayer(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Create fail' });
        });
    });

    // ---- Test updateOne ----
    describe('updateOne', () => {
        it('should update and return user', async () => {
            req.params = { email: 'update@example.com' };
            req.body = { email: 'update1@example.com' };
            const mockUpdated = { email: 'update@example.com' };
            player.findOneAndUpdate.mockResolvedValue(mockUpdated);

            await playerController.updateOne(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUpdated);
        });

        it('should return 404 if user not found', async () => {
            req.params = { email: 'missing@example.com' };
            player.findOneAndUpdate.mockResolvedValue(null);

            await playerController.updateOne(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such user' });
        });
    });

    // ---- Test deleteOne ----
    describe('deleteOne', () => {
        it('should delete and return user', async () => {
            req.body = { id: '123' };
            const mockDeleted = { _id: '123', email: 'del@example.com' };
            player.findByIdAndDelete.mockResolvedValue(mockDeleted);

            await playerController.deleteOne(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockDeleted);
        });

        it('should return 404 if user not found', async () => {
            req.body = { id: 'notfound' };
            player.findByIdAndDelete.mockResolvedValue(null);

            await playerController.deleteOne(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such user' });
        });

        it('should handle deletion errors', async () => {
            req.body = { id: 'err' };
            player.findByIdAndDelete.mockRejectedValue(new Error('Deletion error'));

            await playerController.deleteOne(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Deletion error' });
        });
    });
});
