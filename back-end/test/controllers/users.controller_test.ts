import { expect } from 'chai';
import axios, { AxiosResponse, AxiosError } from 'axios';
import bcrypt from 'bcryptjs';
import User from '../../src/sequelize/models/user.model';

describe('controllers | users', function() {
    describe('GET to /users', function() {
        let response: User[];
        before(async function() {
            await User.create({username: 'user1', password: 'pass1'});
            await User.create({username: 'user2', password: 'pass2'});
            response = (await axios.get<User[]>('http://localhost:3000/users')).data;
        });
        it('returns array of users', function() {
            expect(response).to.be.an('array').with.lengthOf(2);
        });
    });
    describe('POST to /users', function() {
        let response: User;
        before(async function() {
            response = (await axios.post<User>('http://localhost:3000/users', {
                username: 'bobross',
                password: 'paints'
            })).data;
        });
        it('returns user object with username', function() {
            expect(response.username).to.equal('bobross');
        });
        it('returns user object with encrypted password', function() {
            expect(response.password).to.be.a('string');
            expect(response.password).to.not.equal('paints');
        });
    });
    describe('GET to /users/:userId', function() {
        let response: User;
        before(async function() {
            await User.create({username: 'user1', password: 'pass1'});
            response = (await axios.get<User>('http://localhost:3000/users/1')).data;
        });
        it('returns user object with expected id', function() {
            expect(response.id).to.equal(1);
        });
    });
    describe('PATCH to /users/:userId', function() {
        let response: User;
        let hash: string;
        before(async function() {
            hash = await bcrypt.hash('pass1', 10);
            await User.create({username: 'user1', password: hash});
            response = (await axios.patch<User>('http://localhost:3000/users/1', {
                username: 'user1',
                password: 'pass1',
                newInfo: {
                    provider: 'self',
                    password: 'newPassword'
                }
            })).data;
        });
        it('returns user with new provider value', function() {
            expect(response.provider).to.equal('self');
        });
        it('returns user with new password value', function() {
            expect(response.password).to.not.equal(hash);
        });
    });
    describe('PATCH to /users/:userId with unauthorized user', function() {
        let response: AxiosResponse<unknown>;
        before(async function() {
            const hash1 = await bcrypt.hash('pass1', 10);
            const hash2 = await bcrypt.hash('pass2', 10);
            await User.create({username: 'user1', password: hash1});
            await User.create({username: 'user2', password: hash2});
            try {
                (await axios.patch<User>('http://localhost:3000/users/1', {
                    username: 'user2',
                    password: 'pass2',
                    newInfo: {
                        provider: 'self'
                    }
                }));
            } catch (e) {
                response = (<AxiosError>e).response!;
            }
        });
        it('returns 401', function() {
            expect(response.status).to.equal(401);
        });
    });
});