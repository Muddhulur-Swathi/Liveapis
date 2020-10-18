let chai=require('chai');
let chaiHttp=require('chai-http');
let expect=chai.expect;
chai.use(chaiHttp);
describe('Testing My api',()=>{
    it('should return status as 200',(done)=>{
        chai.request('http://localhost:3000')
        .get('/api')
        .then((res)=>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((err)=>{
            throw err;
        })
    })
    it('should return status as 200',(done)=>{
        chai.request('http://localhost:3000')
        .get('/location')
        .then((res)=>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((err)=>{
            throw err;
        })
    })
    it('should return status as 200',(done)=>{
        chai.request('http://localhost:3000')
        .get('/restaurant')
        .then((res)=>{
            expect(res).to.have.status(200)
            done()
        })
        .catch((err)=>{
            throw err;
        })
    })
})